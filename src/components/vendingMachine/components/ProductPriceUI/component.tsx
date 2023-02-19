import styles from './styles.module.css';

type ProductPriceProps = {
    price: number
}

export const ProductPriceComponent = ({price} : ProductPriceProps) => {
   return (
       <div className={styles.productPrice}>
            {price} ₽
       </div>
   );
};


