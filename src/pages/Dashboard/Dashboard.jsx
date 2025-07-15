import React from 'react'
import DashboardNavBar from "../../components/DashboardNavBar";
import { motion } from "framer-motion"
import {useNavigate } from "react-router-dom"

export default function Dashboard() {

    const navigate = useNavigate();
    const Logout = () => {
        navigate("/");
    }

    const buttonVariants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95 },
      };
    return (
    <>
        <DashboardNavBar/>
        <div className='px-38 py-10'>
            <div className=''>My Mentor</div>
            
            <div className='flex gap-x-4'>
                <div className='gap-y-4 grid'>
                    <div className='bg-[#EAEAEA] flex flex-col items-center rounded-3xl py-8 px-8 gap-y-4'>
                        <div className='size-[150px] rounded-full bg-[#D9D9D9]'></div>
                        <h2>Jade Ian Lucero</h2>
                        <p className='text-xs text-[#00000099]'>james.lucero.swu@phinmaed.com</p>
                        <div className='bg-[#F9F5F0] px-8 py-2 rounded-full' >
                            <p>Early Stage</p> 
                        </div>
                    </div>
                    <div className='bg-[#EAEAEA] grid gap-y-4 rounded-3xl py-4 px-4'>
                        <p>Mentorship Progress</p>
                        <div className='w-full bg-[#D9D9D9] h-2 rounded'>
                            <div className='w-[25%] bg-[#5C5C5C] h-full rounded'>
                            </div>
                        </div>
                        <div>
                            <p className='text-[#00000080]'>Completed</p>
                            <p>First Mentor Session!</p>
                            <p className='text-[#00000080]'>Upcoming</p>
                            <p>Second Mentor Session!</p>
                        </div>
                        
                    </div>
                </div>
                
                <div className='w-full flex flex-col gap-y-4 '>
                    <div className='bg-[#EAEAEA] flex flex-col items-center rounded-3xl py-8 px-8 gap-y-4 w-full h-60 p-4'> 
                        <div className='flex justify-between w-full items-center border-b pb-2 border-[#00000033] '>
                            <p>Personal Information</p>
                            <div className="hidden md:flex items-center">
                                <motion.button
                                    className="bg-[#817773] hover:bg-[#E1D7CD] hover:text-[#817773] px-8 text-white  py-2 rounded-full text-sm font-bold"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={() => setShowLoginDialog(true)}
                                >
                                    Edit
                                </motion.button>
                            </div>
                        </div>
                        <div className='flex w-full'>
                            <div className='grid gap-4 w-[50%]'>
                                <div className=''>
                                    <p className='text-[#00000080]'>First Name</p>
                                    <p>Jade Ian</p>
                                </div>
                                <div className=''>
                                    <p className='text-[#00000080]'>Email</p>
                                    <p>james.lucero.swu@phinmaed.com</p>
                                </div>
                            </div>
                            <div className='grid gap-4 w-[50%]'>
                                <div className=''>
                                    <p className='text-[#00000080]'>Last Name</p>
                                    <p>Lucero</p>
                                </div>
                                <div className=''>
                                    <p className='text-[#00000080]'>Role</p>
                                    <p>User</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-x-4 h-[45%]'>
                        <div className='bg-[#EAEAEA] w-[40%] rounded-3xl p-8 grid gap-y-4'>
                            <p className='mb-2'>Mentorship</p>
                            <div className='mb-4'>
                                <p>Marcelo Rodrigo</p>
                                <p className='text-[#00000080]'>Marketing Strategist Coach</p>
                                <p className='text-[#00000080]'>Pitching, Financial Planning</p>
                            </div>
                            <div className="hidden md:flex items-center">
                                <motion.button
                                    className="bg-[#817773] hover:bg-[#E1D7CD] hover:text-[#817773] px-8 text-white w-full py-2 rounded-full text-sm font-bold"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={() => setShowLoginDialog(true)}
                                >
                                    Request New Mentor
                                </motion.button>
                            </div>
                        </div>
                        <div className='bg-[#EAEAEA] w-[60%] rounded-3xl p-8 grid gap-y-4'>
                            <p className='mb-8'>AI Learning Progress</p>
                            <div className='mb-4'>
                                <p className='text-[#00000080]'>Last Accessed Topic</p>
                                <p className=''>"Write me a business plan"</p>
                            </div>
                            <div className="hidden md:flex items-center">
                                <motion.button
                                    className="bg-[#817773] hover:bg-[#E1D7CD] hover:text-[#817773] px-8 text-white w-full py-2 rounded-full text-sm font-bold"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={() => setShowLoginDialog(true)}
                                >
                                    Request New Mentor
                                </motion.button>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full justify-end'>
                        <div className="hidden md:flex items-center">
                            <motion.button
                                className="px-24 bg-[#fff] hover:bg-[#E1D7CD] px-8 text-[#f00] border-2 border-[#E1D7CD] w-full py-2 rounded-full text-sm font-bold"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={Logout}
                            >
                                Log out
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}