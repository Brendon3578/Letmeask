import { FiCoffee } from "react-icons/fi";
import { IoChatboxEllipses } from "react-icons/io5";

import './styles.scss'

export function LoadingCoffee () {
  return (
    <div id="loading-animation">
      <div className="coffee-icon">
        <IoChatboxEllipses className="chat" />
        <IoChatboxEllipses className="chat-two" />
        <FiCoffee className="coffee" />
      </div>
      <p>Carregando...</p>
    </div>
  );
}