import styles from './styles.module.css';
import { BanknoteType } from '../../../clientInventory';
import { vendingMachineBanknotes } from '../../store/vendingMachineBanknotes';
import { observer } from 'mobx-react-lite';

type BanknoteComponentProps = {
    banknote : BanknoteType
}

const BanknoteComponent = observer(({banknote} : BanknoteComponentProps) => {
    const count = vendingMachineBanknotes.getCurrentBanknoteCount(banknote.denomination);

    return (
        <div className={styles.banknoteContainer}>
           <div className={styles.banknote}>
                { banknote.value } ₽
           </div>
           <div className={styles.banknoteCount}>
                { count }
           </div>
        </div>
       );
});

export default BanknoteComponent ;