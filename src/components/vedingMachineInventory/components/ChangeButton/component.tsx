import './styles.css';
import { depositedBanknotes } from '../../../../store/depositedBanknotes';
import { BanknoteType } from '../../../clientInventory';
import { Banknote } from '../../../../mock/consts';
import { nanoid } from 'nanoid';
import { clientBanknotes } from '../../../../store/clientBanknotes';
import { vendingMachineBanknotes } from '../../../../store/vendingMachineBanknotes';
import { PopupMessage } from '../../../popupMessage';
import { useState } from 'react';


export const ChangeButtonComponent = () => {
const [popupMessage, setPopupMessage] = useState('');
const [isPopupShowing, setIsPopupShowing] = useState(false);

    const handleOnClick = () => {
        const change = depositedBanknotes.giveChange();
        if(change > 0){
            const banknotesToChange = CalculateChange(change);
            clientBanknotes.recieve(banknotesToChange);
            vendingMachineBanknotes.decreaseBanknotes(banknotesToChange);
            setPopupMessage(ConvertBanknoteToString(banknotesToChange))
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

function CalculateChange(money : number) : BanknoteType[]{
    const change : BanknoteType[] = [];
    let currentNominal = 0;
    let moneyToChange = money;
    const banknotesCount = new Map();

    //делим сдачу на количество купюр
    while(moneyToChange !== 0){        
        if(moneyToChange >= 500 
            && vendingMachineBanknotes.fiveHundredCount > (banknotesCount.get(500) ?? 0)){
            currentNominal = 500;
        }
        else if(moneyToChange >= 100 
            && vendingMachineBanknotes.oneHundredCount > (banknotesCount.get(100) ?? 0)){
            currentNominal = 100;
        }
        else if(moneyToChange >= 50 
            && vendingMachineBanknotes.fiftyCount > (banknotesCount.get(50) ?? 0)){
            currentNominal = 50;
        }
        else if(moneyToChange >= 10 
            && vendingMachineBanknotes.tenCount > (banknotesCount.get(10) ?? 0)){
            currentNominal = 10;
        }
        else if(moneyToChange >= 5 
            && vendingMachineBanknotes.fiveCount > (banknotesCount.get(5) ?? 0)){
            currentNominal = 5;
        }
        else if(moneyToChange >= 1 
            && vendingMachineBanknotes.oneCount > (banknotesCount.get(1) ?? 0)){
            currentNominal = 1
        }
        else{
            break;
        }

        const banknoteCount = (banknotesCount.get(currentNominal) ?? 0);
        banknotesCount.set(currentNominal, banknoteCount + 1);
        moneyToChange -= currentNominal;
    } 
    
    //преобразовываем в тим BanknoteType
    banknotesCount.forEach((key, value) => {
        const banknote : BanknoteType = {
            id: nanoid(4),
            value: value,
            count: key, 
            denomination: GetNominal(value)
            
        }
        change.push(banknote);
    });

    return change;
}

function GetNominal(money : number) : Banknote {
    switch(money){
        case 1000:
            return Banknote.OneThousand;
        case 500:
            return Banknote.FiveHundred;
        case 100:
            return Banknote.OneHundred;
        case 50:
            return Banknote.Fifty;
        case 10:
            return Banknote.Ten;
        case 5:
            return Banknote.Five;            
    }

    return Banknote.One;
}

function ConvertBanknoteToString(banknotes : BanknoteType[]){
    const result = ('Вам выдано: \n').concat(banknotes.reduce((prevValue, currValue) => {
        return prevValue + `${currValue.count}₽ - ${currValue.value} `
    }, ''));

    return result;
}
