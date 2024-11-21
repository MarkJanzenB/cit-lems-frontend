import { jwtDecode } from "jwt-decode";

const jwtDecoder = () => {
    const jwt = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(jwt);

    return decodedToken;
}

export const isJWTExpired = () => {
    const decodedToken = jwtDecoder();
    const currentDate = new Date();
    
    return currentDate.getTime() >= decodedToken.exp * 1000;
}

export const getJWTSub = () => {
    const decodedToken = jwtDecoder();
    
    return decodedToken.sub;
}

export const getJWTRoleId = () => {
    const decodedToken = jwtDecoder();

    return decodedToken.role_id;
}

export const getJWTFName = () => {
    const decodedToken = jwtDecoder();

    return decodedToken.first_name;
}