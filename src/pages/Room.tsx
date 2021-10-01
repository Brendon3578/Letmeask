// react imports
import { useState, FormEvent } from 'react';
import { useParams } from 'react-router';

// services
import { database } from '../services/firebase';

// hooks
import { useAuth } from './../hooks/useAuth';
import { useRoom } from './../hooks/useRoom';
import { useLoading } from './../hooks/useLoading';

// pages
import { PageNotFound } from './PageNotFound';

// components
import { Head } from '../components/Head';
import { Header } from './../components/Header';
import { Button } from '../components/Button';
import { Question } from './../components/Question';
import { Modal } from '../components/Modal';
import { Tooltip } from '../components/Tooltip';
import { pushToast } from './../components/ToastComponent';
import { LoadingCoffee } from '../components/LoadingCoffee';

// image files
import emptyQuestionsImg from '../assets/images/empty-questions.svg'

// styles and icons import
import { FiThumbsUp, FiXCircle } from 'react-icons/fi'
import '../styles/room.scss'

type RoomParams = {
  id: string;
}

export function Room() {
  const { user, signInWithGoogle } = useAuth()

  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title, Admin, roomNotFound } = useRoom(roomId)

  const [newQuestion, setNewQuestion] = useState('');

  const { loading } = useLoading()

  async function handleLogin(){
    if (!user) {
      await signInWithGoogle()
    }
  }

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()
    if (newQuestion.trim() === ''){ return; }

    if (!user){ pushToast('Usuário não logado!', 'error'); return; }
    const question = {
      content: newQuestion,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    };

    await database().ref(`rooms/${roomId}/questions`).push(question)
  
    setNewQuestion('');
  }

  async function handleLikeQuestion(questionId: string, likeId: string | undefined){
    if (!user){ pushToast('Para curtir uma pergunta, faça seu login!', 'info'); return; }

    if (likeId) {
      await database().ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
    } else{      
      await database().ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id
      })
    }
  }

  async function handleUserDeleteQuestion(questionId: string) {
    if (!user){ return; }
    await database().ref(`rooms/${roomId}/questions/${questionId}`).remove()
  }

  return (
    <>
      {roomNotFound ? <PageNotFound alternateMessage='sala' />
      :<div id="page-room">
        <Head Title={`${title.length > 32 ? (title.substring(0, 32) + '...') : title}`} />
        <Header isAdmin={Admin} roomId={roomId} />
        <main>
          {loading ? (
            <LoadingCoffee />
          ) : (
          <>
          <div className="room-title">
            <h1>{title}</h1>
          </div>

          <form onSubmit={handleSendQuestion}>
            <textarea
              placeholder="O que você quer perguntar?"
              onChange={event => setNewQuestion(event.target.value)}
              value={newQuestion}
              minLength={16}
              maxLength={400}
            />
            <div className="form-footer">
              { user ? (
                <div className="user-info">
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </div>
              ) : (
                <span>
                  Para enviar uma pergunta,&nbsp;
                  <button className='link-button' onClick={handleLogin}>faça seu login</button>.
                </span>
              ) }
              <Button type="submit" disabled={!user}>Enviar pergunta</Button>   
            </div>
          </form>

          <div className="question-list">
            {questions.length === 0 &&
              <div className="no-questions">
                <img src={emptyQuestionsImg} alt="Não há nenhuma pergunta" />
                <h2>Nenhuma pergunta por aqui...</h2>
                {user ?
                  <p>Que tal ser a primeira pessoa a fazer uma pergunta?</p>
                : <p>Faça o seu login e seja a primeira pessoa a fazer uma pergunta!</p>
                }
              </div>
            }


            {questions.map(question => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  { !question.isAnswered && (
                    <>
                    {/* question author can delete it questions */}
                    {user?.id === question.author.id &&
                      <Modal modalTitle="Deletar sua pergunta" modalMessage="deletar sua pergunta"
                        modalColor={'var(--red)'} modalIcon={<FiXCircle/>}
                        modalActionFunction={handleUserDeleteQuestion}
                        questionId={question.id}
                      >
                        <button type="button" aria-label="Deletar sua Questão"
                          className="delete-button user-delete-button" 
                        >
                          <FiXCircle className="global-icon" />
                        </button>
                      </Modal>
                      }
                    <div className={`like-button ${question.likeId ? 'liked' : ''}`}>
                      {question.likeCount > 0 && <span>{question.likeCount}</span>}
                      <button type="button"
                        aria-label="Marcar como gostei"
                        onClick={() => handleLikeQuestion(question.id, question.likeId)}
                        data-tip data-for={`curtirTip-id-${question.id}`}
                      >
                        <FiThumbsUp className="global-icon"/>
                      </button>
                      <Tooltip message="Curtir pergunta" idTooltip={`curtirTip-id-${question.id}`}/>
                    </div>
                    </>
                  )}
                </Question>
              )
            })}
          </div>
            </>
          )}
        </main>
      </div>
      }
    </>
  );
}