export type RawRunData = {
    commitAmount: bigint
    startTime: bigint,
    endTime: bigint,
    completed: boolean,
    checked: boolean
}

export type FormattedRunData = {
    commitAmount: string
    startTime: string,
    endTime: string,
    completed: string,
    checked: boolean
}