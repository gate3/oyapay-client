import axios from 'axios'

export default class GenericStore {
    constructor () {
        this.httpClient = axios.create({
            baseURL: 'https://calm-hollows-95665.herokuapp.com/api/'
        })
    }
}
