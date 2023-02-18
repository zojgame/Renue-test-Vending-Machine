import './styles.css';

type ProductPriceProps = {
    price: number
}

export const ProductPriceComponent = ({price} : ProductPriceProps) => {
   return (
       <div className="product-price">
            {price} ₽
       </div>
   );
};


