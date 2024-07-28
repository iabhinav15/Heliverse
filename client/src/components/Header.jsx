import { useState } from 'react';
import { GrMultiple } from 'react-icons/gr';
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import CustomButton from './CustomButton';
import { useSelector } from 'react-redux';
import TeamCard from './TeamCard';
import { useForm } from 'react-hook-form';
import TextInput from './TextInput';

const Header = ({ searchData, createNewTeam, filterData }) => {

  const [showbtn, setShowbtn] = useState(false);
  const [query, setQuery] = useState("");
  const [isTeamModalOpen, setisTeamModalOpen] = useState(false);
  const [isFilterModalOpen, setisFilterModalOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm ({mode:'onChange'});

  const domainArray = [ 'Sales', 'Finance', 'Marketing', 'IT', 'Management', 'Design', 'Business Development'];

  const teams = useSelector((state) => state.teams);
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

  const onSubmit = (data) => {
    filterData(data);
  }


  return (
    <div className='w-full h-[70px] bg-[#ffffff] sticky top-0 z-10 shadow-[0_25px_50px_0px_rgba(0,0,0,0.1)] flex justify-between items-center px-4 sm:px-12 md:px-24 lg:px-44' >
      <div className="flex items-center justify-center gap-1 font-bold hover:cursor-pointer text-2xl sm:text-3xl">
        <GrMultiple size={28} className='text-red-500 mr-1'  />
        <h2 className='hidden md:block'>CreateTeams</h2>
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
          <div className="font-medium text-white border mt-4 px-3 py-1.5 border-red-400 rounded-md hover:text-[#e5322d]">
            <CustomButton title="View Teams" onClick={()=>setisTeamModalOpen(!isTeamModalOpen)} />
          </div>
          <div className="font-medium text-white border mt-4 px-3 py-1.5 border-red-400 rounded-md hover:text-[#e5322d]">
            <CustomButton title="Apply filter" onClick={()=>setisFilterModalOpen(!isFilterModalOpen)} />
          </div>
        </div>)
        
        }
        {
          isTeamModalOpen && (
            <div className='fixed top-0 left-0 w-full h-full bg-red-500 flex flex-col items-center justify-center'>
                <button className='absolute right-5 top-5 text-xl font-bold' onClick={()=>setisTeamModalOpen(!isTeamModalOpen)} >X</button>
                <h1 className='text-xl font-semibold'>Teams</h1>
                <div className="">
                    {
                      teams?.map((team) => (
                        <TeamCard key={team._id} team={team} />
                      ))
                    }
                </div>
              </div>
          )
        }
        {
          isFilterModalOpen && (
            <div className='fixed top-0 left-0 w-full h-full bg-red-300 flex flex-col items-center justify-center'>
                <button className='absolute right-5 top-5 text-xl font-bold' onClick={()=>setisFilterModalOpen(!isFilterModalOpen)} >X</button>
                <h1 className='text-xl font-semibold'>Filters</h1>
            <div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>
              {/* filter on the basis of gender */}
              <div>
                <h1 className='mt-4 font-medium '>Gender</h1>
                  <TextInput 
                    name='gender' type='checkbox' value="Male"
                    label='Male' register={ register('Male')} 
                    styles='w-full' externalStyles='flex items-center justify-center gap-4'
                  />
                  <TextInput
                    name='gender' type='checkbox' value="Female"
                    label='Female' register={ register('Female')} 
                    styles='w-full' externalStyles='flex items-center justify-center gap-4'
                  />
                  <TextInput
                    name='gender' type='checkbox' value="other"
                    label='Other' register={ register('other')} 
                    styles='w-full' externalStyles='flex items-center justify-center gap-4'
                  />
                </div>
                {/* filter on the basis of availability */}
                <div>
                  <h1 className='mt-4 font-medium'>Availability</h1>
                  <div className='flex flex-col items-center'>
                    <TextInput
                      name='availability' type='checkbox' value="true"
                      label='Available' register={ register('available')} 
                      styles='w-full' externalStyles='flex items-center justify-center gap-4'
                    />
                  </div>
                </div>
                {/* filter on the basis of domain */}
                <div className='flex flex-col items-center'>
                  <h1 className=' mt-4 font-medium'>Domain</h1>
                  <div className='flex flex-col items-center'>
                    {
                      domainArray.map((domain, key) => (
                        <TextInput key={key}
                          name={domain} type='checkbox' value={domain}
                          label={domain} register={register(`${domain}`)} 
                          styles='w-full' externalStyles='flex items-center justify-center gap-4'
                        />
                      ))
                    }
                  </div>
                </div>
                <CustomButton type='submit' containerStyles={`inline-flex justify-center rounded-md bg-red-500 px-4 py-2.5 my-2 tracking-wide text-sm font-medium text-white outline-none `} title='Apply filter'/>
            </form>
            </div>
            </div>)
        }
      </div>
    </div>
  )
}

export default Header