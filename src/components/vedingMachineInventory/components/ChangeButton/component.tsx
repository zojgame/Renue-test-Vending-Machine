import './styles.css';
import { depositedBanknotes } from '../../../../store/depositedBanknotes';
import { BanknoteType } from '../../../clientInventory';
import { Banknote } from '../../../../mock/consts';
import { nanoid } from 'nanoid';
import { clientBanknotes } from '../../../../store/clientBanknotes';
import { vendingMachineBanknotes } from '../../../../store/vendingMachineBanknotes';
import { PopupMessage } from '../../../popupMessage';
import { useState } from 'react';
// import { products } from '../../../../mock/products';
import { productItems } from '../../../../store/products';
import { ProductType } from '../../../vendingMachine/components/Product/types';
import { observer } from 'mobx-react-lite';


export const ChangeButtonComponent = () => {
const [popupMessage, setPopupMessage] = useState('');
const [isPopupShowing, setIsPopupShowing] = useState(false);

    const handleOnClick = () => {
        const change = depositedBanknotes.giveChange();
        if(change > 0){
            // считаем количество сдачи, которую
            // нужно выдать деньгами
            const [moneyToIssue, moneyToProducts] = CalculateChange(change);

            // клиент получает сдачу деньгами
            clientBanknotes.recieve(moneyToIssue);

            // автомат отдаёт сдачу
            vendingMachineBanknotes.decreaseBanknotes(moneyToIssue);

            // выводим сообщение, какое 
            // количество банкнот было выведено
            setPopupMessage(ConvertBanknoteToString(moneyToIssue));            
            
            // если нужно выдать сдачу продуктами, 
            // считаем количество продуктов, которые нужно выдать
            if(moneyToProducts > 0)
            {
                const products = productItems.products;
                const moneyToProduct = ConvertMoneyToProducts(moneyToProducts, products);
                if(moneyToProduct.size === 0){
                    setPopupMessage('Сожалем, но автомат сдачи не выдаёт');
                }
                else{
                    productItems.giveChangeInProducts(moneyToProduct);
                    console.log(moneyToProduct);
                }

                // если продуктов нет, выводим сообщение,
                // автомат сдачи не выдаёт
                
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

function CalculateChange(money : number) : [BanknoteType[], number]{
    const change : BanknoteType[] = [];
    let currentNominal = 0;
    let moneyToChange = money;
    const banknotesCount = new Map();

    //делим сдачу на количество купюр

    //fix
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

        const banknoteCount = banknotesCount.get(currentNominal) ?? 0;
        banknotesCount.set(currentNominal, banknoteCount + 1);
        moneyToChange -= currentNominal;
    } 
    
    //преобразовываем в тим BanknoteType
    banknotesCount.forEach((key, value) => {
        const banknote : BanknoteType = {
            id: nanoid(4),
            value: value,
            count: key, 
            denomination: ConvertToBanknote(value)
            
        }
        change.push(banknote);
    });

    return [change, moneyToChange];
}

function ConvertToBanknote(money : number) : Banknote {
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
        return prevValue + `${currValue.count} - ${currValue.value}₽ `
    }, ''));

    return result;
}

function ConvertMoneyToProducts (money: number, products : ProductType[]) : Map<string, number> {

    //сортируем продукты по возрастанию
    const sortedProducts = products.sort((prev, curr) => curr.price - prev.price);
    let amountMoney = money;

    // создаем объект Map с ключем product.title и значением count
    const productCounts = new Map<string, number>();
    
    // проходимся отсортированным списком
    // и считаем количество предметов, которые
    // нужно выдать для сдачи,
    // если предметов нет, то возвращаем пустой объект Map
    sortedProducts.forEach((product) => {
        let availableCount = product.count;
        if(availableCount > 0){
            while(amountMoney > product.price){
                availableCount --;
                amountMoney -= product.price;
                const changeCount = productCounts.get(product.title) ?? 0;
                productCounts.set(product.title, changeCount + 1);
            }
            // если нужно выдать ещё чуть-чуть сдачи, 
            // то выдаём последний самый дешевый предмет
            if(amountMoney > 0 && sortedProducts[sortedProducts.length - 1] === product){
                const changeCount = productCounts.get(product.title) ?? 0;
                productCounts.set(product.title, changeCount + 1);                
                amountMoney -= product.price;
            }
        }        
    });

    return productCounts;
};
