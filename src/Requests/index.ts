export async function getLogs(userId) {
    console.log(`Fetching data for userId: '${userId}'`);
    const res = await fetch(`http://localhost:3000/dashboard/${userId}`, {
        method: "GET", // Method type
        headers: {
            "Content-Type": "application/json", // Content type
        },
    });
    return await res.json();
}
