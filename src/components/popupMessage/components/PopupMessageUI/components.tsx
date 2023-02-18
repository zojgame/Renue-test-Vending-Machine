import './styles.css';

type PopupMessageProps = {
    message : string
}

export const PopupMessage = ({message} : PopupMessageProps) => {
   return (
       <div className='popup-message'>
            {message + 'сообщение'}
       </div>
   );
};