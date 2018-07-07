import axios from 'axios'
export default class GenericStore {
    constructor () {
        this.httpClient = axios.create({
            baseURL:'http://localhost:3000/api/'
        })
    }
}
