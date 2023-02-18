import './styles.css';
import { BanknoteType } from '../../../clientInventory';
import { vendingMachineBanknotes } from '../../../../store/vendingMachineBanknotes';
import { observer } from 'mobx-react-lite';

type BanknoteComponentProps = {
    banknote : BanknoteType
}

const BanknoteComponent = observer(({banknote} : BanknoteComponentProps) => {
    const count = vendingMachineBanknotes.getCurrentBanknoteCount(banknote.denomination);


    return (
        <div className="banknote-container">
           <div className='banknote'>
                { banknote.value } ₽
           </div>
           <div className='banknote-count'>
                { count }
           </div>
        </div>
       );
});

export default BanknoteComponent ;