import { makeAutoObservable } from 'mobx';
import { ProductType } from '../components/vendingMachine/components/Product/types';
import { products } from '../mock/products';

class Products {
    moneyToConvert : number = 0;

    products : ProductType[] = products;

    constructor(){
        makeAutoObservable(this);
    }

    setMoneyToConvert(money : number){
        this.moneyToConvert = money;
    }

    decreaseProductCount(product : ProductType){
        // let productToUpdate = this.products.find((p) => p.id === product.id) as ProductType;
        // // updatedProduct = {...updatedProduct, updatedProduct}
        // // const updatedCount =  productToUpdate.count - 1;
        // const updatedProduct : ProductType = { ...product, count: 1 }
        // productToUpdate = updatedProduct;
        const currentProduct = this.products.filter((p) => p.id === product.id)[0];
        const currentProductId = this.products.indexOf(currentProduct);

        const updatedProduct : ProductType = {...currentProduct, count: 1};
        this.products = [...this.products.slice(0, currentProductId), 
            updatedProduct, ...this.products.slice(currentProductId + 1, this.products.length)];
    }

    giveChangeInProducts(productsToChange : Map<string, number>){
        const prevProducts = this.products;
        prevProducts.forEach((product) => {
            const currentProductCount = productsToChange.get(product.title) ?? 0;
            product.count - currentProductCount;
            // return { ...product, count: product.count - currentProduct}
        })
        // .sort((prev, curr) => curr.price - prev.price);

        // this.products = newProducts;
    }
}

export const productItems = new Products();
