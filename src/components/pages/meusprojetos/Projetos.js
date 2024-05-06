import Message from "../../layout/Message"
import { useLocation } from "react-router-dom"
import styles from './Projetos.module.css'
import Container from "../../layout/corpo/Container"
import LinkButton from "../../layout/corpo/LinkButton"
import CardProjetos from "../../formulario/CardProjetos"
import { useState, useEffect } from "react"
import Loading from "../../layout/Loading"

function Projetos(){
    const [projetos,setProjetos]=useState([])
    const[removeLoading,setRemoveLoading]= useState(false)
    const [mensagemProjeto,setMensagemProjeto]= useState('')

    useEffect(()=>{
        fetch('http://localhost:5000/projects',{
            method: 'GET',
            headers:{
                'Content-type': 'application/json',
            },
        }).then(resp=> resp.json())
        .then(data=>{
            setProjetos(data)
            console.log(data)
            setRemoveLoading(true)
        })
        .catch((err)=> console.log(err,'Erro ao buscar Projetos do BD'))
    },[])    

    const location=useLocation()
    let message=''
    if(location.state){
        message= location.state.message
    }

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`,{
            method:'DELETE',
            headers:{
                'Content-type': 'application/json',
            },
        }).then(resp=>resp.json())
        .then(data=>{
            setProjetos(projetos.filter((projeto)=>projetos.id!==id))
            setMensagemProjeto('Projeto removido com sucesso')
        })
        .catch(err=> console.log(err,'Erro ao deletar'))
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
                    <CardProjetos id={projeto.id} name={projeto.name} budget={projeto.budget} category={projeto.category.name} key={projeto.id}
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