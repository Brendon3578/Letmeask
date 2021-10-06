// react imports
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

// hooks
import { useAuth } from './../../hooks/useAuth';

// components
// import { MenuHeader } from '../MenuHeader';
import { ProfileMenu } from '../ProfileMenu';
import { RoomCode } from './../RoomCode';
import { RoomSettings } from './../RoomSettings';

// image files
import logoImg from '../../assets/images/logo.svg';

// styles and icons import
import './styles.scss'

type HeaderProps = {
  roomId?: string;
  isAdmin?: boolean;
  children?: ReactNode;
}

export function Header ({roomId, isAdmin , children,}: HeaderProps) {
  const { user } = useAuth()

  return (
    <header className="header">
      <div className="content">
        <Link to='/'>
          <img src={logoImg} alt="Letmeask" />
        </Link>

        { roomId ? (
          <div>
          <RoomCode code={roomId} />

          {(isAdmin) &&
          // Menu de Configurações da Sala
            <RoomSettings roomId={roomId} />
          }

          { user &&
          // Menu de Usuário
            <ProfileMenu userAvatarUrl={user?.avatar}
              userName={user?.name} 
              userEmail={user?.email}
              userIsAdmin={isAdmin}
            />
          }
        </div>

        ) : (
          // if no has room id on header props
          <div>
            {children}
          </div>
        )}
      </div>
    </header>
  );
}