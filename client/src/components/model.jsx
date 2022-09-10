import React  from 'react';
import UserForm from './userForm';
import Projectform from './Projectform'

function Model(props) {




    return ( 
    <>

        <div onClick={props.backdropper} className='backdrop'></div>
        {props.state.target === "client" ? <UserForm /> : <Projectform />}
    </>
  
    
    );
}

export default Model;