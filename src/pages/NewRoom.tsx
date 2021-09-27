
import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from './../hooks/useAuth';

import '../styles/auth.scss'

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory()

  const [newRoom, setNewRoom] = useState('');


  
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === ''){
      return;
    }

    const roomRef = database().ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    await database().ref(`userRooms/${user?.id}/${firebaseRoom.key}`).set({
      title: newRoom,
    })


    history.push(`/admin/rooms/${firebaseRoom.key}`)
  }

  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Trie as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <div className="new-room-text">
            <h3>Olá <span> {user?.name} </span> </h3>
            <h2>Crie uma nova sala aqui</h2>
          </div>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              minLength={6}
              maxLength={64}
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">

              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
          <div className="line" />
          <p>
            Já possui sala? <Link to="/user"> clique aqui para ver suas salas</Link>
          </p>
        </div>
      </main>
    </div>
  )
}