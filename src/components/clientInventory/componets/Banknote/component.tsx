import './styles.css';
import { depositedBanknotes } from '../../../../store/depositedBanknotes';
import { BanknoteType } from './type';
import { observer } from 'mobx-react-lite';
import { clientBanknotes } from '../../../../store/clientBanknotes';
import { vendingMachineBanknotes } from '../../../../store/vendingMachineBanknotes';

type BanknoteComponentProps = {
    banknote : BanknoteType
}

export const BanknoteComponent = observer(({ banknote } : BanknoteComponentProps) => {
   const banknoteCount = clientBanknotes.getCurrentBanknote(banknote);

   const onClickHandler = () => {
      if(banknoteCount > 0){
         clientBanknotes.decrease(banknote)
         depositedBanknotes.increase(banknote.value);
         vendingMachineBanknotes.recieveBanknotes([{ ...banknote, count: 1 }]);
      }
   }

   return (
    <div className="client-banknote-container">
       <div className='client-banknote' onClick={onClickHandler}>
            {banknote.value} ₽
       </div>
       <div className='client-banknote-count'>
            {banknoteCount}
       </div>
    </div>
   );
});

