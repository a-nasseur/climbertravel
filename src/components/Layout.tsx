import React from 'react'
import Navbar from './Navbar'

type Props = {
    children?: any
}

const Layout = ({ children }: Props) => {
  return (
    <>
        <Navbar />
        <main>{children}</main>
    </>
  )
}

export default Layout