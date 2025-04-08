import axios from 'axios'

export default axios.create({
    baseURL: 'http://54.183.65.34:4000/api/v1/auth'
})