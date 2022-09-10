import React , {useEffect , useState } from 'react';
import {Button} from 'react-bootstrap'
import {useDataContext} from '../context/context'



function ProjetForm(props) {

    const [clients , setClients] = useState(null);
    
    const DataContext = useDataContext()

    useEffect( () => {
       async function fetchData(){return await DataContext.getClients()}

       
       fetchData().then((res) => { 

        const reponse = JSON.parse(res.data)

        setClients(reponse.data.clients)

        })

    }, [DataContext]);


    let submitter = async (e) => {
        e.preventDefault()
        let result = {
            name : e.target.name.value,
            description : e.target.description.value,
            status : e.target.status.value,
            clientID : e.target.client.value,
    
        }

        await DataContext.addProject(result)

        window.location.reload(false);
    }

    return ( 
        
    <form className={'input_from ' + props.state} onSubmit={(e)=>submitter(e)}>
        <label htmlFor='name'>Name</label>
        <input type="text" name="name" id="name"/>

        <label htmlFor='description'>description</label>
        <input type="text" name="description" id="description" />

        <label htmlFor='clients'>Choose Client:</label>
        <select id="clients" name="client">


            {clients ? clients.map(client => {
                return (
                    <option key={client.id} value={client.id}>{client.name}</option>
                )
            }) : false}
        </select>

        <label htmlFor='status'>Status</label>
        <select id="status" name="status">

            <option value="new">Just Started</option>
            <option value="incompelete">Not Compeleted</option>
            <option value="finished">Completed</option>
        </select>

        <Button className='submit-button' type='submit' variant='outline-primary'>Submit</Button>

     </form> 
     
  
    
    );
}

export default ProjetForm;