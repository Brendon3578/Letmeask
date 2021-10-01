// react imports
import { Link } from 'react-router-dom';

// services
import { database } from '../services/firebase';

// hooks
import { useAuth } from './../hooks/useAuth';
import { useUserRooms } from './../hooks/useUserRooms';
import { useLoading } from '../hooks/useLoading';

// components
import { Head } from '../components/Head';
import { Header } from './../components/Header';
import { Button } from './../components/Button';
import { Modal } from './../components/Modal';
import { pushToast } from './../components/ToastComponent';
import { Footer } from '../components/Footer';
import { LoadingCoffee } from './../components/LoadingCoffee';

// image files
import emptyRoomsImg from '../assets/images/empty-rooms-white.svg'

// styles and icons import
import { FiExternalLink, FiLink, FiPlusCircle, FiXCircle } from 'react-icons/fi';
import '../styles/user-page.scss'

export function UserPage () {
  const { user } = useAuth()

  const { rooms } = useUserRooms(user?.id)

  const { loading } = useLoading()

  return (
    <div id="user-page">
      <Header>
        <Head Title="Usuário"/>

        <Link to="/rooms/new" className="button" title="Criar uma nova sala">
          <FiPlusCircle className="global-icon no-pseudo-class" color={'white'} />
          <span>
            Criar uma nova sala
          </span>
        </Link>
      </Header>

      <main>
        {loading ? (
          <LoadingCoffee />
        ) : (
          <>
          <div className="user-info">
            <img src={ user?.avatar} alt={user?.name} />
              <div>
              <h1>Olá, <span>{user?.name}</span></h1>
              <p>{user?.email}</p>
            </div>
          </div>

          <h1>Veja as salas criadas por você:</h1>
          <ul className="room-list">
            {rooms.length ===  0 && 
              <div className="empty-rooms">
                <img src={emptyRoomsImg} alt="Não há nenhuma sala criada por você" />
                <div className="text">
                  <h2>Você não criou nenhuma <span>sala</span> ainda...</h2>
                  <p>Que tal criar a sua primeira sala e começar a responder perguntas?</p>
                </div>
              </div>
            }
            {rooms.map(room => {
              return (
                <li key={room.roomId} className="room-item">
                  <div className="title">
                    <Button
                      className="button button-copy"
                      onClick={() => {
                        navigator.clipboard.writeText(room.roomId)
                        pushToast('Código da sala copiado','success')
                      }}
                    >
                      <FiLink className="global-icon" />
                    </Button>
                    <h3>
                      {room.title}
                    </h3>
                  </div>

                  <div className="actions">
                    <Link to={`/admin/rooms/${room.roomId}`}
                      className="button outlined"
                      title="Direcionar para a sala selecionada"
                    >
                      <span>
                        Acessar sala
                      </span>
                      <FiExternalLink className="global-icon no-pseudo-class" color='var(--base-color)' />
                    </Link>
                
                    <Modal
                      modalTitle="Encerrar sala" modalMessage={`encerrar a sala "${room.title}"`}
                      modalColor='var(--red)'
                      modalIcon={<FiXCircle/>}
                      roomId={room.roomId}
                      modalActionFunction={async () => {
                        await database().ref(`userRooms/${user?.id}/${room.roomId}`).remove()
                        await database().ref(`rooms/${room.roomId}`).remove()
                      }}
                    >
                      <Button
                        style={{background:"var(--red)"}}
                      >
                        <span>
                          Encerrar sala
                        </span>
                        <FiXCircle className="global-icon no-pseudo-class" color='var(--white)' />
                      </Button>
                    </Modal>
                  </div>
                </li>
              )
          })}
        </ul>

          </>
        )}
      </main>
      <Footer/>
    </div>
  );
}