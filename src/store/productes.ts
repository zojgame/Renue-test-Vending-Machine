import { makeAutoObservable } from 'mobx';
import { ProductType } from '../components/vendingMachine/components/Product/types';
import { products } from '../mock/products';

class Products {
    changeAmountToProduct : number = 0;

    products : ProductType[] = products;


    constructor(){
        makeAutoObservable(this);
    }

    setChangeAmountToProduct(money : number){
        this.changeAmountToProduct = money;
    }

    decreaseProductCount(product : ProductType){
        const currentProduct = this.products.filter((p) => p.id === product.id)[0].count - 1;
        // const currentId = products.indexOf(currentProduct);
        // this.products = [...this.products.slice(currentId),
        //     currentProduct,
        //     ...this.products.slice(currentId + 1, this.products.length)];
    }

    

   
}

export const productes = new Products();
