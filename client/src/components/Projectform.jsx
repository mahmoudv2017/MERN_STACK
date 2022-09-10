import React from 'react';
import {Button} from 'react-bootstrap'
import { addProject  } from '../data/api';


function ProjetForm(props) {
    let submitter = async (e) => {
        e.preventDefault()
        let result = {
            name : e.target.name.value,
            description : e.target.description.value,
            status : e.target.status.value,
            clientID : e.target.client.value,
    
        }
        console.log(result)
       await addProject(result)
    }

    return ( 
 

       
      <form className={'input_from ' + props.state} onSubmit={(e)=>submitter(e)}>
        <label htmlFor='name'>Name</label>
        <input type="text" name="name" id="name"/>

        <label htmlFor='description'>description</label>
        <input type="text" name="description" id="description" />

        <label htmlFor='clients'>Choose Client:</label>
        <select id="clients" name="client">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
        </select>

        <label htmlFor='status'>Status</label>
        <select id="status" name="status">

            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
        </select>

        <Button className='submit-button' type='submit' variant='outline-primary'>Submit</Button>

     </form> 
   
  
    
    );
}

export default ProjetForm;