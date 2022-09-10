import React , {useEffect , useState } from 'react';
import {useParams , useNavigate} from 'react-router-dom'
import {useDataContext} from '../../context/context';
import './style.scss'
import {Button} from 'react-bootstrap'
import user from '../../assets/user.png'
import phone from '../../assets/phone-call.png'
import email from '../../assets/email.png'
import back from '../../assets/back.png'

const statuses_map = {
    'Compeleted' : 'finished',
    'Not Compeleted' : 'incompelete',
    'Not Started' : 'new',
}

function PDP() {

    const {id} = useParams()
    const [project,setProject] = useState(null);
    const nav = useNavigate() 
    const context = useDataContext()
    const [status , setStatus] = useState('incompelete')

    useEffect(() => {
        async function get_Project(){
            let reponse = await context.getCLient(id)
            reponse = JSON.parse(reponse.data)
            setStatus(reponse.data.project[0].status)
            setProject(reponse.data.project[0])

        }

        get_Project()
    } , [context , id])

    let delete_project = async () => {

        await context.removeProject(id)
        window.location.replace('/')
    }


    let update_project = async (e) => {
        
    

        e.preventDefault()

        const result = {
            id: id,
            name : e.target.name.value || project.name,
            description : e.target.description.value || project.description,
            status : e.target.status.value
            
        }

        console.log(result)

        await context.updateProject(result)

        window.location.replace('/')
        
    }
    
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

                    <form method="post" onSubmit={(e) => update_project(e)}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id='name' placeholder={project.name} />

                        <label htmlFor="description">description</label>
                        <textarea type="text" name="description" id='description' placeholder={project.description} />


                        <label htmlFor='status'>Status</label>
                        <select id="status" name="status" value={statuses_map[status]} onChange={e => setStatus(e.target.value)}>

                            <option value="new">Not Started</option>
                            <option value="incompelete" >Not Compeleted</option>
                            <option value="finished" >Compeleted</option>
                        </select>


                        <Button variant='outline-primary'  type='submit' >Update Project</Button>
                        <Button  variant='outline-danger' onClick={delete_project}> Delete Project </Button>

                    </form>
                </>

                :  <h1>Loading.........</h1>
            }

           
            {/* <h1> belongs to {project.client.name}</h1> */}
        </div>

     );
}

export default PDP;