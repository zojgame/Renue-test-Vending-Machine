import styles from './styles.module.css';
import { BanknoteComponent } from '../Banknote/component';
import { clientBanknotes } from '../../../../mock/banknotes';

export const ClientInventory = () => {       
   return (
       <div className={styles.clientMachineInventory}>
        <h1>Купюры в кошельке 👛</h1>
        {clientBanknotes.map((banknote) => 
            <BanknoteComponent banknote={banknote} key={banknote.id}/>
        )}
       </div>
   );
};      