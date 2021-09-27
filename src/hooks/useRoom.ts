import { useState, useEffect } from 'react';

import { database } from '../services/firebase';

import { useAuth } from './useAuth';

type FirebaseQuestions = Record<string, {
  author: {
    id: string;
    name: string;
    avatar: string;
  },
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>;
}>

type QuestionType = {
  id: string;
  author: {
    id: string,
    name: string;
    avatar: string;
  },
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export function useRoom(roomId: string) {

  const { user } = useAuth();

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  // verify if room not found
  const [roomNotFound, setRoomNotFound] = useState(false);

  const [Admin, setAdmin] = useState(false);

  useEffect(() => {
    const roomRef = database().ref(`rooms/${roomId}`);


    // verify if User is Admin
    roomRef.child('authorId').get().then(admin => {
      if (admin.val() === user?.id){
        setAdmin(true)
      }
    })


    roomRef.on('value', room => {
      const databaseRoom = room.val();
      
      if (databaseRoom == null){
        setRoomNotFound(true)
        return null
      } else{
        const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
  
        const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
          return {
            id: key,
            author: value.author,
            content: value.content,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {})
              .find(([key, like]) => like.authorId === user?.id)?.[0],
          }
        })
        setTitle(databaseRoom.title);
        setQuestions(parsedQuestions);
      }
      
    })

    return () => {
      roomRef.off('value');
    }

  }, [ roomId, user?.id ]);


  return { questions, setTitle, title, Admin, roomNotFound }
}