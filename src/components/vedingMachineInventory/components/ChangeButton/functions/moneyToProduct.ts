import { ProductType } from "../../../../vendingMachine/components/Product/types";

export function ConvertMoneyToProducts (money: number, products : ProductType[]) : Map<string, number> {

    //сортируем продукты по возрастанию
    const sortedProducts = products.sort((prev, curr) => curr.price - prev.price);
    let amountMoney = money;

    // создаем объект Map с ключем product.title и значением count
    const productCounts = new Map<string, number>();
    
    // проходимся отсортированным списком
    // и считаем количество предметов, которые
    // нужно выдать для сдачи,
    // если предметов нет, то возвращаем пустой объект Map
    sortedProducts.forEach((product) => {
        let availableCount = product.count;
        if(availableCount > 0){
            while(amountMoney > product.price){
                availableCount --;
                amountMoney -= product.price;
                const changeCount = productCounts.get(product.title) ?? 0;
                productCounts.set(product.title, changeCount + 1);
            }
            // если нужно выдать ещё чуть-чуть сдачи, 
            // то выдаём последний самый дешевый предмет
            if(amountMoney > 0 && sortedProducts[sortedProducts.length - 1] === product){
                const changeCount = productCounts.get(product.title) ?? 0;
                productCounts.set(product.title, changeCount + 1);                
                amountMoney -= product.price;
            }
        }        
    });

    return productCounts;
};