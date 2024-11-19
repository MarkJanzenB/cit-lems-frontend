export const isJWTExpired = () => {
    const jwt = localStorage.getItem("jwtToken");
    const payload = jwt.split(".")[1];
    const payloadData = decodeURIComponent(
        atob(payload)
            .split("")
            .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`)
            .join("")
    );

    const { exp } = JSON.parse(payloadData);

    return Date.now() >= exp * 1000;
}