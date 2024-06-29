import { getServerURL } from "../Misc/misc";

export async function getDashboardData(userId) {
    console.log(`Fetching data for userId: '${userId}'`);
    const res = await fetch(`${getServerURL()}/dashboard/${userId}`, {
        method: "GET", // Method type
        headers: {
            "Content-Type": "application/json", // Content type
        },
    });
    return await res.json();
}
