import { useEffect, useState } from "react";
import { GrMultiple } from "react-icons/gr"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { addTeam } from "../redux/teamSlice";


const AllTeams = () => {
  const teams = useSelector((state) => state.teams);
  // const [teams, setTeams] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/api/teams/get-allteam`
        const response = await fetch(url, {
          method: 'GET',
        });
        const data = await response.json()
       
        dispatch(addTeam(data.allteams))
        
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchTeams();
  }, []);

  return (
    <>
      <div className='hidden md:flex flex-col items-center w-72 h-[calc(100vh-70px)] bg-red-500 sticky top-[70px] right-0'>
        <div className='flex items-center justify-center gap-3 text-center text-4xl font-bold pt-4 mb-4 text-[#33333b] '>
          <h1>Teams</h1> 
          <GrMultiple size={28} />
        </div>
        <div className="">
        {
          teams?.map((team) => (
            <div key={team._id} className='flex w-full justify-between         items-center gap-4 rounded-md px-3 py-2 my-4 shadow-md bg-white hover:bg-gray-100 transition-colors'>
              <div className='text-sm font-medium'>{team.teamName}</div>
              <p className='text-sm font-medium'>{team.teamMembers?.length} members</p>
              <Link to={`${import.meta.env.VITE_APP_PUBLIC_URL}/team/${team._id}`} className='text-sm font-medium text-black bg-red-500 px-3 py-2 rounded-lg'>View</Link>
            </div>
          ))
        }
        </div>
      </div>
    </>
  )
}

export default AllTeams