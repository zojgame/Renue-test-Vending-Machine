import { makeAutoObservable } from 'mobx';
import { ProductType } from '../components/Product/types';
import { products } from '../../../mock/products';

class Products {
    moneyToConvert : number = 0;
    products : ProductType[] = [];

    constructor(products : ProductType[]){
        makeAutoObservable(this);
        this.products = products;
    }

    // устанавливаем значение для конвертации
    setMoneyToConvert(money : number){
        this.moneyToConvert = money;
    }

    // уменьшение количество товара на 1
    decreaseProductCount(product : ProductType){
        const currentProduct = this.products.filter((p) => p.id === product.id)[0];
        const updatedProduct = { ...currentProduct, count: currentProduct.count - 1};
        const updatedProducts = this.products.map(product => 
            product.id === currentProduct.id 
                ? updatedProduct 
                : product);

        this.products = updatedProducts;
    }

    // уменьшение количества товаров
    decreaseProductsCounts(productsToChange : Map<string, number>){
        let updatedProductCounts = this.products;
        
        productsToChange.forEach((count, title) => {
            const currentProduct = this.products.filter((p) => p.title === title)[0];
            const updatedProduct = { ...currentProduct, count: currentProduct.count - count};
            updatedProductCounts = updatedProductCounts.map(product => 
                product.id === currentProduct.id 
                    ? updatedProduct 
                    : product);
        })

        this.products = updatedProductCounts;
    }
}

export const productItems = new Products(products);
