import './styles.css';
import { depositedBanknotes } from '../../../vendingMachine/store/depositedBanknotes';
import { clientBanknotes } from '../../../clientInventory/store/clientBanknotes';
import { vendingMachineBanknotes } from '../../store/vendingMachineBanknotes';
import { PopupMessage } from '../../../popupMessage';
import { useState } from 'react';
import { productItems } from '../../../vendingMachine/store/products';
import { ConvertMoneyToProducts, ConvertBanknoteToString,
    CalculateChange, ConvertProductToMessage } from './functions';

export const ChangeButtonComponent = () => {
const [popupMessage, setPopupMessage] = useState('');
const [isPopupShowing, setIsPopupShowing] = useState(false);
let message = '';

    const handleOnClick = () => {
        const change = depositedBanknotes.giveChange();
        if(change > 0){
            // считаем количество сдачи, которую
            // нужно выдать деньгами
            const [changeInMoney, changeInProduct] = CalculateChange(change, vendingMachineBanknotes);

            // если нужно выдаём - сдачу купюрами 
            if(changeInMoney.length > 0){
                // клиент получает сдачу деньгами
                clientBanknotes.recieve(changeInMoney);

                // автомат отдаёт сдачу
                vendingMachineBanknotes.decreaseBanknotes(changeInMoney);

                // выводим сообщение, какое 
                // количество банкнот было выведено
                const moneyChangeMessage = ConvertBanknoteToString(changeInMoney);
                message = `Вам выдано: ${moneyChangeMessage}`;
                setPopupMessage(message);
            }       
            
            // если нужно выдать сдачу продуктами, 
            // считаем количество продуктов, которые нужно выдать
            if(changeInProduct > 0){
                const products = productItems.products;
                const moneyToProduct = ConvertMoneyToProducts(changeInProduct, products);

                // если продуктов нет, выводим сообщение,
                // автомат сдачи не выдаёт
                if(moneyToProduct.size === 0){
                    setPopupMessage('Сожалем, но автомат сдачи не выдаёт');
                }
                else{
                    // если есть сообщение о сдаче купюрами, объединяем
                    // с сообщением о сдаче продуктами
                    // иначе выводим просто выводим сообщение о сдачи
                    // продуктами
                    if(message === ''){
                        setPopupMessage(ConvertProductToMessage(moneyToProduct));
                    }
                    else{
                        setPopupMessage(`${message} ${ConvertProductToMessage(moneyToProduct)}`);
                    }

                    productItems.decreaseProductsCounts(moneyToProduct);
                }
            }

            setIsPopupShowing(prev => !prev);
        }
    }
   return (
        <>
            <PopupMessage message={popupMessage} isPopupShowing={isPopupShowing}/>
            <div className="change-button" onClick={handleOnClick}>
                Выдать сдачу
            </div>    
        </>
   );
};


