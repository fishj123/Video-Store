import http from './httpService';
import jwtDecode from 'jwt-decode';

const apiEndpoint = process.env.REACT_APP_VIDEO_STORE_API_URL + "auth/"
const tokenKey = "token"

http.setJwt(getJwt());

export async function login(email, password) {
    const { data: jwt } = await http.post(apiEndpoint, { email, password });
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey)
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}


export async function getUserFromDb() {
    const jwtUser = getCurrentUser();
    if (!jwtUser) return null;
    const user = http.get("https://imbd-clone-api.herokuapp.com/api/users/" + jwtUser._id);
    return user;
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
    getJwt,
    getUserFromDb
}