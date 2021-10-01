import ReactTooltip from "react-tooltip";

import './styles.scss'

type TooltipProps = {
  message?: string;
  message2?: string;
  idTooltip: string;
}

export function Tooltip({message, message2, idTooltip}:TooltipProps) {
  return(
    <ReactTooltip
      id={idTooltip}
      place="bottom"
      effect="solid"
      delayShow={1000}
      arrowColor="transparent"
      backgroundColor="var(--tooltip-bg-color)"
      textColor="var(--text-color-white)"
      className='tooltip'
      getContent={() =>
        <>
          {message}
          <br />
          {message2}
        </>
      }
    />
  )
}