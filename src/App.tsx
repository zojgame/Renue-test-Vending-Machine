import './App.css'
import { VendingMachineComponent } from './components/vendingMachine/index';
import { ClientInventory } from './components/clientInventory';
import { products } from './mock/products';
import { VedingMachineInventory } from './components/vedingMachineInventory';

function App() {
  return (
    <div className="main-page">
      <ClientInventory />
      <VendingMachineComponent products={products}/>
      <VedingMachineInventory />
    </div>
  )
}

export default App
