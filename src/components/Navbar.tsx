import { AppBar, Toolbar } from '@mui/material'
import Image from 'next/image'
import React from 'react'

type Props = {}

import Logo from '../../public/logo.svg'

const Navbar = (props: Props) => {
  return (
    <AppBar color='transparent' elevation={0} sx={{ padding: 2}}>
        <Toolbar sx={{ justifyContent: 'center'}}>
            <Image src={Logo} alt='climberTravel logo' width={150}/>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar