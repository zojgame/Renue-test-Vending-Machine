import { ProductType } from "./types";
import { useState } from "react";
import './styles.css';
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
       <div className='product-item' onClick={onClickHandler} onMouseEnter={mouseHandler} onMouseLeave ={mouseHandler}>
            {isDescriptionVisible && <ProductPriceComponent price={product.price}/>}
            <p>{product.title}</p>
            <div className={`product-count-container ${product.count === 0 && 'product-empty'}`}>{product.count}</div>
            <img src={product.image} alt={product.title} className='product-image'/>
       </div>
    </>
   );
});