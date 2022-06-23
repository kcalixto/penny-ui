import fetch from 'node-fetch'
import express from 'express'
import dotenv from 'dotenv'
import { API_ENDPOINT, INSTANCES_ENDPOINT, START_ENDPOINT, STOP_ENDPOINT } from './config/routes.js'
dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.static('public'))

app.listen(port, () => {
    console.log('listening on port: ' + port)
})

app.get(START_ENDPOINT + "/:id", async (request, response) => {
    const fetchAPI = await fetch(API_ENDPOINT + START_ENDPOINT + request.query.id, {
        method: 'GET',
        mode: 'no-cors',
    })

    const dataResponse = await fetchAPI.json();
    response.json(dataResponse)
})

app.get(STOP_ENDPOINT + "/:id", async (request, response) => {
    const fetchAPI = await fetch(API_ENDPOINT + STOP_ENDPOINT + request.query.id, {
        method: 'GET',
        mode: 'no-cors',
    })

    const dataResponse = await fetchAPI.json();
    response.json(dataResponse)
})

app.get(INSTANCES_ENDPOINT, async (request, response) => {
    const fetchAPI = await fetch(API_ENDPOINT + INSTANCES_ENDPOINT, {
        method: 'GET',
        mode: 'no-cors',
    })

    const dataResponse = await fetchAPI.json();
    response.json(dataResponse)
})