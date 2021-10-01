// react imports
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

// hooks
import { useAuth } from './../../hooks/useAuth';

// components
import { MenuHeader } from '../MenuHeader';
import { SettingsMenu } from '../ProfileMenu';
import { RoomCode } from './../RoomCode';
import { Modal } from './../Modal';
import { Button } from './../Button';

// image files
import logoImg from '../../assets/images/logo.svg';

// styles and icons import
import { FiXCircle } from 'react-icons/fi';
import './styles.scss'

type HeaderProps = {
  roomId?: string;
  isAdmin?: boolean;
  children?: ReactNode;
  endRoomFunction?: () => Promise<void>;
}

export function Header ({roomId, isAdmin , children, endRoomFunction}: HeaderProps) {
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

          {(isAdmin && endRoomFunction) &&
            <MenuHeader>
              <Modal modalTitle="Encerrar sala" modalMessage="encerrar esta sala"
                modalColor={'var(--red)'}
                modalIcon={<FiXCircle/>}
                roomId={roomId}
                modalActionFunction={endRoomFunction}
              >
                <Button
                  isOutlined
                >
                  Encerrar sala
                </Button>
              </Modal>
            </MenuHeader>
          }

          { user && 
            <SettingsMenu userAvatarUrl={user?.avatar}
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