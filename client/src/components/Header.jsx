import { useState } from 'react';
import { GrMultiple } from 'react-icons/gr';
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import CustomButton from './CustomButton';

const Header = ({ searchData, createNewTeam }) => {

  const [showbtn, setShowbtn] = useState(false);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery(e.target.value);
    searchData(e.target.value);
  }

  const handleShowbtn = () => {
    setShowbtn(!showbtn);
  }

  const createNewUser = () => {
    navigate("/createuser");
  }

  return (
    <div className='w-full h-[70px] bg-[#ffffff] sticky top-0 z-10 shadow-[0_25px_50px_0px_rgba(0,0,0,0.1)] flex justify-between items-center px-4 sm:px-12 md:px-24 lg:px-44' >
      <div className="flex items-center justify-center gap-1 font-bold hover:cursor-pointer text-2xl sm:text-3xl">
        <GrMultiple size={28} className='text-red-500 mr-1'  />
        <h2>CreateTeams</h2>
      </div>
      <div className='relative'>
        <IoIosSearch size={20} className="text-gray-500 absolute top-1.5 left-1.5" />
        <input type="search" value={query} onChange={handleChange}   placeholder="Search" className="w-[250px] h-[30px] border border-gray-300 rounded-md p-2 outline-none pl-8" />
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:block font-semibold bg-[#e5322d] px-3 py-2 rounded-md text-white hover:bg-[#dc615d] ">
          <CustomButton title="Create Team" onClick={createNewTeam} />
        </div>
        <div className="hidden md:block font-semibold border px-3 py-1.5 border-red-400 rounded-md hover:text-[#e5322d]">
          <CustomButton title="Create User" onClick={createNewUser} />
        </div>
      </div>
      <div className='hover:cursor-pointer md:hidden relative'>
        <RxHamburgerMenu onClick={handleShowbtn}  className="sm:text-4xl hover:opacity-60 text-3xl " />
        {
        showbtn && (<div className='absolute right-[2px] bg-black opacity-90 p-4 rounded-md '>
          <div className="font-medium bg-[#e5322d] px-3 py-2 rounded-md text-white hover:bg-[#dc615d] ">
            <CustomButton title="Create Team" onClick={createNewTeam} />
          </div>
          <div className="font-medium text-white border mt-4 px-3 py-1.5 border-red-400 rounded-md hover:text-[#e5322d]">
            <CustomButton title="Create User" onClick={createNewUser} />
          </div>
        </div>)
        }
      </div>
    </div>
  )
}

export default Header