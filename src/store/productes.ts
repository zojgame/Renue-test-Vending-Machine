import { makeAutoObservable } from 'mobx';

class Productes {
    depositedBanknotes : number = 0;

    constructor(){
        makeAutoObservable(this);
    }

   
}

export const productes = new Productes();
