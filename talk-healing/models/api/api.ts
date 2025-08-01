import { ApisauceInstance, create, ApiResponse, HEADERS } from "apisauce";
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config";
//import * as storage from "../../utils/mobile-storage"
import * as storage from "localforage";
import {
  API_ENDPOINT,
  REQUEST_METHOD,
  TRAILING_SLASH,
} from "./endpoint.types";
/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance;

  /**
   * Configurable options.
   */
  config: ApiConfig;

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.apisauce=create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    });
  }
  async call(
    endpoint: API_ENDPOINT,
    payload: Object | FormData | String = {},
    ids:  Record<string, any>= {},
    headers: HEADERS = {}
  ): Promise<any> {
    // console.log(endpoint)
    const token = await storage.getItem(this.config.token_key);
    if (token) {
      //console.log("token", token)
      this.apisauce.setHeader("Authorization", "Bearer " + token);
    }
    headers = {
      ...this.apisauce.headers,
      ...headers,
    };
    endpoint = new API_ENDPOINT(endpoint);
    // console.log(endpoint)
    if (Object.keys(ids).length>0) {
      //for ids in URLs
      for (let id in ids) {
        let replaced_url = endpoint.url.replace("{" + id + "}", ids[id]);
        if (replaced_url == endpoint.url)
          console.warn(
            "You specified a URL variable in endpoint but id not supply it"
          );
        endpoint.url = replaced_url;
      }
    }
    if (endpoint.url.match("/[{*}]"))
      console.error("You have unfilled parameters in the URL");
    if (
      endpoint.url[endpoint.url.length - 1] != TRAILING_SLASH &&
      !endpoint.url.includes("?")
    )
      endpoint.url += TRAILING_SLASH;
    switch (endpoint.method) {
      case REQUEST_METHOD.GET:
        var response: ApiResponse<any> = await this.apisauce.get(
          endpoint.url,
          payload,
          {
            headers: headers,
          }
        );
        break;
      case REQUEST_METHOD.POST:
        var response: ApiResponse<any> = await this.apisauce.post(
          endpoint.url,
          payload,
          {
            headers: headers,
          }
        );
        break;
      case REQUEST_METHOD.PATCH:
        var response: ApiResponse<any> = await this.apisauce.patch(
          endpoint.url,
          payload,
          {
            headers: headers,
          }
        );
        break;
      case REQUEST_METHOD.DELETE:
        var response: ApiResponse<any> = await this.apisauce.delete(
          endpoint.url,
          payload,
          {
            headers: headers,
          }
        );
        break;
    }
    // console.log(response)
    if (!response.ok) {
      //handle error here
      console.error("API Error");
      // console.log(response)
      return response;
    }
    if (endpoint.transformer)
      response.data = endpoint.transformer(response.data);
    // console.log(response)
    return response;
  }
}
