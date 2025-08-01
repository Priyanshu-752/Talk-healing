// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
// export const API_URL = "https://boilerplate.highpolar.in/"
// export const API_URL = "http://127.0.0.1:8000/"

export const API_URL = 'https://talkhealing-backend.highpolar.in/';

// export const API_URL = 'https://talkhealing-backend.highpolar.in';

//export const API_URL = "http://localhost:8000/"
// export const API_URL = "https://playwheel-backend.highpolar.in"
//export const API_URL = "http://10.0.2.2:8000"
// export const API_URL = 'http://34.141.63.84:9000/';
/**
 * The options used to configure the API.
 */
export interface ApiConfig {
    /**
     * The URL of the api.
     */
    url: string

    /**
     * Milliseconds before we timeout the request.
     */
    timeout: number
    /**
     * auth token storage key
     */
    token_key: string
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
    url: API_URL,
    timeout: 100000,
    token_key: 'access',
};
