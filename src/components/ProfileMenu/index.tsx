// react imports
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Popup from 'reactjs-popup'

// hooks
import { useAuth } from '../../hooks/useAuth'

// components
import { pushToast } from '../ToastComponent';
import { Button } from '../Button';

// styles and icons import
import { FiLogOut } from 'react-icons/fi'
import './styles.scss'

type settingsProps = {
  userAvatarUrl?: string;
  userName?: string;
  userEmail?: string;
  userIsAdmin?: boolean;
}


export function SettingsMenu({
  userAvatarUrl,
  userEmail,
  userName,
  userIsAdmin
}: settingsProps) {
  
  const { signOut } = useAuth()
  const history = useHistory()

  const params = useParams<{id: string}>();
  const roomId = params.id;

  async function handleSignOut() {
    signOut()
    pushToast('Conta deslogada com sucesso', 'success')
    history.push(`/rooms/${roomId}`)
  }

  // verify if url is on admin route or normal route
  const urlIsOnAdminRoute = window.location.pathname.includes('/admin');

  const Modal = () => (
    <Popup
      trigger={ (open) =>
        <button className={`userButton ${open? 'open' : ''}`}
          data-tip data-for="userTip"
        >
          <img src={userAvatarUrl} alt={userName} />
        </button>
      }
      
      modal
      className='user-modal'
    >

      <div className="settings-modal">
        <header>
          <img src={userAvatarUrl} alt={userName} />
          <p>{userName}</p>
          <p>{userEmail}</p>
          <Link to="/user" className="link-button" title="Pagina de usuário">
            Veja salas criadas por você
          </Link>
        </header>
        <main>
          <hr />
          <p className="user-role">Cargo da sala:
            <span>{userIsAdmin ? 'Admnistrador 👔' : 'Usuário 🎈'}</span>
          </p>
          <hr />
          <p className="user-action"> <span> Nessa sala você pode:</span>
            {userIsAdmin ? ' Deletar, Destacar e Marcar perguntas como respondidas, Deletar a sala.'
            : ' Enviar perguntas e curtir perguntas de outros usuários.'}
            {userIsAdmin &&
              <Link
                to={`${urlIsOnAdminRoute? `/rooms/${roomId}` : `/admin/rooms/${roomId}`}`}
                className="link-button"
                title={`Voltar para a página de ${!urlIsOnAdminRoute ? 'Admnistrador' : 'Usuário'}`}
              >
                voltar para a página de {!urlIsOnAdminRoute ? 'Admnistrador' : 'Usuário'}
              </Link>
            }
          </p>
        </main>
        <hr />
        <footer>
          <Button isOutlined onClick={handleSignOut} >Deslogar <FiLogOut /> </Button>
        </footer>
      </div>
    </Popup>
  );

  const UserTooltip = () => (
    <ReactTooltip
      id="userTip" place="bottom" effect="solid" delayShow={1000}
      className="user-tooltip"
      arrowColor="transparent" backgroundColor="var(--tooltip-bg-color)" textColor="var(--text-color-white)"
      getContent={() =>
        <div>
          <p>Conta do Google</p>
          <div className="separator"/>
          <p>{userName}</p>
          <p>{userEmail}</p>
          <div className="separator"/>
          <p className="user-role">{userIsAdmin ? 'Admnistrador' : 'Usuário'}</p>
        </div>
      }
    />
  )

  return (
    <div className="settings-menu">
      <Modal />
      <UserTooltip />
    </div>
  )
}