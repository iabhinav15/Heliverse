import { Link } from "react-router-dom";

const TeamCard = ({ team }) => {
  return (
    <div className='flex w-full justify-between items-center gap-4 rounded-md px-3 py-2 my-4 shadow-md bg-white hover:bg-gray-100 transition-colors'>
      <p className='text-sm font-medium'>{team.teamName}</p>
      <p className='text-xs font-medium'>{team.teamMembers?.length} members</p>
      <Link to={`${import.meta.env.VITE_APP_PUBLIC_URL}/team/${team._id}`} className='text-sm font-medium text-black bg-red-500 px-3 py-2 rounded-lg'>View</Link>
    </div>
  );
};

export default TeamCard;
