import Navbar from '@/components/home/Navbar'
import React from 'react'


const layout = async ({children}: {children: React.ReactNode}) => {
 
  return (
    <main>
        <Navbar />
        
        {children}</main>
  )
}

export default layout