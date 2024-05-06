import styles from './FormularioProjeto.module.css'
import Input from './Input'
import Select from './Select'
import SubmitButton from './SubmitButton'
import {useEffect, useState} from 'react'

function FormularioProjeto({handleSubmit,btnText,projectData}){
    const textSelect= 'isAbout'
    const [categories, setCategories]= useState([])
    const [project, setProject]= useState(projectData||{})

    useEffect(()=>{
        fetch("http://localhost:5000/categories",{
        method: "GET",
        headers:{
            'Content-type': 'aplication/json',
        },
    })
        .then((resp)=> resp.json())
        .then((data)=>{
            setCategories(data)
        })
        .catch((err)=> console.log(err,'erro com o backend'))
    },[])

    const submit=(e)=>{
        e.preventDefault()
        console.log(project)
        handleSubmit(project)
    }
    function handleChange(e){
        setProject({...project,[e.target.name]: e.target.value})
    }
    function handleChangeSelect(e){
        setProject({...project,category:{
            id: e.target.value,
            name:e.target.options[e.target.selectedIndex].text,
        }})
    }
   
    return (
        <form onSubmit={submit} className={styles.form}>
            <Input type='text' text='Nome do projeto' name='name' placeholder='Insira o nome do projeto' handleOnChange={handleChange} value={project.name ? project.name: ''}/>
            <Input type='number' text='Orçamento do projeto' name='budget' placeholder='Insira o teto orçamental do seu projeto' handleOnChange={handleChange} value={project.budget ? project.budget:''}/>
            <Select name='category_id' text={`O que seu projeto ${textSelect}?`} options={categories} handleOnChange={handleChangeSelect} value={project.category ? project.category.id : ''}/>
            <SubmitButton text={btnText} />
        </form>
    )
}
export default FormularioProjeto