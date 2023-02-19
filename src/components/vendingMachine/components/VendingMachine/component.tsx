import { ProductType } from "../Product/types";
import { ProductComponent } from "../Product/component";
import './styles.css';
import { DepositedBanknotesComponent } from "../DepositedBanknotesComponent/component";
import { observer } from "mobx-react-lite";
import { productItems } from "../../store/products";

export const VendingMachineComponent = observer(():JSX.Element => {
    // отсортировать по возрастанию
    const sortedProducts = productItems.products.slice()
    .sort((prev, curr) => curr.price - prev.price);

   return (
    <div className="vending-machine-container">
        <DepositedBanknotesComponent />
        <div className="vending-machine">
        {sortedProducts.map((product) => 
            <ProductComponent product={product} key={product.id}/>
        )}            
       </div>
    </div>
       
   );
});