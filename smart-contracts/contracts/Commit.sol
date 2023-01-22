// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract Commit is ChainlinkClient, ConfirmedOwner {

    using Chainlink for Chainlink.Request;

    uint public lockedPool;
    uint public unlockedPool;
    uint public latestCommitAmount;
    uint public completeBy;
    bool public runComplete;
    bytes32 private jobId;
    uint256 private fee;

    event RequestComplete(bytes32 indexed requestId, bool runComplete);

    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7);
        jobId = "c1c5e92880894eb6b27d3cae19670aa3";
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    }

    function requestCompleteData() public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );
        req.add(
            "get",
            "https://4imlkpazxh.execute-api.us-east-1.amazonaws.com/default/testValidate"
        );

        req.add(
            "path",
            "completed"
        );
        
        return sendChainlinkRequest(req, fee);
    }

    function fulfill(
        bytes32 _requestId,
        bool _runComplete
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestComplete(_requestId, _runComplete);
        runComplete = _runComplete;
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }


    function runCommit(uint completeIn) public payable {
        // Check completion date is after current date
        require(completeIn > block.timestamp, "Must specify a time in the future");
        // Add money to locked pool
        lockedPool += msg.value;
        // Set complete day
        completeBy = block.timestamp + completeIn;
        // Update lastest commit amout
        latestCommitAmount = msg.value;
    }

    function validateRun() public onlyOwner {
        // Only owner can access these funds
        // Checks if run was complete
        if (checkCompletion()) {
            // Moves money from locked pool to unlocked pool if completed
            unlockedPool += latestCommitAmount;
            lockedPool -= latestCommitAmount;
        }
    }

    // Test run completion function
    function checkCompletion() private pure returns (bool) {
        return true;
    }

    // Withdraw unlocked funds
    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
        unlockedPool = 0;
    }
}