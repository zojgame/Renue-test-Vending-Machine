import styles from './styles.module.css';
import { useState, useEffect } from 'react';

type PopupMessageProps = {
    message : string,
    isPopupShowing ?: boolean
}

export const PopupMessage = ({ message, isPopupShowing } : PopupMessageProps) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const isMessageEmpty = message !== '';

    useEffect(() => {     
        // сообщение показывается 3 секунды, потом пропадает  
        const popupDisappearTimer = setTimeout(() => setIsPopupVisible(false), 3000); 

            return () => {
                clearTimeout(popupDisappearTimer);
                setIsPopupVisible(true)
            }
    }, [message, isPopupShowing]);

   return (
    <>
        {isMessageEmpty && isPopupVisible && <div className={styles.popupMessage}>
            {message}
       </div>}
    </>
       
   );
};