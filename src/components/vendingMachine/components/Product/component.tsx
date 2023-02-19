import { ProductType } from "./types";
import { useState } from "react";
import './styles.css';
import { ProductPriceComponent } from "../ProductPriceUI/component";
import { depositedBanknotes } from "../../../../store/depositedBanknotes";
import { PopupMessage } from "../../../popupMessage";
import { observer } from "mobx-react-lite";
import { productItems } from "../../../../store/products";

type ProductProps = {
    product: ProductType
}

export const ProductComponent = observer(({product} : ProductProps):JSX.Element => {
    const [productCount, setProductCount] = useState(product.count);
    // const productCount = product.count;
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
    const [messagePopup, setMessagePopup] = useState('');
    const [purchasedProductsCount, setPurchasedProductsCount] = useState(1);

    const onClickHandler = () => {
        if(productCount > 0 && product.price < depositedBanknotes.depositedBanknotes){
            setProductCount(prev => prev - 1);
            // productItems.decreaseProductCount(product);
            setPurchasedProductsCount(prev => prev + 1);
            depositedBanknotes.decrease(product.price); 
            setMessagePopup(`вы получили ${purchasedProductsCount} ${product.title}`);        
        }
    }

    const mouseHandler = () => {
        setIsDescriptionVisible(prev => !prev);
    }

   return (
    <>
        <PopupMessage message={messagePopup}/>
       <div className='product-item' onClick={onClickHandler} onMouseEnter={mouseHandler} onMouseLeave ={mouseHandler}>
            {isDescriptionVisible && <ProductPriceComponent price={product.price}/>}
            <p>{product.title}</p>
            <div className={`product-count-container ${productCount === 0 && 'product-empty'}`}>{productCount}</div>
            <img src={product.image} alt={product.title} className='product-image'/>
       </div>
    </>
   );
});