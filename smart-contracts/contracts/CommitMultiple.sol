// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";


contract Commit is ChainlinkClient, ConfirmedOwner {
    
    using Chainlink for Chainlink.Request;

    // Chainlink params
    bytes32 private jobId;
    uint256 private fee;

    struct Run {
        uint commitAmount;
        uint completeBy;
        bool completed;
        bool checked;
    }

    // Array of all runs
    Run[] public Runs;

    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7);
        jobId = "c1c5e92880894eb6b27d3cae19670aa3";
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18
    }

    // Emits when someone commits to a run
    event CommitMade(bool);
    // Emit when Oracle contacted
    event RequestComplete(bytes32 indexed requestId, bool runComplete);

    // Commit crypto to run by certain time
    function commitRun(uint _completeBy) public payable onlyOwner {

        // Check if commit time is in the future
        require(_completeBy > block.timestamp, "Must specify a time in the future");

        // Add run to runs struct
        Runs.push(Run({commitAmount: msg.value, completeBy: _completeBy, completed: false, checked: false}));

        // Emit CommitMade event
        emit CommitMade(true);
    }

    // Get all activate runs
    function getActiveRuns() public view returns (Run[] memory) {
        uint activeRunsCount = 0;

        // Count the number of active runs
        for (uint i = 0; i < Runs.length; i++) {
            if (Runs[i].completeBy < block.timestamp) {
                activeRunsCount++;
            }
        }

        // Create a new array to store active runs
        Run[] memory activeRuns = new Run[](activeRunsCount);

        // Iterate through Runs and add active runs to the activeRuns array
        uint j = 0;
        for (uint i = 0; i < Runs.length; i++) {
            if (Runs[i].completeBy < block.timestamp) {
                activeRuns[j] = Runs[i];
                j++;
            }
        }

        return activeRuns;
    }

    // Verify last last run
    function verifyRun(uint runID) public onlyOwner {

        // Check if runID is in range
        require(runID <= Runs.length, "Run ID does not exist");
        
        // Get details of specified run
        Run memory runToCheck = Runs[runID - 1];
        
        // Check if latest run is before current timestamp
        require(runToCheck.completeBy < block.timestamp, "Commit time is in the future");
        
        // Check if run has already been checked
        require(runToCheck.checked == false, "Run has already been checked");
        
        // Check if run was completed
        requestCompleteData();
    }

    // Get historical runs
    function getHistoricalRuns() public view returns (Run[] memory) {
        uint historicalRunsCount = 0;

        // Count the number of historical runs
        for (uint i = 0; i < Runs.length; i++) {
            if (Runs[i].completeBy > block.timestamp) {
                historicalRunsCount++;
            }
        }

        // Create a new array to store historical runs
        Run[] memory historicalRuns = new Run[](historicalRunsCount);

        // Iterate through Runs and add historical runs to the historicalRuns array
        uint j = 0;
        for (uint i = 0; i < Runs.length; i++) {
            if (Runs[i].completeBy > block.timestamp) {
                historicalRuns[j] = Runs[i];
                j++;
            }
        }

        return historicalRuns;
    }

    // Get total unlocked funds from last run
    function getUnlockedAmount() view public onlyOwner returns (uint) {

        uint unlockedAmount = 0;
        for (uint i = 0; i < Runs.length; i++) {
            if (Runs[i].completed == true) {
                unlockedAmount += Runs[i].commitAmount;
            }
        }

        return unlockedAmount;
    }

    // Allow users to withdraw unlocked funds
    function withdraw() public onlyOwner {
        uint unlockedAmount = getUnlockedAmount();
        payable(msg.sender).transfer(unlockedAmount);
    }

    // Allows Link to be withdrawn from contract
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

        // Constructs a request for Oracle
    function requestCompleteData() public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        req.add(
            "get",
            "https://nemyoxf5dl.execute-api.us-east-1.amazonaws.com/default/runCheckerNEW"
        );

        req.add(
            "path",
            "completed"
        );
        
        return sendChainlinkRequest(req, fee);
    }
    
    // Callback function upon fulfillment of request
    function fulfill (
        bytes32 _requestId,
        bool _runComplete
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestComplete(_requestId, _runComplete);
        // Records whether the run is completed or not
        Runs[Runs.length - 1].completed = _runComplete;
        // Marks a run as having been checked
        Runs[Runs.length - 1].checked = true;
    }
}