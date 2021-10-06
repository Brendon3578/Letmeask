import { ReactElement, ReactNode } from 'react';
import { Popup } from 'reactjs-popup';

import { Button } from '../Button';

import './styles.scss'

type ModalProps = {
  modalTitle: string;
  modalMessage: string;
  modalColor?: string;
  modalSecondColor?: string;
  modalIcon: ReactElement;
  modalImage?: string;
  children: ReactNode;
  //  pass the function and the props that is inside of it is
  //   required to not evoke the function
  modalActionFunction: (questionId: string) => Promise<void>;
  questionId?: string;
  roomId?: string;
}

export function Modal({
  modalTitle, modalMessage,
  modalColor = 'var(--base-color)',
  modalSecondColor = 'var(--text-color-white)',
  modalIcon,
  modalImage,
  questionId,
  roomId,
  modalActionFunction,
  children,
}: ModalProps) {

  const modalButton = (
    <div>
      {children}
    </div>
  )
  
  return (

    <Popup modal trigger={modalButton}
      className='question-modal'
    >
      {(close: () => void) => (
        <div>
          <span className="modal-action-icon" style={{color: modalColor}}>
            {modalIcon}
          </span>
          <div className="modal-text">
            <h2>{modalTitle}</h2>
            <p>Tem certeza que você deseja {modalMessage}?</p>
          </div>
        
          {modalImage && (
            <div className="modal-actions-example">
              <p>A pergunta ficará assim:</p>
              <img src={modalImage} alt={`Ilustração de ${modalTitle}`} />
            </div>
          )}

          <div className="buttons">
            <Button isGray onClick={() => {close()}}>
              Cancelar
            </Button>

            {questionId && (
              <Button
                onClick={() => modalActionFunction(questionId)}
                style={{color: modalSecondColor, backgroundColor: modalColor}}
              >
                Sim, {modalTitle.toLowerCase()}
              </Button>
            )}

            {roomId && (
              <Button
                onClick={() => modalActionFunction(roomId)}
                style={{color: modalSecondColor, backgroundColor: modalColor}}
              >
                Sim, {modalTitle.toLowerCase()}
              </Button>
            )}
          </div>
        </div>
      )}
    </Popup>
  );
}