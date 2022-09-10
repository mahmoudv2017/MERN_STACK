const {Axios} = require('axios')

const api = new Axios({
    baseURL : "http://localhost:8000"
  
})


const addClient = async (result) => {
    await api.post(`/graphql?`, JSON.stringify({

        query : `mutation { addClient(name:"${result.name}",email:"${result.email}",phone:"${result.phone}"){name}}`,
        variables : null
       
      })  ,{
        headers: {
            'Content-Type': "application/json; charset=utf-8"
          }
      } )
}

const addProject = async ( result) => {
    await api.post(`/graphql?`, JSON.stringify({

        query : `mutation { addProject(name:"${result.name}",description:"${result.description}",status:${result.status} , clientID:"${result.clientID}"){name}}`,
        variables : null
       
      })  ,{
        headers: {
            'Content-Type': "application/json; charset=utf-8"
          }
      } )
}

export {api , addClient , addProject}