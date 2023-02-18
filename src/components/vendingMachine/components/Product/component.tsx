import { ProductType } from "./types";
import { useState } from "react";
import './styles.css';
import { ProductPriceComponent } from "../ProductPriceUI/component";
import { depositedBanknotes } from "../../../../store/depositedBanknotes";
import { PopupMessage } from "../../../popupMessage";

type ProductProps = {
    product: ProductType
}

export const ProductComponent = ({product} : ProductProps):JSX.Element => {
    const [productCount, setProductCount] = useState(product.count);
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [purchasedProductsCount, setPurchasedProductsCount] = useState(0);
    // const messageDisappearTimer = setTimeout(() => alert('fsdfs'), 2000);

    const onClickHandler = () => {
        if(productCount > 0 && product.price < depositedBanknotes.depositedBanknotes){
            setProductCount(prev => prev - 1);
            setPurchasedProductsCount(prev => prev + 1);
            depositedBanknotes.decrease(product.price); 
            setMessage(`вы получили ${purchasedProductsCount} ${product.title}`); 
            
            setIsPopupVisible(() => true);          
        }
    }

    const mouseHandler = () => {
        setIsDescriptionVisible(prev => !prev);
    }

   return (
    <>
        {isPopupVisible && <PopupMessage message={message}/>}
       <div className='product-item' onClick={onClickHandler} onMouseEnter={mouseHandler} onMouseLeave ={mouseHandler}>
            {isDescriptionVisible && <ProductPriceComponent price={product.price}/>}
            <p>{product.title}</p>
            <div className={`product-count-container ${productCount === 0 && 'product-empty'}`}>{productCount}</div>
            <img src={product.image} alt={product.title} className='product-image'/>
       </div>
    </>
   );
};