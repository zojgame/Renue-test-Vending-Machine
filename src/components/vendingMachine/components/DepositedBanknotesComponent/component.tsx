import { depositedBanknotes } from "../../store/depositedBanknotes";
import styles from './styles.module.css';
import { observer } from "mobx-react-lite";

export const DepositedBanknotesComponent = observer(() => {
   return (
       <div className={styles.banknoteCounterContainer}>
            <div>Внесенные купюры:</div>
            <div className={styles.banknoteCounter}>{depositedBanknotes.depositedBanknotes} 💰</div>
       </div>
   );
});
