import { ProductType } from "../Product/types";
import { ProductComponent } from "../Product/component";
import './styles.css';
// import { BanknoteCounter } from "../BanknoteCounter";
import { DepositedBanknotesComponent } from "../DepositedBanknotesComponent/component";

type VendingMachineProps = {
    products : ProductType[]
}

export const VendingMachineComponent = ({products} : VendingMachineProps):JSX.Element => {
   return (
    <div className="vending-machine-container">
        <DepositedBanknotesComponent />
        <div className="vending-machine">
        {products.map((product) => 
            <ProductComponent product={product} key={product.id}/>
        )}            
       </div>
    </div>
       
   );
};