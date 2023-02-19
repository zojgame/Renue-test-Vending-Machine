import { makeAutoObservable } from 'mobx';
import { ProductType } from '../components/vendingMachine/components/Product/types';
import { products } from '../mock/products';

class Products {
    moneyToConvert : number = 0;

    products : ProductType[] = [];

    constructor(products : ProductType[]){
        makeAutoObservable(this);
        this.products = products;
    }

    setMoneyToConvert(money : number){
        this.moneyToConvert = money;
    }

    decreaseProductCount(product : ProductType){
        const currentProduct = this.products.filter((p) => p.id === product.id)[0];
        const updatedProduct = { ...currentProduct, count: currentProduct.count - 1};
        const updatedProducts = this.products.map(product => product.id === currentProduct.id ? updatedProduct : product);
        this.products = updatedProducts;
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

export const productItems = new Products(products);
