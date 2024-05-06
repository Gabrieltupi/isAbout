import FormularioProjeto from '../../formulario/FormularioProjeto'
import styles from './NovoProjeto.module.css'
import { useNavigate } from 'react-router-dom'

function NovoProjeto(){
    const navigate= useNavigate()
    function createPost(project){
        //initialize cost and services
        project.cost=0
        project.services=[]
        fetch("http://localhost:5000/projects",{
            method: "POST",
            headers:{
                'content-type':'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            console.log(data)
            // redirect
            navigate('/projetos', {state:{message:'Projeto criado com sucesso'}})
        })
        .then().catch(err=> console.log(err,'erro no serviço do bd'))
    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviçõs</p>
            <FormularioProjeto handleSubmit={createPost} btnText= 'Criar Projeto'/>
        </div>
    )
}
export  default NovoProjeto