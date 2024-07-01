import React from 'react'
import { useContext, useState, useRef } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Layout from '../../Components/Layout'
import { ShoppingCartContext } from '../../Context'

function SignIn({props}) {
  const context = useContext(ShoppingCartContext)
  const[view, setView] = useState('user-info')
  const form = useRef(null)

  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false);
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(false)

    return <Navigate  replace to={'/'}/>
  }

  const createAnAccount = () => {
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }
    
    const stringifiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedAccount)
    context.setAccount(data)

    handleSignIn()
  }

  const renderLogIn = () => {
    return (
      <div className='flex flex-col w-80'>
      <p>
        <span>Email: </span>
        <span>{parsedAccount?.email}</span>
      </p>
      <p>
        <span>Password: </span>
        <span>{parsedAccount?.password}</span>
      </p>
      <Link to='/'>
        <button className='bg-black text-white py-3 mt-4 mb-2 w-full rounded-lg'
        onClick={() => handleSignIn()}
        disabled={!hasUserAnAccount}>
          Log In
        </button>
      </Link>
      <span className='text-center font-light text-xs underline underline-offset-4 mt-2'>Forgot my password</span>
      <button className='border border-black w-full rounded-lg mt-6 py-3'
      onClick={() => setView('create-user-info')}
      disabled={hasUserAnAccount}>
        Sign Up
      </button>
      </div>
    )
  }

  const renderCreateUserInfo = () => {
    return (
      <form ref={form} className='flex flex-col gap-4 w-80'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='font-light text-sm'>Your name: </label>
          <input
           type="text"
           id='name'
           name='name'
           defaultValue={parsedAccount?.name}
           placeholder='Peter'
           className='rounded-lg border border-black placeholder:font-light 
           placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
           />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='font-light text-sm'>Your email: </label>
          <input
            type="text"
            id='email'
            name='email'
            defaultValue={parsedAccount?.email}
            placeholder='hi@helloworld.com'
            className='rounded-lg border border-black placeholder:font-light 
            placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='font-light text-sm'>Your password: </label>
          <input
            type="text"
            id='password'
            name='password'
            defaultValue={parsedAccount?.password}
            placeholder='******'
            className='rounded-lg border border-black placeholder:font-light 
            placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
           />
        </div>
        <Link to='/'>
          <button
          className='bg-black text-white w-full rounded-lg py-3'
          onClick={() => createAnAccount()}
          >
            Create
          </button>
        </Link>
      </form>
    )
  }

  const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogIn()

  return (
    <Layout>
      {/* <div className='flex w-80 items-center justify-center relative mb-4'> */}
        <h1 className='font-medium text-xl mb-2'>Welcome</h1>
        {renderView()}
    </Layout>
  )
}

export default SignIn