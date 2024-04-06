import { useEffect, useState } from "react";
import { GrMultiple } from "react-icons/gr"
import TeamCard from "./TeamCard";


const AllTeams = ({ newTeamData }) => {
  
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/api/teams/get-allteam`
        const response = await fetch(url, {
          method: 'GET',
        });
        const data = await response.json()
        setTeams(data.data)
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchTeams();
  }, [newTeamData]);

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
            <TeamCard key={team._id} team={team} />
          ))
        }
        </div>
      </div>
    </>
  )
}

export default AllTeams