import FormularioProjeto from '../../formulario/FormularioProjeto'
import styles from './NovoProjeto.module.css'
import { useNavigate } from 'react-router-dom'
import fazerRequisicao from '../../utils/Fetch'

function NovoProjeto(){
    const navigate= useNavigate()
    async function createPost(project){
        project.cost=0
        project.services=[]

        await fazerRequisicao(`http://localhost:5000/projects`, 'POST', project) 
        navigate('/projetos',{state:{message:'Projeto criado com sucesso'}})
    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <FormularioProjeto handleSubmit={createPost} btnText= 'Criar Projeto'/>
        </div>
    )
}
export  default NovoProjeto