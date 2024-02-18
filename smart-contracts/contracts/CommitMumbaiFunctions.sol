// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CommitMumbaiFunctions is FunctionsClient, ConfirmedOwner {
    
    using FunctionsRequest for FunctionsRequest.Request;
    
    string public source;
    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;
    uint chainlinkRunId;
    uint public unlockedAmount;

    struct Run {
        uint commitAmount;
        uint startTime;
        uint endTime;
        bool completed;
        bool checked;
    }

    // Array of all runs
    Run[] public Runs;

    error UnexpectedRequestID(bytes32 requestId);

    event Response(bytes32 indexed requestId, bytes response, bytes err);

    // Request params
    uint32 gasLimit = 300000;
    bytes32 donID =
        0x66756e2d706f6c79676f6e2d6d756d6261692d31000000000000000000000000;
    uint64 subscriptionId = 1336;

    constructor(
        address router,
        string memory _source
    ) FunctionsClient(router) ConfirmedOwner(msg.sender) {
        source = _source;
    }

    /**
     * @notice Sends an HTTP request for character information
     * @param args The arguments to pass to the HTTP request
     * @return requestId The ID of the request
     */
    function sendRequest(
        string[2] memory args,
        uint8 donHostedSecretsSlotID,
        uint64 donHostedSecretsVersion,
        uint64 _id
    ) internal onlyOwner returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source); // Initialize the request with JS code
        if (donHostedSecretsVersion > 0) {
            req.addDONHostedSecrets(
                donHostedSecretsSlotID,
                donHostedSecretsVersion
            );
        if (args.length > 0) req.setArgs(args); // Set the arguments for the request
        }

        // Send the request and store the request ID
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );

        // Sets current id of run to check
        chainlinkRunId = _id;

        return s_lastRequestId;
    }

    /**
     * @notice Callback function for fulfilling a request
     * @param requestId The ID of the request to fulfill
     * @param response The HTTP response data
     * @param err Any errors from the Functions request
    */
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId); // Check if request IDs match
        }
        // Update the contract's state variables with the response and any errors
        s_lastResponse = response;
        s_lastError = err;

        // Emit an event to log the response
        emit Response(requestId, s_lastResponse, s_lastError);
    }

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

    // Get all runs
    function getAllRuns() public view returns (Run[] memory) {
        require(Runs.length > 0, "No runs have been committed to");
        return Runs;
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

     // Verify last last run
    function verifyRun(uint64 _id, uint64 _donHostedSecretsVersion) public onlyOwner {
        // Get details of specified run
        Run memory runToCheck = Runs[_id];

        // Check if latest run is before current timestamp
        require(
            runToCheck.startTime < block.timestamp,
            "Commit time is in the future"
        );

        // Check if run has already been checked
        require(runToCheck.checked == false, "Run has already been checked");

        // Check if run was completed
        sendRequest([Strings.toString(runToCheck.startTime), Strings.toString(runToCheck.endTime)], 0, _donHostedSecretsVersion, _id);
    }

    /**
        * @notice Sets the source code for the contract
        * @param _source The new source code
     */
    function setSourceCode(string memory _source) public onlyOwner {
        source = _source;
    }
}