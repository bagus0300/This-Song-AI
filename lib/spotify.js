"use client";
import axios from "axios";

const BACKEND_URI =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://192.168.4.158:8000"
    : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

const LOCALSTORAGE_KEYS = {
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expireTime: "spotify_token_expire_time",
  timestamp: "spotify_token_timestamp",
  clientToken: "spotify_client_token",
  clientTokenExpireTime: "spotify_client_token_expire_time",
  clientTokenTimeStamp: "spotify_client_token_timestamp"
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
      : window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
  clientToken:
    typeof window === "undefined"
      ? null
      : window.localStorage.getItem(LOCALSTORAGE_KEYS.clientToken),
  clientTokenExpireTime:
    typeof window === "undefined"
      ? null
      : window.localStorage.getItem(LOCALSTORAGE_KEYS.clientTokenExpireTime),
  clientTokenTimeStamp:
    typeof window === "undefined"
      ? null
      : window.localStorage.getItem(LOCALSTORAGE_KEYS.clientTokenTimeStamp)
};

/**
 * Retrieves the Spotify access token from local storage or from the URL query params
 * @returns {string} A Spotify access token
 */
export const getAccessToken = () => {
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
    console.log("Refreshing token...");
    refreshToken();
  }

  // If there's a valid access token in storage, use that
  if (
    LOCALSTORAGE_VALUES.accessToken &&
    LOCALSTORAGE_VALUES.accessToken !== "undefined"
  ) {
    // console.log("Found a valid access token in local storage!");
    // console.log(`Access token: ${LOCALSTORAGE_VALUES.accessToken}`);
    return LOCALSTORAGE_VALUES.accessToken;
  }

  // If there's a token in the URL query parameters, store and use the given token
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

    // console.log("Set the access token from URL query parameters!");
    // console.log(`Access token: ${queryParams[LOCALSTORAGE_KEYS.accessToken]}`);

    // Return the access token from the query parameters
    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }

  // console.log("Failed to get access token!");

  return false;
};

// const getStorageToken = () => {
//   // If there's a valid access token in storage, use that
//   if (
//     LOCALSTORAGE_VALUES.accessToken &&
//     LOCALSTORAGE_VALUES.accessToken !== "undefined" &&
//     !hasTokenExpired()
//   ) {
//     // console.log("Found a valid access token in local storage!");
//     // console.log(`Access token: ${LOCALSTORAGE_VALUES.accessToken}`);
//     return LOCALSTORAGE_VALUES.accessToken;
//   } else {
//     // console.log("Failed to get access token from local storage!");
//     // refreshToken();
//     return false;
//   }
// };

export const getClientAccessToken = async () => {
  if (
    LOCALSTORAGE_VALUES.clientToken &&
    LOCALSTORAGE_VALUES.clientToken !== "undefined" &&
    !hasClientTokenExpired()
  ) {
    console.log("Found a valid client access token in local storage!");
    return {
      clientToken: LOCALSTORAGE_VALUES.clientToken,
      clientTokenExpireTime: LOCALSTORAGE_VALUES.clientTokenExpireTime,
      clientTokenTimeStamp: LOCALSTORAGE_VALUES.clientTokenTimeStamp
    };
  } else {
    const newClientAccessToken = await setClientAccessToken();
    return newClientAccessToken;
  }
};

const setClientAccessToken = async () => {
  console.log("Getting a new client access token from Spotify...");

  const { data } = await axios.get(
    `${BACKEND_URI}/api/v1/spotify/client_token`
  );

  // Update values in local storage
  typeof window === "undefined"
    ? null
    : window.localStorage.setItem(
        LOCALSTORAGE_KEYS.clientToken,
        data.access_token
      );
  typeof window === "undefined"
    ? null
    : window.localStorage.setItem(
        LOCALSTORAGE_KEYS.clientTokenExpireTime,
        data.expires_in
      );
  typeof window === "undefined"
    ? null
    : window.localStorage.setItem(
        LOCALSTORAGE_KEYS.clientTokenTimeStamp,
        Date.now()
      );
  // console.log("Client token data saved in local storage.");

  return {
    clientToken: data.access_token,
    clientTokenExpireTime: data.expires_in,
    clientTokenTimeStamp: Date.now()
  };
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

export const hasClientTokenExpired = (token = null) => {
  console.log("Checking if client token has expired...");
  console.log("token", token);

  const { clientToken, clientTokenTimeStamp, clientTokenExpireTime } =
    token || LOCALSTORAGE_VALUES;

  // If either the access token or timestamp is missing, there is no expired client access token in storage
  if (!clientToken || !clientTokenTimeStamp) {
    return false;
  }

  // If the amount of time that has passed since the token was set is greater than its expiration time, the token has expired
  const millisecondsElapsed = Date.now() - Number(clientTokenTimeStamp);
  // Spotify's 'expires_in' parameter is measured in seconds
  return millisecondsElapsed / 1000 > Number(clientTokenExpireTime);
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

    // console.log("Refreshing access token...");

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
    // console.log("Tokens saved in local storage.");

    // Reload the page so it reflects the changes to local storage
    typeof window === "undefined" ? null : window.location.reload();
  } catch (e) {
    console.error(e);
  }

  return true;
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

  // // Navigate to the homepage
  // typeof window === "undefined"
  //   ? null
  //   : (window.location =
  //       typeof window === "undefined" ? null : window.location.origin);
};

