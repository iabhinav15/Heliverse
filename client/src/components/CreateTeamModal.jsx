// change by abhinav
import React, { useState } from 'react'

const CreateTeamModal = ({ teamMembersDetails, onClose, onConfirm }) => {

  const [teamName, setTeamName] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-red-400 rounded-lg shadow-lg p-8 w-[20%] flex flex-col">
      <div className="text-center">
        <input type="text" value={teamName} onChange={(e)=> setTeamName(e.target.value)}  placeholder='Enter team name' className='outline-none text-base font-medium mb-4 p-2' />
      </div>
      <h3 className="font-semibold mb-2">Team Members:</h3>
      <ul className="mb-4">
        {teamMembersDetails?.map((member, index) => (
          <li key={index} className="list-disc ml-4">{member?.first_name}</li>
        ))}
      </ul>
      <div className="flex justify-between">
        <button
          onClick={()=>onConfirm(teamName)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-300"
        >
          Confirm
        </button>
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  )
}

export default CreateTeamModal