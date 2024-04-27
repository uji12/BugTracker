'use client';
import classNames from 'classnames';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaBug } from "react-icons/fa";
const Navbar = () => {
    const currentPath = usePathname();
    const links =[
        {label:'Dashboard',href:'/'},
        {label:'Issues',href:'/issues'}
    ]
  return (
    <nav className='flex space-x-6 border-b h-10 mb-5 px-5 items-center '>
     <Link href='/'><FaBug/></Link>
     <ul className='flex space-x-6'>
        {/* <li ><Link className='text-zinc-500 hover:text-zinc-800 transition-colors'href='/'>Dashboard</Link></li>
        <li><Link className='text-zinc-500 hover:text-zinc-800 transition-colors' href='/Issues'>Issues</Link></li> */}
        {
            links.map(li=><Link href={li.href} key={li.href}className={classNames({
                'text-zinc-900':li.href===currentPath,
                'text-zinc-500':li.href!==currentPath,
                'hover:text-zinc-800 transition-colors': true 
            })}>{li.label}</Link>)
        }

     </ul>
    </nav>
  )
}

export default Navbar