import '../../styles.css';
import styles from './styles.module.css';
import { VendingMachineComponent } from '../../components/vendingMachine';
import { ClientInventory } from '../../components/clientInventory';
import { VedingMachineInventory } from '../../components/vedingMachineInventory';

export function MainPage() {
  return (
    <div className={styles.mainPage}>
      <ClientInventory />
      <VendingMachineComponent/>
      <VedingMachineInventory />
    </div>
  )
};
