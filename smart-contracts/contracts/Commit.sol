// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";


contract Commit is ChainlinkClient, ConfirmedOwner {
    
    using Chainlink for Chainlink.Request;

    bytes32 private jobId;
    uint256 private fee;

    struct Run {
        uint commitAmount;
        uint completeBy;
        bool completed;
        bool checked;
    }

    Run[] public Runs;
    uint public runsCommitted = 0;
    bool public currentCommit = false;


    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7);
        jobId = "c1c5e92880894eb6b27d3cae19670aa3";
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
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
        Runs[runsCommitted - 1].completed = _runComplete;
        // Marks a run as having been checked
        Runs[runsCommitted - 1].checked = true;
    }



    // Emits when someone commits to a run
    event CommitMade(bool);
    event RequestComplete(bytes32 indexed requestId, bool runComplete);

    // Commit crypto to complete any run by a certain time
    function commit(uint _completeBy) public payable onlyOwner {
        // Check if commit time is in the future
        require(_completeBy > block.timestamp, "Must specify a time in the future");
        // Add run to runs struct
        Runs.push(Run({commitAmount: msg.value, completeBy: _completeBy, completed: false, checked: false}));
        // Increment number of runs committed;
        runsCommitted ++;
        // Emit CommitMade event
        emit CommitMade(true);
    }

    // Verify last last run
    function verify() public onlyOwner {
        // Get details of last run
        Run memory lastRun = Runs[runsCommitted - 1];
        // Check if latest run is before current timestamp
        require(lastRun.completeBy < block.timestamp, "Commit time is in the future");
        // Check if run has already been checked
        require(lastRun.checked == false, "Run has already been checked");
        // Check if run was completed, and transfer funds to owner if true
        requestCompleteData();
    }

    // Get total unlocked funds from last run
    function getUnlockedAmount() view public onlyOwner returns (uint) {
        uint runsLength = Runs.length;
        uint unlockedAmount = 0;
        for (uint i = 0; i < runsLength; i++) {
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
}