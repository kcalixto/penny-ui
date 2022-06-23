export const API_ENDPOINT = getUrl(process.env.NODE_ENV)

export const INSTANCES_ENDPOINT = '/instances'
export const START_ENDPOINT = '/start'
export const STOP_ENDPOINT = '/stop'

function getUrl(env) {
    switch (env) {
        case "local":
            return "http://localhost:5000"
        case "development":
            return "https://lqyxatfabe.execute-api.sa-east-1.amazonaws.com/prod"
    }
}