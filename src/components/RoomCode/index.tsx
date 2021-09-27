import { useState } from 'react';

import { FiCopy } from 'react-icons/fi'
import { pushToast } from '../ToastComponent';

import './styles.scss';

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  const [animation, setAnimation] = useState(0)

  function copyRoomCodeToClipboard() {
    if (window.innerWidth > 720){
      setAnimation(1)
    } else{
      pushToast('Código da sala copiado', 'success')
    }
    // if have error, try to open http://localhost:3000 intead of http://ip...
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button
      className={`room-code ${animation ? 'animation' : ''}`}
      onClick={copyRoomCodeToClipboard}
      onAnimationEnd={() => setAnimation(0)}
    >
      <div>
        <FiCopy className="global-icon size-28" />
      </div>
      <span>Copiar código da sala</span>
    </button>
  )
}