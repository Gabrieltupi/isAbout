import Message from "../../layout/Message"
import { useLocation } from "react-router-dom"
import styles from './Projetos.module.css'
import Container from "../../layout/corpo/Container"
import LinkButton from "../../layout/corpo/LinkButton"
import CardProjetos from "../../formulario/cards/CardProjetos"
import { useState, useEffect } from "react"
import Loading from "../../layout/Loading"
import fazerRequisicao from '../../utils/Fetch'

function Projetos(){
    const [projetos,setProjetos]=useState([])
    const[removeLoading,setRemoveLoading]= useState(false)
    const [mensagemProjeto,setMensagemProjeto]= useState('')

    useEffect(()=>{
        async function buscaProjetos(){
            const data = await fazerRequisicao('http://localhost:5000/projects')
            setProjetos(data);
            setRemoveLoading(true); 
        }
        buscaProjetos()
    },[])    

    const location=useLocation()
    let message=''
    if(location.state){
        message= location.state.message
    }
    
     async function removeProject(id){
        await fazerRequisicao(`http://localhost:5000/projects/${id}`, 'DELETE')
        setProjetos(projetos.filter(projeto => projeto.id !== id))
        setMensagemProjeto('Projeto removido com sucesso')
    }
    
    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/novoprojeto' text='Criar Projeto'/>
            </div>
            {message && <Message type='sucess' mensagem={message}/>}
            <Container customClass="start">
                {projetos.length>0 && projetos.map((projeto)=>
                    <CardProjetos id={projeto.id} name={projeto.name} budget={projeto.budget} category={projeto.category?.name ?? 'categria desconhecida'} key={projeto.id}
                    handleRemove={removeProject}/>
                )}
                {!removeLoading && <Loading/>}
                {mensagemProjeto && <Message type='sucess' mensagem={mensagemProjeto}/>}

                {removeLoading && projetos.length===0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}
export default Projetos