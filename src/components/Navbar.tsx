'use client'

import React, { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import { AiOutlineUpload } from 'react-icons/ai'
import { MdOutlineCancel } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '../firebase/config'


// const pacifico = Pacifico({ subsets: ['cyrillic'], style: 'normal', weight: ['400'] })


const Navbar = ({ handleSearch }: { handleSearch: React.ChangeEventHandler }) => {
    const [show, setShow] = useState<boolean>(false)
    const [authData, setAuthData] = useState<any>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            console.log(user)
            if (user) {
                setAuthData(auth)
            } else {
                auth.signOut()
                setAuthData(null)
                navigate('/login')
            }
        });
    }, [authData])
    // console.log('navbar auth', authData)

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {

        setShow((like) => !like)
        console.log(" 0000000000000")
    }
    const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
        authData.signOut()
        setAuthData(null)
        navigate('/login')
    }
    return (
        <div className='py-2 flex items-center justify-between gap-4 px-4'>
            {
                show &&
                <div className='bg-[#f7f7f7] w-full z-10 absolute left-0 top-0 items-center p-2 flex-1 gap-2 rounded-b-md flex duration-700 animate-slidedown'>
                    <div>
                        <FiSearch />
                    </div>
                    <input onChange={handleSearch} type="text" placeholder='Search image' className='placeholder:text-[#656f79] py-2 text-[#656f79] text-sm bg-transparent outline-none w-full' />
                    <button onClick={handleClick}><MdOutlineCancel className='text-xl w-6 h-6' /></button>
                </div>
            }
            <h1 className={` whitespace-nowrap text-lg font-medium font-pacific`}>I-Gallery</h1>
            <div className='bg-[#f7f7f7] hidden items-center p-2 flex-1 gap-2 rounded-xl sm:flex'>
                <div>
                    <FiSearch />
                </div>
                <input onChange={handleSearch} type="text" placeholder='Search image' className='placeholder:text-[#656f79] w-full text-[#656f79] text-sm bg-transparent outline-none' />
            </div>
            <div className='flex items-center justify-center gap-2'>
                <button onClick={handleClick} className='border cursor-pointer text-sm outline-none rounded-3xl border-[#656f79] text-[#191b26] p-3 flex sm:hidden items-center justify-center'>
                    <FiSearch />
                </button>
                {
                    authData !== null &&
                    <>
                        <button onClick={handleLogout} className='border outline-none rounded-3xl border-[#656f79] text-[#191b26] text-sm p-2'>
                            Logout
                        </button>
                        <button className='bg-[#00ab6b] rounded-md text-white text-sm gap-2 p-2 flex justify-center items-center outline-none'>
                            <AiOutlineUpload className="text-base" />
                            <span>Upload</span>
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default Navbar