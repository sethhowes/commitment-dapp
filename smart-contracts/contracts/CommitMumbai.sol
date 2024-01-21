// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CommitMumbai is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    // Chainlink params
    bytes32 private jobId;
    uint256 private fee;
    uint chainlinkRunId;

    struct Run {
        uint commitAmount;
        uint startTime;
        uint endTime;
        bool completed;
        bool checked;
    }

    // Array of all runs
    Run[] public Runs;

    // Unlocked amount
    uint public unlockedAmount;

    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0x40193c8518BB267228Fc409a613bDbD8eC5a97b3);
        jobId = "c1c5e92880894eb6b27d3cae19670aa3";
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18
    }

    // Emit when Oracle contacted
    event RequestComplete(bytes32 indexed requestId, bool runComplete);

    // Commit to run by certain time
    function commitRun(
        uint _startTime,
        uint _endTime
    ) public payable onlyOwner {
        // Check if commit time is in the future
        require(
            _startTime > block.timestamp,
            "Must specify a time in the future"
        );

        // Add run to runs struct
        Runs.push(
            Run({
                commitAmount: msg.value,
                startTime: _startTime,
                endTime: _endTime,
                completed: false,
                checked: false
            })
        );
    }

    // Get all active runs
    function getLatestRun() public view returns (Run memory) {
        require(Runs.length > 0, "No runs have been committed to");
        return Runs[Runs.length - 1];
    }

    // Verify last last run
    function verifyRun(uint256 _id) public onlyOwner {
        // Get details of specified run
        Run memory runToCheck = Runs[_id];

        // Check if latest run is before current timestamp
        require(
            runToCheck.startTime < block.timestamp,
            "Commit time is in the future"
        );

        // Check if run has already been checked
        require(runToCheck.checked == false, "Run has already been checked");

        // Sets current id of run to check
        chainlinkRunId = _id;

        // Check if run was completed
        requestCompleteData(runToCheck.startTime, runToCheck.endTime);
    }

    // Get all runs
    function getAllRuns() public view returns (Run[] memory) {
        require(Runs.length > 0, "No runs have been committed to");
        return Runs;
    }

    // Get historical runs
    function getHistoricalRuns() public view returns (Run[] memory) {
        uint historicalRunsCount = 0;

        // Count the number of historical runs
        for (uint i = 0; i < Runs.length; i++) {
            if (Runs[i].endTime < block.timestamp) {
                historicalRunsCount++;
            }
        }

        // Create a new array to store historical runs
        Run[] memory historicalRuns = new Run[](historicalRunsCount);

        // Iterate through Runs and add historical runs to the historicalRuns array
        uint j = 0;

        for (uint i = 0; i < Runs.length; i++) {
            if (Runs[i].endTime > block.timestamp) {
                historicalRuns[j] = Runs[i];
                j++;
            }
        }

        return historicalRuns;
    }

    // Get total unlocked funds from last run
    function getUnlockedAmount() public view returns (uint) {
        return unlockedAmount;
    }

    // Allow users to withdraw unlocked funds
    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(unlockedAmount);
        unlockedAmount = 0;
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
    function requestCompleteData(uint startTime, uint endTime) public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        req.add(
            "get",
            string.concat(
                "https://sjmvc0nxmd.execute-api.us-east-1.amazonaws.com/test/completed",
                "?start=",
                Strings.toString(startTime),
                "&end=",
                Strings.toString(endTime)
            )
        );

        req.add("path", "completed");

        return sendChainlinkRequest(req, fee);
    }

    // Callback function upon fulfillment of request
    function fulfill(
        bytes32 _requestId,
        bool _runComplete
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestComplete(_requestId, _runComplete);
        // Records whether the run is completed or not
        Runs[chainlinkRunId].completed = _runComplete;
        // Marks a run as having been checked
        Runs[chainlinkRunId].checked = true;

        // If run is completed, add to unlocked amount
        if (_runComplete == true) {
            unlockedAmount += Runs[chainlinkRunId].commitAmount;
        }
    }
}