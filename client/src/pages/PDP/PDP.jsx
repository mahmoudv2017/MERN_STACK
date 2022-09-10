import React , {useEffect , useState } from 'react';
import {useParams , useNavigate} from 'react-router-dom'
import { api } from '../../data/api';
import './style.scss'
import {Button} from 'react-bootstrap'
import user from '../../assets/user.png'
import phone from '../../assets/phone-call.png'
import email from '../../assets/email.png'
import back from '../../assets/back.png'


function PDP() {

    const {id} = useParams()
    const [project,setProject] = useState(null);
    const nav = useNavigate() 


    useEffect(() => {
        async function get_Project(){
            let reponse = await api.get(`/graphql?query={project(id:"${id}"){name,description,status,client{name,email,phone}}}`)
            reponse = JSON.parse(reponse.data)
            setProject(reponse.data.project[0])

        }

        get_Project()
    } , [id])

    
    return ( 
        <div className='project_desc'>
           
            {
                project ? 
                <>
                    <Button className='back_button' variant='outline-primary' onClick={() => nav('/')}> <img src={back} style={{width:"25px"}} alt="" /> </Button>
                    <h1 className='title'>{project.name}</h1>

                    

                    
                    <p>{project.description}</p>
                    <h5>Project Status</h5>
                    <p className='status'>{project.status}</p>



                    <h5 className='sub-title'>Client Information</h5>

                    <div className="client-info ">
                        <p className='Capitalize'> <span> <img src={user} alt="" /> </span> {project.client.name} </p>
                            <hr />
                        <p> <span><img src={phone} alt="" /> </span> {project.client.email} </p>
                            <hr />
                        <p> <span><img src={email} alt="" /> </span> {project.client.phone} </p>
                    </div>

                    <h1 className='sub-title'>Update Project Details</h1>

                    <form action="" method="post">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id='name' placeholder={project.name} />

                        <label htmlFor="description">description</label>
                        <textarea type="text" name="description" id='description' placeholder={project.description} />


                        <label htmlFor='status'>Status</label>
                        <select id="status" name="status">

                            <option value="new">Not Started</option>
                            <option value="incompelete">Not Compeleted</option>
                            <option value="finished">Compeleted</option>
                        </select>
                        {/* <label htmlFor="status">status</label>
                        <input type="selec" name="name" id='name' placeholder={project.name} /> */}

                        <Button variant='outline-primary' type='submit' >Update Project</Button>
                        <Button  variant='outline-danger'> Delete Project </Button>

                    </form>
                </>

                :  <h1>Loading.........</h1>
            }

           
            {/* <h1> belongs to {project.client.name}</h1> */}
        </div>

     );
}

export default PDP;