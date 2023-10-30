"use client";
import axios from "axios";

const BACKEND_URI = "http://localhost:8000";

const LOCALSTORAGE_KEYS = {
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expireTime: "spotify_token_expire_time",
  timestamp: "spotify_token_timestamp"
};
const LOCALSTORAGE_VALUES = {
  accessToken:
    typeof window === "undefined"
      ? null
      : window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken:
    typeof window === "undefined"
      ? null
      : window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime:
    typeof window === "undefined"
      ? null
      : window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp:
    typeof window === "undefined"
      ? null
      : window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp)
};

/**
 * Retrieves the Spotify access token from local storage or from the URL query params
 * @returns {string} A Spotify access token
 */
const getAccessToken = () => {
  const querystring =
    typeof window === "undefined" ? null : window.location.search;
  const urlParams = new URLSearchParams(querystring);
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get("access_token"),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get("refresh_token"),
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get("expires_in")
  };
  const hasError = urlParams.get("error");

  // If there's an error or if the access token in storage has expired, refresh the token
  if (
    hasError ||
    hasTokenExpired() ||
    LOCALSTORAGE_VALUES.accessToken === "undefined"
  ) {
    console.log("Getting a refresh token...");
    refreshToken();
  }

  // If there's a valid access token in storage, use that
  if (
    LOCALSTORAGE_VALUES.accessToken &&
    LOCALSTORAGE_VALUES.accessToken !== "undefined"
  ) {
    console.log("Found a valid access token in local storage!");
    console.log(`Access token: ${LOCALSTORAGE_VALUES.accessToken}`);
    return LOCALSTORAGE_VALUES.accessToken;
  }

  // If there's a token in the URL query parameters (and none in storage), store and use the given token
  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    // Store the query parameters in local storage
    for (const property in queryParams) {
      typeof window === "undefined"
        ? null
        : window.localStorage.setItem(property, queryParams[property]);
    }

    // Set timestamp
    typeof window === "undefined"
      ? null
      : window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

    console.log("Set the access token from URL query parameters!");
    console.log(`Access token: ${queryParams[LOCALSTORAGE_KEYS.accessToken]}`);

    // Return the access token from the query parameters
    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }

  console.log("Failed to get access token!");
  return false;
};

/**
 * Checks if the amount of time between the timestamp in storage and the present moment exceeds the token's expiration time of 1 hour
 * @returns {boolean} Whether or not the access token in local storage has expired
 */
const hasTokenExpired = () => {
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;

  // If either the access token or timestamp is missing, there is no expired access token in storage
  if (!accessToken || !timestamp) {
    return false;
  }

  // If the amount of time that has passed since the token was set is greater than its expiration time, the token has expired
  const millisecondsElapsed = Date.now() - Number(timestamp);
  // Spotify's 'expires_in' parameter is measured in seconds
  return millisecondsElapsed / 1000 > Number(expireTime);
};

/**
 * Use the refresh token in local storage to connect to the Node app's /refresh_token endpoint and update the value in local storage with the response
 * @returns {void}
 */
const refreshToken = async () => {
  try {
    // Log out if there's no refresh token stored (or if somehow stuck in an infinite loop trying to get one)
    if (
      !LOCALSTORAGE_VALUES.refreshToken ||
      LOCALSTORAGE_VALUES.refreshToken === "undefined" ||
      Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000
    ) {
      console.error("No refresh token available!");
      logout();
    }

    console.log("Refreshing access token...");
    console.log(`Refresh token: ${LOCALSTORAGE_VALUES.refreshToken}`);

    // Await the completion of the `/refresh_token` endpoint from the Node app
    const { data } = await axios.get(
      `${BACKEND_URI}/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`
    );

    // Update values in local storage
    typeof window === "undefined"
      ? null
      : window.localStorage.setItem(
          LOCALSTORAGE_KEYS.accessToken,
          data.access_token
        );
    typeof window === "undefined"
      ? null
      : window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    console.log("Tokens saved in local storage.");

    // Reload the page so it reflects the changes to local storage
    typeof window === "undefined" ? null : window.location.reload();
  } catch (e) {
    console.error(e);
  }
};

/**
 * Logs the user out of Spotify and clears corresponding data in local storage
 * @returns {void}
 */
export const logout = () => {
  console.log("Clearing local storage...");
  // Clear all local storage items
  for (const property in LOCALSTORAGE_KEYS) {
    console.log(`Clearing ${property} from local storage...`);
    typeof window === "undefined"
      ? null
      : window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
  }
  console.log("Cleared local storage!");

  // Navigate to the homepage
  typeof window === "undefined"
    ? null
    : (window.location =
        typeof window === "undefined" ? null : window.location.origin);
};

/**
 * Get the current user's Spotify profile
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-current-users-profile
 * @returns {Promise}
 */
export const getCurrentUserProfile = () => axios.get("/me");

/**
 * Get the song that's currently playing
 * @returns {Promise}
 */
export const getCurrentlyPlaying = () => {
  return axios.get("/me/player/currently-playing");
};

/**
 * Get recently played songs
 * @returns {Promise}
 */
export const getRecentlyPlayed = () => {
  return axios.get("/me/player/recently-played");
};

export const accessToken = getAccessToken();

/**
 * Axios global request headers
 * https://github.com/axios/axios#global-axios-defaults
 */
axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
axios.defaults.headers["Content-Type"] = "application/json";
