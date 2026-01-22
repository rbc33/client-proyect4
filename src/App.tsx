import { Toaster } from 'react-hot-toast'
import AppRouter from './appRouter/AppRouter'
import NavBar from './components/NavBar'

function App() {

  return (
  <>
  <NavBar />
  <AppRouter />
  <Toaster
  position="top-right"
  reverseOrder={false}
  />
    
  </>
  )
}

export default App
