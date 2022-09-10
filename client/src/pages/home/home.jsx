import React , {useEffect , useState} from 'react';
import { api } from '../../data/api';
import {NavLink} from 'react-router-dom'
import './style.scss'
import {Button} from 'react-bootstrap'
import Model from '../../components/model';

const mapper = {
    "just started" : 'blue',
    "Compeleted" : 'red',
    "Not Compeleted" : 'green',
}

function Home() {

    const [clients, setClients] = useState(null);
    const [status , setStatus] = useState(null)
    useEffect( () => {
        async function get_clients(){
            let reponse = await api.get('/graphql?query={projects{name,description,id,status , client{name,id}}}')
            reponse = JSON.parse(reponse.data)
       
            setClients(reponse.data.projects)
       
        }
        get_clients()


    }, []);

    let button_handler = (target) => {
        
        setStatus({visible : 'appear' , target : target})
    }

    let backdropper = () => {
        
        setStatus(null)
    }


    return ( 
        <>
        {status ? <Model state={status} backdropper={backdropper} /> : false}
        <h1>Home</h1>
            <div className="buttons">
                <Button variant='primary' onClick={() => button_handler('project')}>Add Project</Button>
                <Button variant='danger' onClick={() => button_handler('client')} >Add Client</Button>
            </div>
       
       
            {clients ? clients.map((elemnt , index) => {
                return (
                    
                    <div key={index}  className="custom_row"> 
                        <NavLink to={"/"+elemnt.client.id}> {elemnt.client.name}</NavLink>
                        <NavLink to={"/"+elemnt.id}> {elemnt.name}</NavLink>
                        <p className={[mapper[elemnt.status] , 'status'].join(' ')} > {elemnt.status}</p>

                        <p className='date'> project due date </p>
                    </div>

                    
                
                )
            }) : <h1>Loading .... </h1>
        
            }
      
       
 

        </>

     );
}

export default Home;