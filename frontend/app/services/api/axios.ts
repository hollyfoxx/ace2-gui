// create instance
import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.VUE_APP_BACKEND_URL}`,
});

// Add authorization here
// instance.defaults.headers.common['Authorization'] = null;

export default instance

