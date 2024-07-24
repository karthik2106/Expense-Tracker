import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Auth} from "./pages/auth/index"
import { ExpenseTracker } from './pages/expense-tracker'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' exact element={<Auth />} />
          <Route path='/expense-tracker' element={<ExpenseTracker />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
