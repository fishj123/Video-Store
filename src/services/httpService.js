import axios from 'axios';
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
console.log(axios.defaults)

// this is handling all unexpected errors globally
axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if (!expectedError) {
        console.log(error);
        toast.error("An unexpected error occurred");
    }
    return Promise.reject(error);
});

// make sure that this header is set on every axios action
// if user is not logged in then this header will not be set
function setJwt(jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt,
}