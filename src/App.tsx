import './App.css'
import { VendingMachineComponent } from './components/vendingMachine';
import { ClientInventory } from './components/clientInventory';
import { VedingMachineInventory } from './components/vedingMachineInventory';

function App() {
  return (
    <div className="main-page">
      <ClientInventory />
      <VendingMachineComponent/>
      <VedingMachineInventory />
    </div>
  )
}

export default App;
