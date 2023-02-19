import { ProductType } from "./types";
import { useState } from "react";
import styles from './styles.module.css';
import { ProductPriceComponent } from "../ProductPriceUI/component";
import { depositedBanknotes } from "../../store/depositedBanknotes";
import { PopupMessage } from "../../../popupMessage";
import { observer } from "mobx-react-lite";
import { productItems } from "../../store/products";

type ProductProps = {
    product: ProductType
}

export const ProductComponent = observer(({product} : ProductProps):JSX.Element => {
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
    const [messagePopup, setMessagePopup] = useState('');

    //делаем счетчик уже купленных товаров данного типа
    const [purchasedProductsCount, setPurchasedProductsCount] = useState(1);
    const productCount = product.count;

    const onClickHandler = () => {
        if(productCount > 0 && product.price < depositedBanknotes.depositedBanknotes){
            
            //уменьшаем количество продукта на 1
            productItems.decreaseProductCount(product);           
            setPurchasedProductsCount(prev => prev + 1);
            depositedBanknotes.decrease(product.price); 
            setMessagePopup(`вы получили ${purchasedProductsCount} ${product.title}`);        
        }
    }

    //когда мышь наводится на товар -> показываем его цену
    const mouseHandler = () => {
        setIsDescriptionVisible(prev => !prev);
    }

   return (
    <>
        <PopupMessage message={messagePopup}/>
       <div className={styles.productItem} onClick={onClickHandler} onMouseEnter={mouseHandler} onMouseLeave ={mouseHandler}>
            {isDescriptionVisible && <ProductPriceComponent price={product.price}/>}
            <p>{product.title}</p>
            <div className={`${styles.productCountContainer} ${product.count === 0 && `${styles.productEmpty}`}`}>{product.count}</div>
            <img src={product.image} alt={product.title} className={styles.productImage}/>
       </div>
    </>
   );
});