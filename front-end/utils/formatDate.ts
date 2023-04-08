export default function formatDate(completeBy: string) {
    const date = new Date(Number(completeBy) * 1000);
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = date.getSeconds();
    return `${month} ${day}, ${year} ${hours}:${minutes}`;
}