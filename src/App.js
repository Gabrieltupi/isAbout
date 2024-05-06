import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contato from "./components/pages/contato/Contato";
import Empresa from "./components/pages/empresa/Empresa";
import NovoProjeto from "./components/pages/novoprojeto/NovoProjeto";
import Home from "./components/pages/home/Home";
import Container from "./components/layout/corpo/Container";
import NavBar from "./components/layout/cabecalho/NavBar";
import Footer from "./components/layout/rodape/Footer";
import Projetos from "./components/pages/meusprojetos/Projetos";
import Projeto from "./components/pages/meusprojetos/Projeto";


function App() {

  return (
    <Router>
      <NavBar/>

      <Container CustomClass="min_height">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/contato" element={<Contato/>}/>
          <Route path="/empresa" element={<Empresa/>}/>
          <Route path="/projetos" element={<Projetos/>}/>
          <Route path="/novoprojeto" element={<NovoProjeto/>}/>
          <Route path="/projeto/:id" element={<Projeto/>}/>
        </Routes>
      </Container>

      <Footer/>
    </Router>
  );
}

export default App;