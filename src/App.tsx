import './App.css'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Router from './routes/Router'

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route  path='/*' element={<Router/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
