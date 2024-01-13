import { RawRunData, FormattedRunData } from '@/app/lib/definitions'
import { formatEther } from 'viem';

export function setToTomorrow() {
    return new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 13) + ":00"
}

export function setToNextHour(){
    return new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 13) + ":00";
}

export function getUnixTimestampAsInt(timestamp: string) {
    const date = new Date(timestamp)
    return Math.floor(date.getTime() / 1000)
}

export function convertUnixTimestampToDateString(timestamp: number) {
    const date = new Date(timestamp * 1000); // Convert to milliseconds

    // Format the date
    const formattedDate = date.toDateString();

    // Format the time
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    return `${formattedDate} ${formattedTime}`;
}

export function camelToTitleCase(str: string) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

export function formatRunData(data: RawRunData): FormattedRunData {
    return {
        startTime: convertUnixTimestampToDateString(Number(data.startTime)),
        endTime: convertUnixTimestampToDateString(Number(data.endTime)),
        commitAmount: formatEther(data.commitAmount),
        completed: camelToTitleCase(String(data.completed)),
        checked: data.checked
    }
}