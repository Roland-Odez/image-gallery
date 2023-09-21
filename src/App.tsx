import RouteLayout from './components/RouteLayout'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
// import Protection from './components/Protection'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RouteLayout />} >
      <Route index path='/' element={<Home />} />
      <Route index path='/login' element={<Login />} />
    </Route>
  )
)

function App() {

  return <RouterProvider router={router} />

}

export default App