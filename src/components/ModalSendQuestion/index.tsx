import { ReactElement, ReactNode, useState } from 'react';
import { Popup } from 'reactjs-popup';

import { Button } from '../Button';

import './styles.scss'

type ModalProps = {
  modalIcon: ReactElement;
  children: ReactNode;
  content: string;
  //  pass the function and the props that is inside of it is
  //   required to not evoke the function
  modalSendAnswerFunction: (questionId: string, answer: string) => Promise<void>;
  questionId: string;
}

export function ModalSendQuestion({
  modalIcon,
  questionId,
  content,
  modalSendAnswerFunction,
  children,
}: ModalProps) {

  const modalButton = (
    <div>
      {children}
    </div>
  )

  const [answer, setAnswer] = useState('');
  
  return (

    <Popup modal trigger={modalButton}
      className='question-modal modal-send-question'
    >
      {(close: () => void) => (
        <div>
          <span className="modal-action-icon" style={{color: 'var(--yellow)'}}>
            {modalIcon}
          </span>
          <div className="modal-text">
            <h2>Responder pergunta</h2>
          </div>
          <p><span className="emphasis">Pergunta/Question:</span> {content}</p>
          <p className="emphasis">Resposta/Answer:</p>
          <textarea
            onChange={event => setAnswer(event.target.value)}
            value={answer}
            maxLength={320}
          />

          <div className="buttons">
            <Button isGray onClick={() => {close()}}>
              Cancelar
            </Button>

            {questionId && (
              <Button
                onClick={() => modalSendAnswerFunction(questionId, answer)}
                style={{color: 'var(--black)', backgroundColor: 'var(--yellow)'}}
              >
                Responder pergunta
              </Button>
            )}
          </div>
        </div>
      )}
    </Popup>
  );
}