import { BrowserRouter, useRoutes } from 'react-router-dom'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { ShoppingCartProvider, initializeLocalStorage, ShoppingCartContext } from '../../Context'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'
import Navbar from '../../Components/Navbar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import './App.css'

const AppRoutes = () => {
  const context = useContext(ShoppingCartContext)

  const signOut = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOut)
  

  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;
  const isUserSignOut = context.signOut || parsedSignOut

  let routes = useRoutes([
    {path: '/', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate  replace to={'/sign-in'}/>},
    {path: '/my-account', element: <MyAccount />},
    {path: '/:category', element: hasUserAnAccount && !isUserSignOut ?  <Home /> : <Navigate  replace to={'/sign-in'}/>},
    {path: '/my-order', element: <MyOrder />},
    {path: '/my-orders', element: <MyOrders />},
    {path: '/my-orders/last', element: <MyOrder />},
    {path: '/my-orders/:id', element: <MyOrder />},
    {path: '/*', element: <NotFound />},
    {path: '/sign-in', element: <SignIn />}
  ])

  return routes
}


const App = () => {
  initializeLocalStorage()

  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
    
  
)
  
  
}

export default App
