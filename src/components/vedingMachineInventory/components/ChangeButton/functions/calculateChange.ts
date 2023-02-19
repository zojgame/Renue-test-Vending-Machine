import { BanknoteType } from "../../../../clientInventory";
import { VendingMachineBanknotes } from "../../../store/vendingMachineBanknotes";
import { MoneyToBanknote } from "./moneyToBanknote";
import { nanoid } from 'nanoid';

export function CalculateChange(money : number, vendingMachineBanknotes : VendingMachineBanknotes) : [BanknoteType[], number]{
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
            denomination: MoneyToBanknote(value)
            
        }
        
        change.push(banknote);
    });

    return [change, moneyToChange];
}