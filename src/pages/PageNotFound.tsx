// react imports
import { useHistory } from 'react-router';

// components
import { Button } from '../components/Button';
import { Head } from '../components/Head';

// image files
import illustrationImg from '../assets/images/illustration.svg';

// styles and icons import
import { FiCornerUpLeft } from 'react-icons/fi'
import '../styles/auth.scss'
import '../styles/error404.scss'

type pageNotFoundType = {
  alternateMessage?: string;
  messageComplete?: string
}

export function PageNotFound({alternateMessage = 'página', messageComplete}:pageNotFoundType) {
  const history = useHistory()

  return (
    <div id="page-error">
      <Head Title="Error 404"/>
      <main>
        <div className="container">
          <strong>404</strong>
          {alternateMessage? (
            <p>A {alternateMessage} que você está procurando <br /> não existe. </p>
          ) : (
            <p>{messageComplete}</p>
          )}
          <Button type="submit" isOutlined
            onClick={() => history.push('/')}
          >
            <FiCornerUpLeft className="global-icon2" color={'var(--base-color)'} /> 
            Voltar para o começo
          </Button>

        </div>
        <div className="background">
          <img src={illustrationImg} alt="Imagem de fundo" />
          <img src={illustrationImg} alt="Imagem de fundo" />
        </div>
      </main>
    </div>
  );
}