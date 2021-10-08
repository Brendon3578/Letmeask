// react imports
import { Link } from 'react-router-dom';

// components
import { Head } from '../components/Head';
import { Header } from './../components/Header';
import { Button } from '../components/Button';

// image files
import homeImage from '../assets/images/home-image1.svg'

// styles and icons import
import '../styles/home.scss'

export function Home() {
  return(
    <div id="page-home">
      <Header>
        <Head />
        <Link to='/auth'>
          <Button>
            Entrar
          </Button>
        </Link>
      </Header>
      <main>
        <section className="hero-container">
          <div className="title-side">
            <h1>
              Crie salas de Q&amp;A com respostas <br/> ao-vivo
            </h1>
            <p>
              Respondas as perguntas de seus convidados com respostas em realtime.
              Favorite as melhores perguntas e acelere a comunicação com os seus convidados.
            </p>

            <Link to='/auth'>
              <Button isOutlined >
                Crie uma nova sala
              </Button>
            </Link>

          </div>
          <div className="image-side">
            <img src={homeImage} alt="Ilustração do Design Mobile do Letmeask" />
          </div>
        </section>
      </main>
    </div>
  )
}