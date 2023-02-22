import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Header 
        backgroundImage='https://res.cloudinary.com/dso6wubcp/image/upload/v1677068594/images/Climber-Travel_ifkcfz.jpg'
      />
    </>
  )
}
