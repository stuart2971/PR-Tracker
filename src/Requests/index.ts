function getServerURL() {
    if (import.meta.env.VITE_DEV_MODE === "true")
        return import.meta.env.VITE_DEV_SERVER_URL;
    return import.meta.env.VITE_PRODUCTION_SERVER_URL;
}

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
export async function addSet(data) {
    const res = await fetch(`${getServerURL()}/addSet`, {
        method: "POST", // Method type
        headers: {
            "Content-Type": "application/json", // Content type
        },
        body: JSON.stringify(data), // Data to be sent in the request body
    });
    return res;
}
