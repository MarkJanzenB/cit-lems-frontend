import { jwtDecode } from "jwt-decode";

export const isJWTExpired = () => {
    const jwt = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(jwt);
    const currentDate = new Date();
    
    return currentDate.getTime() >= decodedToken.exp * 1000;
}

export const getJWTSub = () => {
    const jwt = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(jwt);
    
    return decodedToken.sub;
}