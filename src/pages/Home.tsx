// react imports
import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// services
import { database } from '../services/firebase';

// hooks
import { useAuth } from './../hooks/useAuth';

// components
import { Head } from '../components/Head';
import { Button } from '../components/Button';

// image files
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

// styles and icons import
import { GrGoogle } from 'react-icons/gr'
import { FiLogIn } from 'react-icons/fi'
import '../styles/auth.scss'

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom(){
    if (!user) {
      await signInWithGoogle()
    }
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === ''){
      return;
    }
    
    const toastId = toast.loading('Procurando sala...');

    const roomRef = await database().ref(`/rooms/${roomCode}`).get();
    
    

    if (!roomRef.exists()){
      toast.error('Sala não encontrada', {
        id: toastId,
      })
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error('Sala fechada', {
        id: toastId,
      })
      return;
    }

    
    history.push(`/rooms/${roomCode}`);
    toast.success('Sala encontrada', {
      id: toastId,
    });
  }


  return(
    <div id="page-auth">
      <Head />
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Trie as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <GrGoogle className="global-icon2 size-30" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              maxLength={32}
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              <FiLogIn className="global-icon2 size-28" color={'white'} /> 
              Entrar na sala
            </Button>
            { user && 
              <>
                <div className="line" />
                <p>
                  <Link to="/user">Clique aqui</Link> para ver salas criadas por você
                </p>
              </>
            }
          </form>
        </div>
      </main>
    </div>
  )
}