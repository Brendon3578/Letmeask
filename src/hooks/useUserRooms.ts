import { useEffect, useState } from 'react';

import { database } from '../services/firebase';

type FirebaseRooms = Record<string, {
  title: string;
}>
type RoomsType = {
  roomId: string;
  title: string;
}

export function useUserRooms(userId: string | undefined) {

  const [rooms, setRooms] = useState<RoomsType[]>([]);

  
  useEffect(() => {
    const userRoomsRef = database().ref(`userRooms/${userId}`)
    
    userRoomsRef.on('value', rooms => {
      const databaseRoomList = rooms.val();

      const firebaseRoomList: FirebaseRooms = databaseRoomList ?? {};

      const parsedRoomList = Object.entries(firebaseRoomList).map (([key, value]) => {
        return {
          roomId: key,
          title: value.title,
        }
      })
      setRooms(parsedRoomList)
    })

    return () => {
      userRoomsRef.off('value');
    }

  }, [userId])

  return { rooms }
}