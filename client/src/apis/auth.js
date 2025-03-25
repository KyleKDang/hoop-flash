import axios from 'axios'

export default axios.create({
    baseURL: 'http://3.20.221.171:4000/api/v1/auth'
})