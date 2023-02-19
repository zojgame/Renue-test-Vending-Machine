import styles from './styles.module.css';
import { depositedBanknotes } from '../../../vendingMachine/store/depositedBanknotes';
import { BanknoteType } from './type';
import { observer } from 'mobx-react-lite';
import { clientBanknotes } from '../../store/clientBanknotes';
import { vendingMachineBanknotes } from '../../../vedingMachineInventory/store/vendingMachineBanknotes';

type BanknoteComponentProps = {
   banknote : BanknoteType
}

export const BanknoteComponent = observer(({ banknote } : BanknoteComponentProps) => {
   const banknoteCount = clientBanknotes.getCurrentBanknote(banknote);

   const onClickHandler = () => {
      // если количество банкнот в кошельке больше 1
      // то при нажатии вставляем купюру в автомат
      if(banknoteCount > 0){
         clientBanknotes.decrease(banknote)
         depositedBanknotes.increase(banknote.value);
         vendingMachineBanknotes.recieveBanknotes([{ ...banknote, count: 1 }]);
      }
   }

   return (
    <div className={styles.clientBanknoteContainer}>
       <div className={styles.clientBanknote} onClick={onClickHandler}>
            {banknote.value} ₽
       </div>
       <div className={styles.clientBanknoteCount}>
            {banknoteCount}
       </div>
    </div>
   );
});

