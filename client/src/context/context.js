import {createContext, useContext} from 'react'
import {api} from '../data/api'
const Context = createContext({})

export function useDataContext() {
    return useContext(Context)
}

function DataContext (props) {

    const getClients = async () => {
        return await api.get(`graphql?query={clients{id,name}}`)
    
    }

    const removeProject = async (id) => {
        return await api.post(`/graphql?`, JSON.stringify({
    
            query : `mutation { removeProject(id:"${id}"){name}}`,
            variables : null
           
          })  ,{
            headers: {
                'Content-Type': "application/json; charset=utf-8"
              }
          } )
    
    }

    const updateProject = async (result) => {
        return await api.post(`/graphql?`, JSON.stringify({
    
            query : `mutation { UpdateProject(project_id:"${result.id}" , status:${result.status} , name:"${result.name}" , description:"${result.description}"){name}}`,
            variables : null
           
          })  ,{
            headers: {
                'Content-Type': "application/json; charset=utf-8"
              }
          } )
    
    }

    const getCLient = async (id) => {
        return await api.get(`/graphql?query={project(id:"${id}"){name,description,status,client{name,email,phone}}}`)
    }
    const getProjects= async () => {
        return await api.get(`/graphql?query={projects{name,description,id,status , client{name,id}}}`)
   
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


    return ( 
        <Context.Provider value={{getClients , addProject , addClient , getProjects , getCLient , removeProject,updateProject}}>
            {props.children}
        </Context.Provider>
     );
}

export default DataContext;