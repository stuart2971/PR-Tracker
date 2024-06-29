export function getServerURL() {
    if (import.meta.env.VITE_DEV_MODE === "true")
        return import.meta.env.VITE_DEV_SERVER_URL;
    return import.meta.env.VITE_PRODUCTION_SERVER_URL;
}
