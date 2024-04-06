import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Team = () => {

  const [Team, setTeam] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/api/teams/get-team/${id}`
        const response = await fetch(url, {
          method: 'GET',
        });
        const data = await response.json();
        setTeam(data.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchTeam();
  }, []);

  return (
    <div className="bg-gray-100 p-4 min-h-[100vh] rounded-md shadow-md">
      <h1 className="text-2xl text-center font-bold mb-4">{Team?.teamName}</h1>
      <h3 className="text-2xl font-bold mb-4">Team Members</h3>
      {
        Team?.teamMembers.map((member) => (
          <div key={member._id} className="border-b flex gap-4 border-gray-300 pb-4 mb-4">
            <img src={member.avatar} className='max-w-24 max-h-24 object-cover rounded-full ' />
            <div>
              <h2 className="text-lg font-semibold">Name: {member.first_name} {member.last_name}</h2>
              <h3 className="text-gray-600">Email: {member.email}</h3>
              <h3 className="text-gray-600">Domain: {member.domain}</h3>
              <h3 className="text-gray-600">Gender: {member.gender}</h3>
              <h3 className="text-gray-600">Avaliable: {member.available ? "Yes" : "No"} </h3>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Team