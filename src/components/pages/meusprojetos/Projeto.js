import styles from './Projeto.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../../layout/Loading'
import Container from '../../layout/corpo/Container'
import FormularioProjeto from '../../formulario/FormularioProjeto'
import Message from '../../layout/Message'
import FormularioServico from '../../formulario/FormularioServico'
import {parse,v4 as uuidv4} from 'uuid' 

function Projeto(){
        const {id}= useParams()
        const [projeto, setProjeto]= useState([])
        const [mostrarFormularioProjeto,setMostrarFormularioProjeto]=useState(false)
        const [mostrarServicoProjeto,setMostrarServicoProjeto]=useState(false)

        const [mensagem,setMessage]=useState()
        const [type,setType]=useState()

        useEffect(()=>{
            setTimeout(()=>{
                fetch(`http://localhost:5000/projects/${id}`,{
                method:'GET',
                headers:{
                    'Content-type':'application/json',
                },
                }).then(resp=>resp.json())
                    .then((data)=>{
                    setProjeto(data)
                    })
                    .catch(err => console.log(err,'Erro ao buscar projeto'))
            },300)
        },[id])  


        function editPost(projeto){
            setMessage('')
            if(projeto.budget<projeto.cost){
                setMessage('O orçamento não pode ser menor que o custo do proojeto')
                setType('error')
                return false
            }

            fetch(`http://localhost:5000/projects/${projeto.id}`,{
                method:'PATCH',
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify(projeto),
            }).then(resp=>resp.json())
            .then((data)=>{
                setProjeto(data)
                setMostrarFormularioProjeto(false)
                setMessage('Projeto atualizado')
                setType('sucess')
            })
            .catch(err=>console.log(err,"Erro ao atualizar"))
        }

        function createService(){
            setMessage('')

            //ultimo serviço
            const ultimoServico= projeto.services[projeto.services.length-1]
            ultimoServico.id=uuidv4()

            const ultimoServicoCusto=ultimoServico.cost
            const novoCusto= parseFloat(projeto.cost)+ parseFloat(ultimoServicoCusto)

            if(novoCusto>parseFloat(projeto.budget)){
                setMessage('Orçamento ultrapassado!')
                setType('error')
                projeto.services.pop()
                return false
            }

            projeto.cost=novoCusto

            fetch(`http://localhost:5000/projects/${projeto.id}`,{
                method:'PATCH',
                headers:{
                    'Content-type': 'application/json',
                },
                body:JSON.stringify(projeto)
            })
            .then(resp=>resp.json())
            .then((data)=>{
                console.log(data)
            })
            .catch((err)=>  console.log(err,'Erro ao adicionar serviço'))
            setMessage('Serviço adicionado')
            setType('sucess')
        }


        function toggleProjectForm(){
            setMostrarFormularioProjeto(!mostrarFormularioProjeto)
        }
        function toggleServiceForm(){
            setMostrarServicoProjeto(!mostrarServicoProjeto)
        }

        return (<>
            {projeto.name ? (
                <div className={styles.project_detail}>
                    <Container customClass='column'>
                        {mensagem && <Message type={type} mensagem={mensagem}/>}
                        
                        <div className={styles.details_container}>
                            <h1>Projeto: {projeto.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!mostrarFormularioProjeto ? 'Editar':'Cancelar'}
                            </button>

                            {!mostrarFormularioProjeto ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {projeto.category.name}
                                    </p>
                                    <p>
                                        <span>Teto orçamental:</span> R${projeto.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> R${projeto.cost}
                                    </p>
                                </div>

                            ):(

                                <div className={styles.project_info}>
                                    <FormularioProjeto handleSubmit={editPost} btnText="Concluir edição" projectData={projeto} />
                                </div>
                            )}
                        </div>

                        
                        <div className={styles.service_form_container}>
                            <div>
                                <h1>Adicione um serviço: </h1>
                            </div>
                            <div>
                                {projeto &&
                                    <h3>O teto restante é R${projeto.budget-projeto.cost}</h3>
                                }   
                            </div>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!mostrarServicoProjeto ? 'Adicionar Serviço':'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {mostrarServicoProjeto && (
                                    <FormularioServico handleSubmit={createService} textBtn='Adicionar Serviço' projectData={projeto}/>
                                )}
                            </div>
                            <h2>Serviços</h2>
                            <Container customClass='start'>
                                <p>Itens de Serviços</p>
                            </Container>
                        </div>
                    </Container>
                    
                </div>
                
            ):(
                <Loading/>
            )}
        </>)

    
}
export default Projeto