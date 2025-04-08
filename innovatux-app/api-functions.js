import { IP_ADDR } from "./ip-addr";
import FormData from 'form-data';

//To toggle between testing locally and online server
const URL = `http://${IP_ADDR}:8000/api/`; // To test and run locally
//const URL = `http://170.64.199.247/api/`; // To test and run on cloud server

//User Authentication Functions

/**
 * Logs in user with the provided email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} The response data from the server.
 */
export const postLogin = async (email, password) => {
    const response = await fetch(`${URL}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
}

/**
 * Signs up a new user with the provided details.
 *
 * @param {string} first_name - user's first name.
 * @param {string} last_name - user's last name.
 * @param {string} username - desired username.
 * @param {string} email - user's email address.
 * @param {string} password - user's password.
 * @param {number} age - user's age.
 * @param {string} gender - user's gender.
 * @returns {Promise<Object>} The response data from the server.
 */
export const signup = async (first_name, last_name, username, email, password, age, gender) => {
    const response = await fetch(`${URL}signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, username, email, password, age, gender }),
    });
    const data = await response.json();
    return data;
}

/**
 * Logs out the authenticated user.
 *
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The response message from the server.
 */
export const logout = async (token) => {
    const response = await fetch(`${URL}logout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const message = await response.json();
    return message;
}

// Data Retrieval Functions
/**
 * Retrieves items from the server based on the specified endpoint.
 *
 * @param {string} item - The endpoint to fetch data from.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The data retrieved from the server.
 */
export const getThings = async (item, token) => {
    const response = await fetch(`${URL}${item}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
        const data = await response.json();
        return data;
}

// User Settings and Preferences

/**
 * Adds or updates user preferences.
 *
 * @param {Object} preferences - An object containing user preferences.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The response data from the server.
 */
export const addPreference = async (preferences, token) => {
    const response = await fetch(`${URL}add/preferences`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...preferences }),
    });
    const data = await response.json();
    return data;
}

/**
 * Changes the user's password.
 *
 * @param {string} old_password - The user's current password.
 * @param {string} new_password - The new password to set.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The response message from the server.
 */
export const changePassword = async (old_password, new_password, token) => {
    const response = await fetch(`${URL}change/password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ old_password, new_password }),
    });
    const message = await response.json();
    return message;
}

// Community Functions

/**
 * Allows the user to join a community.
 *
 * @param {number} community_id - The ID of the community to join.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The response message from the server.
 */
export const joinCommunity = async (community_id, token) => {
    const response = await fetch(`${URL}join`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ community_id }),
    });
    const message = await response.json();
    return message;
}

/**
 * Posts a message to a community.
 *
 * @param {string} content - The content of the message.
 * @param {number} community_id - The ID of the community.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The response data from the server.
 */
export const postMessage = async (content, community_id, token) => {
    const response = await fetch(`${URL}message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content, community_id }),
    });
    const data = await response.json();
    return data;
}

// Feed and Posts Functions

/**
 * Creates a new post in the user's feed.
 *
 * @param {string} caption - The caption for the post.
 * @param {string} image - The URI of the image to upload.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The response data from the server.
 */
export const postFeed = async (caption, image, token) => {
    const formData = new FormData();

    formData.append('caption', caption);

    // Get the filename and type from the imageUri
    /**
     * The code snippet (1. Retrieving Image) below has been sourced 
     * from https://chat.openai.com/ with the query 
     * "How to retrieve the image path from database". 
     * The code snippet appears in its original form
     */
    const imageName = image.split('/').pop();
    const imageType = imageName.split('.').pop();

    // Add the image file to the form data
    formData.append('image', {
        uri: image,
        name: imageName,
        type: `image/${imageType}`,  // Example: 'image/jpeg'
    });
    // End of code snippet (1. Retrieving Image)

    const response = await fetch(`${URL}posts`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });
    const data = await response.json();
    return data;
}

// User Input and Tracking

/**
 * Submits alcohol consumption data.
 *
 * @param {string} date - The date of consumption.
 * @param {number} price - The price spent on alcohol.
 * @param {number} amount - The quantity of alcohol consumed.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The response data from the server.
 */
export const postInput = async (date, price, amount, token) => {
    const response = await fetch(`${URL}input`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ date, price, amount }),
    });
    const data = await response.json();
    return data;
}

// Social Interaction Functions
/**
 * Follows a user.
 *
 * @param {number} user_id - The ID of the user to follow.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The response message from the server.
 */
export const followUser = async (user_id, token) => {
    const response = await fetch(`${URL}follow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id }),
    });
    const message = await response.json();
    return message;
}

/**
 * Unfollows a user.
 *
 * @param {number} user_id - The ID of the user to unfollow.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The response message from the server.
 */
export const unfollowUser = async (user_id, token) => {
    const response = await fetch(`${URL}unfollow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id }),
    });
    const message = await response.json();
    return message;
}

/**
 * Likes a post.
 *
 * @param {Object} post - The post object containing at least an 'id' property.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The response message from the server.
 */
export const likePost = async (post, token) => {
    const response = await fetch(`${URL}like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ post_id: post.id }),
    });
    const message = await response.json();
    return message;
}