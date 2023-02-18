import { makeAutoObservable } from 'mobx';

class DepositedBanknotes {
    depositedBanknotes : number = 0;

    constructor(){
        makeAutoObservable(this);
    }

    giveChange(){
        const returnableChange = this.depositedBanknotes;
        this.depositedBanknotes = 0;

        return returnableChange;        
    }

    increase(money: number){
        this.depositedBanknotes = this.depositedBanknotes + money;
    }

    decrease(money : number){
        this.depositedBanknotes = this.depositedBanknotes - money;
    }
}

export const depositedBanknotes = new DepositedBanknotes();
