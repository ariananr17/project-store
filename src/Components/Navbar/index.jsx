import { useContext } from 'react'
import { NavLink } from "react-router-dom";
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';


const  Navbar = () => {
    const  activeStyle = 'underline underline-offset-4'
    const context = useContext(ShoppingCartContext)

    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)
    const isUserSignOut = context.signOut || parsedSignOut

    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)

    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

    const handleSignOut = () => {
        const stringifiedSignOut = JSON.stringify(true)
        localStorage.setItem('sign-out', stringifiedSignOut)
        context.setSignOut(true)
    }

    const renderView = () => {

        if (hasUserAnAccount && !isUserSignOut) {
                return (
                <>
                <li className='text-black/60'>
                    {parsedAccount?.email}
                </li>
                <li>
                    <NavLink to='/my-orders'>
                        My Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/my-account'>
                        My Account
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/sign-in'
                    onClick={handleSignOut}
                >
                    Sign Out
                    </NavLink>
                </li>
                {/* <li className='flex items-center'>
                    <ShoppingBagIcon className='h-6 w-6 text-black-500'></ShoppingBagIcon> {context.cartProducts.length}
                </li> */}

                </>
                )
        } else {
            return (
                <li>
                    <NavLink to='/sign-in'
                    onClick={handleSignOut}
                    >
                        Sign In
                    </NavLink>
                </li>
            )
        }

    } 

    

    

    

  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light'>
        <ul className='flex items-center gap-3'>
            <li className='font-semibold text-lg'>
                <NavLink 
                to={`${isUserSignOut ? '/sign-in' : '/'}`}
                onClick={() => context.setSearchByCategory('')}
                className={({ isActive }) =>
                isActive ? activeStyle : undefined}>
                    Shopi
                </NavLink>
            </li>
            <li>
                <NavLink to='/'
                onClick={() => context.setSearchByCategory('')}
                className={({ isActive }) =>
                isActive ? activeStyle : undefined}
                >
                    All
                </NavLink>
            </li>
            <li>
                <NavLink to={`/womens-clothing`}
                onClick={() => context.setSearchByCategory("women's clothing")}
                className={({ isActive }) =>
                isActive ? activeStyle : undefined}
                >
                    Women
                </NavLink>
            </li>
            <li>
                <NavLink to={`/mens-clothing`}
                onClick={() => context.setSearchByCategory("men's clothing")}
                className={({ isActive }) =>
                isActive ? activeStyle : undefined}
                >
                    Men
                </NavLink>
            </li>
            <li>
                <NavLink to='/electronics'
                onClick={() => context.setSearchByCategory('electronics')}
                className={({ isActive }) =>
                isActive ? activeStyle : undefined}
                >
                    Electronics
                </NavLink>
            </li>
            <li>
                <NavLink to='/jewelery'
                onClick={() => context.setSearchByCategory('jewelery')}
                className={({ isActive }) =>
                isActive ? activeStyle : undefined}
                >
                    Jewelery
                </NavLink>
            </li>
        </ul>
        <ul className='flex items-center gap-3'>
            {renderView()}
            <li className='flex items-center'>
                <ShoppingBagIcon className='h-6 w-6 text-black-500'></ShoppingBagIcon> {context.cartProducts.length}
            </li>
        </ul>
    </nav>
  )
}

export default Navbar