/**
 * Get the current user's Spotify profile
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-current-users-profile
 * @returns {Promise}
 */
export const getCurrentUserProfile = async () => {
  const token = getAccessToken();
  if (!token) {
    throw new Error("Access token not found!");
  }
  return axios.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

/**
 * Get the song that's currently playing
 * @returns {Promise}
 */
export const getCurrentlyPlaying = (token = null) => {
  if (!token) {
    throw new Error("Access token not found!");
  }
  console.log(token);
  return axios.get("/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return axios.get("/me/player/currently-playing");
};

/**
 * Get recently played songs
 * @returns {Promise}
 */
export const getRecentlyPlayed = (token = null, limit = 50) => {
  if (!token) {
    throw new Error("Access token not found!");
  }
  console.log(token);
  return axios.get(`/me/player/recently-played?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return axios.get(`/me/player/recently-played?limit=${limit}`);
};

/**
 * Get user's top tracks
 * @returns {Promise}
 */
export const getTopSongs = (token = null, limit = 50) => {
  if (!token) {
    throw new Error("Access token not found!");
  }
  console.log(token);
  return axios.get(`/me/top/tracks?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return axios.get(`/me/player/recently-played?limit=${limit}`);
};

export const getTopSongsGlobal = (token = null, limit = 50) => {
  if (!token) {
    throw new Error("Access token not found!");
  }
  console.log(token);
  return axios.get(`/playlists/37i9dQZEVXbMDoHDwVN2tF`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return axios.get(`/me/player/recently-played?limit=${limit}`);
};

/**
 * Get the track with the given id
 * @param {string} id
 * @returns {Promise}
 */
export const getTrack = async (id, token = null) => {
  if (!token) {
    throw new Error("Access token not found!");
  }
  console.log(token);

  if (token) {
    return axios.get(`/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } else {
    return null;
    return axios.get(`/tracks/${id}`);
  }
};

/**
 * Get queried songs
 * @returns {Promise}
 */
export const searchTracks = async (query, token = null, limit = 50) => {
  let accessToken = token;

  console.log("Searching...");

  // If we're given a token, use that
  if (accessToken) {
    console.log("accessToken:", accessToken);
    return axios.get(`/search?q=${query}&type=track&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  } else {
    return null;
    return axios.get(`/search?q=${query}&type=track&limit=${limit}`);
  }
};

export const searchAlbums = async (query, token = null, limit = 24) => {
  let accessToken = token;

  console.log("Searching...");

  // If we're given a token, use that
  if (accessToken) {
    console.log("accessToken:", accessToken);
    return axios.get(`/search?q=${query}&type=album&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  } else {
    return null;
    return axios.get(`/search?q=${query}&type=album&limit=${limit}`);
  }
};

export const searchArtists = async (query, token = null, limit = 24) => {
  let accessToken = token;

  console.log("Searching...");

  // If we're given a token, use that
  if (accessToken) {
    console.log("accessToken:", accessToken);
    return axios.get(`/search?q=${query}&type=artist&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  } else {
    return null;
    return axios.get(`/search?q=${query}&type=album&limit=${limit}`);
  }
};

export const accessToken = getAccessToken();
// export const clientAccessToken = getClientAccessToken();

/**
 * Axios global request headers
 * https://github.com/axios/axios#global-axios-defaults
 */
axios.defaults.baseURL = "https://api.spotify.com/v1";
// axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
axios.defaults.headers["Content-Type"] = "application/json";
