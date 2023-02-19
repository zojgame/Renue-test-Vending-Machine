import { BanknoteType } from "../../../../clientInventory";

export function ConvertBanknoteToMessage(banknotes : BanknoteType[]){
    const result = banknotes.reduce((prevValue, currValue) => {
        return prevValue + `${currValue.count} - ${currValue.value}₽ `
    }, '');

    return result;
}