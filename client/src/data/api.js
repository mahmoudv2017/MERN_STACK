const {Axios} = require('axios')

const api = new Axios({
    baseURL : "http://localhost:8000"
  
})

const getClients = async () => {
    const reponse = await api.get(`graphql?query={clients{id,name}}`)
    return reponse
}

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

        query : `mutation { addProject(name:"${result.name}",description:"${result.description}",status:${result.status} , cliendID:"${result.clientID}"){name}}`,
        variables : null
       
      })  ,{
        headers: {
            'Content-Type': "application/json; charset=utf-8"
          }
      } )
}

export {api , addClient , addProject , getClients}