import React from 'react';
import {Button} from 'react-bootstrap'
import { addClient } from '../data/api';

function UserForm(props) {

    let submitter = async (e) => {
        e.preventDefault()
        let result = {
            name : e.target.name.value,
            email : e.target.email.value,
            phone : e.target.phone.value,
        }

       await addClient(result)


    }

    return ( 
 

       
      <form className={'input_from ' + props.state} onSubmit={submitter}>
        <label htmlFor='name'>Name</label>
        <input type="text" name="name" id="name" placeholder='Name' />

        <label htmlFor='email'>Email</label>
        <input type="text" name="email" id="email" placeholder='Email' />

        <label htmlFor='phone'>Phone</label>
        <input type="tel" name="phone" id="phone" placeholder='Phone' />

        <Button className='submit-button' type='submit' variant='outline-primary'>Submit</Button>

     </form> 
   
  
    
    );
}

export default UserForm;