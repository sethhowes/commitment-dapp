import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferRequested,
  OwnershipTransferred,
  RequestFulfilled,
  RequestSent,
  RunChecked,
  RunCreated
} from "../generated/CommitMumbaiFunctions/CommitMumbaiFunctions"

export function createOwnershipTransferRequestedEvent(
  from: Address,
  to: Address
): OwnershipTransferRequested {
  let ownershipTransferRequestedEvent = changetype<OwnershipTransferRequested>(
    newMockEvent()
  )

  ownershipTransferRequestedEvent.parameters = new Array()

  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferRequestedEvent
}

export function createOwnershipTransferredEvent(
  from: Address,
  to: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferredEvent
}

export function createRequestFulfilledEvent(id: Bytes): RequestFulfilled {
  let requestFulfilledEvent = changetype<RequestFulfilled>(newMockEvent())

  requestFulfilledEvent.parameters = new Array()

  requestFulfilledEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return requestFulfilledEvent
}

export function createRequestSentEvent(id: Bytes): RequestSent {
  let requestSentEvent = changetype<RequestSent>(newMockEvent())

  requestSentEvent.parameters = new Array()

  requestSentEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return requestSentEvent
}

export function createRunCheckedEvent(
  runId: BigInt,
  startTime: BigInt,
  endTime: BigInt,
  completed: boolean
): RunChecked {
  let runCheckedEvent = changetype<RunChecked>(newMockEvent())

  runCheckedEvent.parameters = new Array()

  runCheckedEvent.parameters.push(
    new ethereum.EventParam("runId", ethereum.Value.fromUnsignedBigInt(runId))
  )
  runCheckedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  runCheckedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )
  runCheckedEvent.parameters.push(
    new ethereum.EventParam("completed", ethereum.Value.fromBoolean(completed))
  )

  return runCheckedEvent
}

export function createRunCreatedEvent(
  runId: BigInt,
  startTime: BigInt,
  endTime: BigInt
): RunCreated {
  let runCreatedEvent = changetype<RunCreated>(newMockEvent())

  runCreatedEvent.parameters = new Array()

  runCreatedEvent.parameters.push(
    new ethereum.EventParam("runId", ethereum.Value.fromUnsignedBigInt(runId))
  )
  runCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  runCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )

  return runCreatedEvent
}
