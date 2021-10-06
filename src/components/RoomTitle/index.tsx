// services
import { database } from '../../services/firebase';

// hooks
import { useDebouncedCallback } from 'use-debounce';
import { useRoom } from './../../hooks/useRoom';

// styles and icons import
import { FiEdit } from 'react-icons/fi';
import './styles.scss'

type RoomTitleProps = {
  roomId: string;
  isAdmin: boolean;
  userId?: string;
}

export function RoomTitle({ roomId, isAdmin, userId }: RoomTitleProps) {
  const { title, setTitle } = useRoom(roomId)

  async function saveTitleRoom(newTitle: string) {
    await database().ref(`rooms/${roomId}`).update({
      title: newTitle,
    })

    // update in user rooms too
    await database().ref(`userRooms/${userId}/${roomId}`).update({
      title: newTitle
    })
  }

  // debounce to change title
  const debouncedChangeTitle = useDebouncedCallback(
    function handleChangeTitle () {
      if (!isAdmin){
        return;
      }
      if (title.length < 4){
        setTitle('☕ Minha Sala')
        saveTitleRoom('☕ Minha Sala')
      } else{
        saveTitleRoom(title)
      }
      
    }, 3000
  )


  return(
    <div className="title">
      { !isAdmin ?
      <h1>{title}</h1>
      : <h1>
          <FiEdit className="global-icon" />
          <input type="text"
            className="editable"
            value={title}
            maxLength={64}
            onChange={event => setTitle(event.target.value)}
            onBlur={debouncedChangeTitle}
            style={{
              width: `${(title.length + 2) + 'ch'}`
            }}
            disabled={!isAdmin}
          />
        </h1>
      }
    </div>
  );
}