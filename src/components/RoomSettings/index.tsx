// react imports
import { Popup } from 'reactjs-popup';
import Switch from "react-switch";
import { useHistory } from 'react-router';

// services
import { database } from '../../services/firebase';

// hooks
import { useAuth } from './../../hooks/useAuth';
import { useEffect } from 'react';
import { useRoom } from '../../hooks/useRoom';
import { useDebouncedCallback } from 'use-debounce';

// components
import { Button } from './../Button/index';
import { Modal } from '../Modal';

// styles and icons import
import { FiSettings } from 'react-icons/fi';
import { FiXCircle } from 'react-icons/fi';
import './styles.scss'

type RoomSettingsProps = {
  roomId: string;
}


export function RoomSettings({roomId}:RoomSettingsProps)  {

  const { user } = useAuth()

  const { Admin ,settings, setSettings } = useRoom(roomId)
  const history = useHistory()
  
  async function handleEndRoom() {
    if (Admin){
      history.push('/');
      await database().ref(`rooms/${roomId}`).remove()
      await database().ref(`userRooms/${user?.id}/${roomId}`).remove()
    }
  }

  // debounce function to save settings on firebase
  const debouncedSaveSettings = useDebouncedCallback(
    async () => {
      await database().ref(`rooms/${roomId}/settings`).update({...settings})
    }, 1000
  );

  // use effect para toda vez que o estado settings mudar
  useEffect(() => {
    debouncedSaveSettings()
  }, [debouncedSaveSettings, settings])


  const settingsModalButton = (
    <button className="button settings-button">
      <FiSettings className="global-icon no-pseudo-class size-28" />
    </button>
  )

  return(
    <Popup modal trigger={settingsModalButton}
      className='settings-modal'
      // nested é importante para ter dois modais
      nested
    >
      <div className="room-settings">
        <h2>Configurações da sala</h2>
        <div className="settings">
          <label className="setting">
            <Switch
              checked={settings.canSendQuestion}
              onBlurCapture={debouncedSaveSettings}
              onChange={(event) => setSettings({...settings, canSendQuestion: event})}
              onColor='#835afd' activeBoxShadow='0 0 2px 3px #835afd' offColor='#737380'
            />
            <span>Permitir envio de questões</span>
          </label>
        </div>
        <Modal modalTitle="Encerrar sala" modalMessage="encerrar esta sala"
          modalColor={'var(--red)'}
          modalIcon={<FiXCircle/>}
          roomId={roomId}
          modalActionFunction={handleEndRoom}
        >
          <Button className='button outlined end-room-button'
            isOutlined
          >
            Encerrar sala
          </Button>
        </Modal>
      </div>
    </Popup>
  );
}