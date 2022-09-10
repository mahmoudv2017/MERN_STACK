const {Axios} = require('axios')

const api = new Axios({
    baseURL : "http://localhost:8000"
  
})



export {api }