import styles from './Home.module.css'
import saving from  '../../../img/cofrinhodolares.png'
import LinkButton from '../../layout/corpo/LinkButton'

function Home(){
    
    return(
        <section className={styles.home_container}>
            <h1>Bem-vindos a <span>isAbout</span></h1>
            <p>Comece a gerenciar os seu projetos agora mesmo!</p>
            
            <LinkButton to='/NovoProjeto' text='Criar projeto'/>
            <img src={saving} alt='imagem de cofrinho com dinheiro'/>
        </section>
        
    )

}
export default Home