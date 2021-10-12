import { ReactNode } from 'react';
import cx from 'classnames';

import './styles.scss'

type QuestionProps = {
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  answer?: string;
  isHighlighted?: boolean;

}

export function Question({
  content,
  author,
  answer = undefined,
  isHighlighted = false,
  children
}: QuestionProps) {
  return (
    <div
      className={cx(
        'question',
        { highlighted: isHighlighted },
        { answered: answer }
      )}
    >
      <p><span className='letter-emphasis'>Q:</span>{content}</p>
      {answer &&
        <p className="question-answer"> <span className='letter-emphasis'>A:</span>{answer}</p>
      }
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div className="question-actions">
          {children}
        </div>
      </footer>
    </div>
  );
}