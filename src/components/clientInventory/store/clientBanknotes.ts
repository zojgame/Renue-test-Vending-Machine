import { makeAutoObservable } from 'mobx';
import { BanknoteType } from '..';
import { Banknote } from '../../../mock/consts';

class ClientBanknotes {
    oneThousandCount : number = Math.floor(Math.random() * 20);
    fiveHundredCount : number = Math.floor(Math.random() * 20);
    oneHundredCount : number = Math.floor(Math.random() * 20);
    fiftyCount : number = Math.floor(Math.random() * 20);
    tenCount : number = Math.floor(Math.random() * 20);
    fiveCount : number = Math.floor(Math.random() * 20);
    oneCount : number = Math.floor(Math.random() * 20);

    constructor(){
        makeAutoObservable(this);
    }

    recieve(banknotes : BanknoteType[]){
        banknotes.forEach((banknote) => {
            switch(banknote.denomination){
                case Banknote.OneThousand:
                    this.oneThousandCount = this.oneThousandCount + banknote.count
                    break;
                case Banknote.FiveHundred:
                    this.fiveHundredCount = this.fiveHundredCount + banknote.count
                    break;
                case Banknote.OneHundred:
                    this.oneHundredCount = this.oneHundredCount + banknote.count
                    break;
                case Banknote.Fifty :
                    this.fiftyCount = this.fiftyCount + banknote.count
                    break;
                case Banknote.Ten:
                    this.tenCount = this.tenCount + banknote.count
                    break;
                case Banknote.Five:
                    this.fiveCount = this.fiveCount + banknote.count
                    break;
                case Banknote.One:
                    this.oneCount = this.oneCount + banknote.count
                    break;                
            }
        })
    }

    decrease(banknote : BanknoteType){
        switch(banknote.denomination){
            case Banknote.OneThousand:
                this.oneThousandCount--
                break;
            case Banknote.FiveHundred:
                this.fiveHundredCount--
                break;
            case Banknote.OneHundred:
                this.oneHundredCount--
                break;
            case Banknote.Fifty :
                this.fiftyCount--
                break;
            case Banknote.Ten:
                this.tenCount--
                break;
            case Banknote.Five:
                this.fiveCount--
                break;
            case Banknote.One:
                this.oneCount--
                break;                
        }

    }

    getCurrentBanknote(banknote : BanknoteType) : number{
        switch(banknote.denomination){
            case Banknote.OneThousand:
                return this.oneThousandCount;
            case Banknote.FiveHundred:
                return this.fiveHundredCount;
            case Banknote.OneHundred:
                return this.oneHundredCount;
            case Banknote.Fifty :
                return this.fiftyCount;
            case Banknote.Ten:
                return this.tenCount;
            case Banknote.Five:
                return this.fiveCount;
            case Banknote.One:
                return this.oneCount;               
        }
        return 0;
    }

}

export const clientBanknotes = new ClientBanknotes();
