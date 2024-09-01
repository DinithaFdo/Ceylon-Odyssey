
import './App.css'
import AppRoutes from './routes/Approutes'
import AddDestination from './components/destination/addDestination';
import AllDestination from './components/destination/allDestination';

function App() {

  return (
    <>
      <AppRoutes />
      <AddDestination />
      <AllDestination />
    </>
  )
}

export default App
