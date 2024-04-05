import CustomButton from './CustomButton';
import { Link } from 'react-router-dom';

const UserCard = ({ user, toggleTeamSelection, updateUser, deleteUser, teamMembersDetails }) => {

  return (
    <div className='p-10 flex flex-col justify-center items-center'>
      <div className="w-24 h-24 rounded-full overflow-hidden">
        <img src={user.avatar} alt="avatar" className='w-full h-full  object-cover' />
      </div>
      <div className="flex flex-col justify-center items-center">
        <p>Name: {user.first_name} {user.last_name}</p>
        <p>Gender: {user.gender}</p>
        <p>Domain: {user.domain}</p>
        <p>Availability: {user.available ? 'true' : 'false'}</p>
        <CustomButton onClick={() => toggleTeamSelection(user)} title={teamMembersDetails.some(member => member._id === user._id ) ? "Remove" : "Add to team"} containerStyles={`inline-flex justify-center rounded-md bg-red-500 px-4 py-2.5 my-2 tracking-wide text-sm font-medium text-white outline-none `} />
        <Link to={`${import.meta.env.VITE_APP_PUBLIC_URL}/user/${user._id}`} className="text-white text-sm font-medium bg-red-500 py-2 px-3 rounded-md">View Profile</Link>
        <CustomButton onClick={() => updateUser(user._id)} title="Update user" containerStyles={`inline-flex justify-center rounded-md bg-red-500 px-4 py-2.5 my-2 tracking-wide text-sm font-medium text-white outline-none `} />
        <CustomButton onClick={() => deleteUser(user._id)} title="Delete user" containerStyles={`inline-flex justify-center rounded-md bg-red-500 px-4 py-2.5 my-2 tracking-wide text-sm font-medium text-white outline-none `} />
      </div>
    </div>
  );
};

export default UserCard;
