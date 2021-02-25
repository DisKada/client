import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://diskada-new-server.herokuapp.com/'
})

export default instance
