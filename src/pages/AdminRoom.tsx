// react imports
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';

// services
import { database } from '../services/firebase';

// hooks
import { useAuth } from './../hooks/useAuth';
import { useRoom } from './../hooks/useRoom';
import { useLoading } from '../hooks/useLoading';

// pages
import { PageNotFound } from './PageNotFound';

// components
import { Head } from '../components/Head';
import { Header } from './../components/Header';
import { RoomTitle } from './../components/RoomTitle';
import { Tooltip } from './../components/Tooltip';
import { Modal } from './../components/Modal';
import { Question } from './../components/Question';
import { Footer } from './../components/Footer';
import { LoadingCoffee } from './../components/LoadingCoffee';

// image files
import userNotAdminImg from '../assets/images/user-not-admin.svg'
import emptyQuestionsImg from '../assets/images/empty-questions.svg';
import questionAnsweredExampleImg from '../assets/images/question-answered-example.png';
import questionHighlightExampleImg from '../assets/images/question-highlight-example.png';

// styles and icons import
import { FiStar, FiMessageSquare, FiTrash, FiThumbsUp, FiCornerUpLeft } from 'react-icons/fi';
import '../styles/room.scss'

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const { user } = useAuth()
  
  const history = useHistory()

  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { questions, Admin, roomNotFound, title } = useRoom(roomId)

  const { loading } = useLoading()

  async function handleEndRoom() {
    if (Admin){
      history.push('/');
      await database().ref(`rooms/${roomId}`).remove()
      await database().ref(`userRooms/${user?.id}/${roomId}`).remove()
    }
  }
  
  async function handleDeleteQuestion(questionId: string){
    if (Admin){
      await database().ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string){
    if (Admin){
      await database().ref(`rooms/${roomId}/questions/${questionId}`).update({
        isAnswered: true,
      })
    }
  }

  async function handleHighlightQuestion(questionId: string){
    if (Admin){
      await database().ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: true,
      })
    }
  }

  


  return (
    <>
      {roomNotFound ? <PageNotFound alternateMessage='sala' /> :
      <div id="page-room">
        <Head Title={`${title.length > 32 ? (title.substring(0, 32) + '...') : title}`} />

        <Header isAdmin={Admin} roomId={roomId} endRoomFunction={handleEndRoom} />
        <main>
          {loading ? (
            <LoadingCoffee />
          ) : (
            <>

          {Admin ? (
          <>
          <div className="room-title">
            <RoomTitle roomId={roomId} isAdmin={Admin} userId={user?.id} />
            { questions.length > 0 && <span>{questions.length} pergunta{ questions.length !== 1 && 's'}</span>}
          </div>
          
          <div className="question-list">
            {questions.length === 0 &&
              <div className="no-questions admin-room">
                <img src={emptyQuestionsImg} alt="Não há nenhuma pergunta" />
                <h2>Nenhuma pergunta por aqui...</h2>
                <p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
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
                {!question.isAnswered && (
                  <>
                    {question.likeCount > 0 && 
                      <span className="like-number">
                        {question.likeCount}
                        <FiThumbsUp />
                      </span>
                    }
                    {!question.isHighlighted && (
                      <>

                        <Modal modalTitle="Destacar pergunta" modalMessage="destacar esta pergunta"
                          modalIcon={<FiStar/>}
                          modalActionFunction={handleHighlightQuestion}
                          questionId={question.id}
                          modalImage={questionHighlightExampleImg}
                        >
                          <button
                            type="button"
                            className="highlight-button"
                            data-tip
                            data-for={`highlightTip-id-${question.id}`}
                          >
                            <FiStar className="global-icon" />
                          </button>
                        </Modal>
                        <Tooltip message="Destacar pergunta" idTooltip={`highlightTip-id-${question.id}`} />
                      </>
                    )}

                    <Modal modalTitle="Marcar pergunta como respondida" modalMessage="marcar esta pergunta como respondida"
                      modalColor={"var(--yellow)"}
                      modalSecondColor={"var(--black)"}
                      modalIcon={<FiMessageSquare/>}
                      modalActionFunction={handleCheckQuestionAsAnswered}
                      questionId={question.id}
                      modalImage={questionAnsweredExampleImg}
                    >
                      <button type="button"
                        // remove the on click and set the function on the modal
                        className="answer-button"
                        data-tip data-for={`checkTip-id-${question.id}`}
                      >
                        <FiMessageSquare className="global-icon size-30" />
                      </button>
                    </Modal>
                    <Tooltip message="Marcar pergunta como" message2="Respondida" idTooltip={`checkTip-id-${question.id}`}/>
                  </>
                ) }
                <Modal modalTitle="Deletar pergunta" modalMessage="deletar esta pergunta"
                  modalColor={'var(--red)'} modalIcon={<FiTrash/>}
                  modalActionFunction={handleDeleteQuestion}
                  questionId={question.id}
                >
                  <button type="button"
                    className="delete-button"
                    data-tip data-for={`deleteTip-id-${question.id}`}
                  >
                    <FiTrash className="global-icon" />
                  </button>
                </Modal>
                <Tooltip message="Deletar pergunta" idTooltip={`deleteTip-id-${question.id}`} />
              </Question>
            )
          })}
          </div>
          </>
          ) : (
            // if user not admin
            <div className="user-not-admin-info">
              <h2>Você não é <span> admnistrador </span> dessa página!</h2>
              <img src={userNotAdminImg} alt="Você não é admnistrador dessa página" />
              <Link to={`/rooms/${roomId}`} className="button outlined" title="Página de Usuário">
                <FiCornerUpLeft className="global-icon no-pseudo-class" color="var(--base-color)" />
                Voltar para a página de Usuário
              </Link>
            </div>
          )
        }

            </>
          )}

        </main>
        <Footer />
      </div>
      }
    </>
  );
}