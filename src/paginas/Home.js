import logo from '../logo.svg';
import '../App.css';

// Importa os componentes Header e Footer
import Header from '../header/Header';
import Footer from "../footer/Footer";
import './Home.css';

// Importar o recurso para criar link do React
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="App">
            {/* Importamos o componente Header criado */}
            <Header title="Formulário de cadastro" />

            <header className="App-header">
                <p>
                  Vamos fazer um cadastro senhores(as)?
                </p>
                
                <Link to="./Cadastro"> Acessar cadastro</Link>
                <Link to="./ListaRegistros"> Ver usuários cadastrados</Link>
                <Link to="./DownloadArquivos"> Fazer Download de Arquivos</Link>
            </header>

            {/* Importamos o componente Footer criado */}
            <Footer />
        </div>
    );
}

export default Home;
