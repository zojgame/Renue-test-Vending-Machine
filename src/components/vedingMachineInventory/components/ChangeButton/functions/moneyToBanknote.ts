import { Banknote } from "../../../../../mock/consts";

export function MoneyToBanknote(money : number) : Banknote {
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