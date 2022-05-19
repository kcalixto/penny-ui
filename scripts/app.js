import { URL, START_ENDPOINT, STOP_ENDPOINT } from '../constants/routes.js'

const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const statusText = document.getElementById('status-text');

startButton.onclick = async () => {
    setStatus("starting...")
    const res = await getData(START_ENDPOINT)
}

stopButton.onclick = async () => {
    setStatus("stoping...")
    const res = await getData(STOP_ENDPOINT)
}

export async function getData(url) {
    const response = await fetch(URL + url, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            // 'Content-Type': 'application/json'
        },
    });
    setStatus(response.status)
    console.log("response: ", response)
    return response.status;
}

function setStatus(status) {
    if(status === 0){
        statusText.innerHTML = "Done!";
    }else{
        statusText.innerHTML = status;
    }
}