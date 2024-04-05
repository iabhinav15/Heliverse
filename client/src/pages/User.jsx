import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const User = () => {
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsSubmitting(true);
    const url = `${import.meta.env.VITE_API_URL}/api/users/get-user/${id}`;
    const fetchUser = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.log(error);
      }
      finally{
        setIsSubmitting(false);
      }
    };
    fetchUser();

  }, [id]);

  return (
    <div className='bg-gray-100 min-h-[100vh] p-4 rounded-md shadow-md'>
      <div className="border-b flex gap-4 border-gray-300 pb-4 mb-4">
        <img src={user?.avatar} className='max-w-28 max-h-28 object-cover rounded-full ' />
        <div>
          <h2 className="text-lg font-semibold">Name: {user?.first_name} {user?.last_name}</h2>
          <h3 className="text-gray-600">Email: {user?.email}</h3>
          <h3 className="text-gray-600">Domain: {user?.domain}</h3>
          <h3 className="text-gray-600">Gender: {user?.gender}</h3>
          <h3 className="text-gray-600">Avaliable: {user?.available ? "Yes" : "No"} </h3>
        </div>
      </div>
    </div>
  )
}

export default User