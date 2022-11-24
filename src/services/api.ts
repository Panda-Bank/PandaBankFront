import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://panda-1669254011031.azurewebsites.net/'
})