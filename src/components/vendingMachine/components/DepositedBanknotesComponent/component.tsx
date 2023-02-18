import { depositedBanknotes } from "../../../../store/depositedBanknotes";
import './styles.css';
import { observer } from "mobx-react-lite";

export const DepositedBanknotesComponent = observer(() => {
   return (
       <div className='banknote-counter-container'>
            <div>Внесенные купюры:</div>
            <div className="banknote-counter">{depositedBanknotes.depositedBanknotes} 💰</div>
       </div>
   );
});
