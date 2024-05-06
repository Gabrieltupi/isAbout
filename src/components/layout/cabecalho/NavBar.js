import { Link } from "react-router-dom"
import Container from "../corpo/Container"
import styles from "./NavBar.module.css"
import logo from "../../../img/dola_isAboutRedimencionado.png"

function NavBar(){
    return(
        <nav className={styles.navbar}>
        <Container>
            <Link to="/">
                <img src={logo} alt='isAbout'/>
            </Link>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link to="/">Home  </Link>
                </li>
                <li className={styles.item}>
                    <Link to="/contato">Contato  </Link>
                </li>
                <li className={styles.item}>
                    <Link to="/empresa">Empresa  </Link>
                </li>
                <li className={styles.item}>
                    <Link to="/projetos">Projetos</Link>
                </li>
            </ul>
        </Container>
      </nav>
    )
}
export default NavBar