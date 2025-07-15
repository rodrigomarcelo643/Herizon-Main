import Navbar from "../../components/Navbar"
import { FaSearch } from "react-icons/fa"

export default function Mentor(){
    return(
        <>
            <Navbar/>
            <div className="px-36">
                <div className="flex justify-between items-center">
                    <h1 className="font-[Montserrat-Regular] text-[96px]">Mentor</h1>
                    <div className="border flex items-center px-2 ps-4 border-[#0000004D] w-[25%] gap-x-2 rounded-full">
                        <FaSearch className="text-[#0000004D]"/>
                        <input type="text" placeholder="Search" className="w-full py-3 h-full w-full "/>
                    </div>
                    
                </div>
                <div>

                </div>
            </div>
        </>
        
    )
}