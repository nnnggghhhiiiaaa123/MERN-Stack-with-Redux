import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './Users.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Create from './CreateUser.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Users />}></Route>
        <Route path='create' element={<Create />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
