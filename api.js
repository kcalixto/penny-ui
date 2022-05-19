import { URL } from '../constants/routes.js'

export async function getData(url) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json(); // parses JSON response into native JavaScript objects
}