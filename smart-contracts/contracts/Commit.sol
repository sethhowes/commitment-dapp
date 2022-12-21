// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Commit {
    uint public lockedPool;
    uint public unlockedPool;
    uint public latestCommitAmount;
    address public owner;
    uint public completeBy;

    constructor() {
        owner = msg.sender;
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

    function validateRun() public {
        // Only owner can access these funds
        require(msg.sender == owner);
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
    // function withdraw(uint amount) public {
    //     require(msg.sender == owner);
    //     msg.sender.transfer(amount);
    // }
}