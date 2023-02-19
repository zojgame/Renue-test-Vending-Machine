import './styles.css';
import { VendingMachineComponent } from '../../components/vendingMachine';
import { ClientInventory } from '../../components/clientInventory';
import { VedingMachineInventory } from '../../components/vedingMachineInventory';

export function MainPage() {
  return (
    <div className="main-page">
      <ClientInventory />
      <VendingMachineComponent/>
      <VedingMachineInventory />
    </div>
  )
};
