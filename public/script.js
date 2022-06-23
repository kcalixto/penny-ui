
const instancesDiv = document.getElementById('instances');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const statusText = document.getElementById('status-text');

getInstances(0)

async function getInstances() {
    const response = await fetch("/instances")
    const data = await response.json();
    console.log("data: ", data)

    var instances = [];

    data.map((obj) => {
        console.log("--------------------------------")
        readObject(obj, "")

        const main = makeObject(obj)

        const start_button = document.createElement('button')
        start_button.appendChild(document.createTextNode('start'))
        start_button.id = "instance-button"
        start_button.addEventListener('click', () => startInstance(obj.ID))

        const stop_button = document.createElement('button')
        stop_button.appendChild(document.createTextNode('stop'))
        stop_button.id = "instance-button"
        stop_button.addEventListener('click', () => stopInstance(obj.ID))

        main.appendChild(start_button)
        main.appendChild(stop_button)

        instances.push(main);

    })

    instances.map((instance) => {
        instancesDiv.appendChild(instance)
    })
}

function readObject(obj, spacing) {
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "object") {
            console.log(spacing + key)
            readObject(value, spacing + "   ")
        } else {
            console.log(spacing + key + ": " + value)
        }
    }
}

function makeObject(obj) {
    const KEY_STATUS = "State"
    const KEY_STATUS_RUNNING = "running"
    const KEY_STATUS_RUNNING_BG = "green"
    const KEY_STATUS_STOPPING = "stopping"
    const KEY_STATUS_STOPPING_BG = "yellow"

    const KEY_STATUS_STOPPED_BG = "red"


    const instanceContainer = document.createElement("div")
    instanceContainer.id = "instance-container"

    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "object") {
            instanceContainer.appendChild(makeObject(value))
        } else {
            const instanceTitle = document.createElement("p")
            instanceTitle.id = "instance-title"
            instanceTitle.appendChild(document.createTextNode(value))

            if (key === KEY_STATUS) {
                if (value == KEY_STATUS_RUNNING) {
                    instanceTitle.style.backgroundColor = KEY_STATUS_RUNNING_BG
                } else if (value == KEY_STATUS_STOPPING) {
                    instanceTitle.style.backgroundColor = KEY_STATUS_STOPPING_BG
                } else {
                    instanceTitle.style.backgroundColor = KEY_STATUS_STOPPED_BG
                }
            }

            instanceContainer.appendChild(instanceTitle)
        }
    }

    return instanceContainer
}

async function startInstance(id) {
    console.log("id: " + id)

    const fetchAPI = await fetch("https://lqyxatfabe.execute-api.sa-east-1.amazonaws.com/prod" + "/start/" + id, {
        method: 'GET',
        mode: 'no-cors',
    })

    const dataResponse = await fetchAPI.json();

    console.log("dataResponse: " + dataResponse)
}

async function stopInstance(id) {
    console.log("id: " + id)

    const fetchAPI = await fetch("https://lqyxatfabe.execute-api.sa-east-1.amazonaws.com/prod" + "/stop/" + id, {
        method: 'GET',
        mode: 'no-cors',
    })

    const dataResponse = await fetchAPI.json();

    console.log("dataResponse: " + dataResponse)
}

function setStatus(status) {
    console.log("recieved status? ", status)
    if (status === 0) {
        statusText.innerHTML = "Done!";
    } else {
        statusText.innerHTML = status;
    }
}