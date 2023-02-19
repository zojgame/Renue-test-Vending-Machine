import styles from './styles.module.css';
import BanknoteComponent from '../Banknote/component';
import { ChangeButtonComponent } from '../ChangeButton/component';
import { vendingMachineBanknotes } from '../../../../mock/banknotes';

export const VedingMachineInventory = () => {       
   return (
       <div className={styles.vendingMachineInventory}>
        <h1>Купюры в автомате 🎰</h1>
        {vendingMachineBanknotes.map((banknote) => 
            <BanknoteComponent key={banknote.id} banknote={banknote}/>
        )}
        <ChangeButtonComponent />
       </div>
   );
};      