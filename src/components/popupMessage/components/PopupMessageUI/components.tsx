import './styles.css';
import { useState, useEffect, useLayoutEffect } from 'react';

type PopupMessageProps = {
    message : string
}

export const PopupMessage = ({message} : PopupMessageProps) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const isMessageEmpty = message !== '';
    useEffect(() => {        
        const popupDisappearTimer = setTimeout(() => setIsPopupVisible(() => false), 2000); 
            return () => {                
                clearInterval(popupDisappearTimer);
                setIsPopupVisible(() => true)
            }
    }, [message]);

   return (
    <>
        {isMessageEmpty && isPopupVisible && <div className='popup-message'>
            {message}
       </div>}
    </>
       
   );
};