import './styles.css';
import BanknoteComponent from '../Banknote/component';
import { ChangeButtonComponent } from '../ChangeButton/ChangeButton';
import { vendingMachineBanknotes } from '../../../../mock/banknotes';

export const VedingMachineInventory = () => {       
   return (
       <div className='vending-machine-inventory'>
        <h1>Купюры в автомате 🎰</h1>
        {vendingMachineBanknotes.map((banknote) => 
            <BanknoteComponent key={banknote.id} banknote={banknote}/>
        )}
        <ChangeButtonComponent />
       </div>
   );
};      