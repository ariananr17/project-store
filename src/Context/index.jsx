import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext()

export const initializeLocalStorage = () => {
    const accountInLocalStorage = localStorage.getItem('account');
    const signOutInLocalStorage = localStorage.getItem('sign-out')
    let parsedAccount;
    let parsedSignOut;


    if (!accountInLocalStorage) {
        localStorage.setItem('account', JSON.stringify({}))
        parsedAccount = {}
    } else {
        parsedAccount = JSON.parse(accountInLocalStorage)
    }

    if (!signOutInLocalStorage) {
        localStorage.setItem('sign-out', JSON.stringify(false))
        parsedSignOut = false
    } else {
        parsedSignOut = JSON.parse(signOutInLocalStorage)
    }
    
}


export const ShoppingCartProvider = ({children}) => {

    const [account, setAccount] = useState({})

    const [signOut, setSignOut] = useState(false)


    const [count, setCount] = useState(0)
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)

    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    const [productToShow, setProductToShow] = useState({})

    // Shopping Cart Add products to cart
    const [cartProducts, setCartProducts] = useState([])

    const [order, setOrder] = useState([])

    const [items, setItems] = useState(null)
    const [filteredItems, setFilteredItems] = useState(null)

   

    const [searchByTitle, setSearchByTitle] = useState('')
    const [searchByCategory, setSearchByCategory] = useState('')
    
    
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
          .then(response => response.json())
          .then(data => setItems(data))
      }, [])

    
    const searchedItems = items?.filter(
        (item) => (
            item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        )

    const searchedCategory = items?.filter(
        (item) => (
            item.category.toLowerCase() === searchByCategory.toLowerCase()
            // item.category.toLowerCase().includes(searchByCategory.toLowerCase()))
        ))
    

    const filterBy = (searchedCategory, searchByTitle) => {
        return searchedCategory.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    useEffect(() => {
        if(searchByTitle) setFilteredItems(searchedItems)
        if(searchByCategory) setFilteredItems(searchedCategory)
        if(searchByTitle && searchByCategory) setFilteredItems(filterBy(searchedCategory, searchByTitle))

    }, [items, searchByTitle, searchByCategory])

    console.log('filtered items: ', filteredItems)
    


    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            items,
            setItems,
            filteredItems,
            setFilteredItems,
            searchByTitle,
            setSearchByTitle,
            searchedItems,
            searchByCategory,
            setSearchByCategory,
            searchedCategory,
            account,
            setAccount,
            signOut,
            setSignOut
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )   

}
    