import { useEffect, useState } from 'react'
import { AllTeams, Filters, Header, Loading, Pagination, UserCard } from '../components';
import CreateTeamModal from '../components/CreateTeamModal';
import UpdateUser from '../components/UpdateUser';

const Home = () => {

  const [users, setUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState({});
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [domainFilter, setDomainFilter] = useState({});
  const [teamMembersDetails, setTeamMembersDetails] = useState([]);
  const [createTeam, setCreateTeam] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updateUserStatus, setupdateUserStatus] = useState(false);
  const [updateUserDetail, setUpdateUserDetail] = useState(false);
  const [newTeamData, setNewTeamData] = useState({});

  const searchData = (query) => {
    setSearchQuery(query.trim());
    setCurrentPage(1);
  }

  const filterData = (data) => {

    const genderFilterData = Object.keys(data)
      .filter(key => ['Male', 'Female', 'other'].includes(key))
      .reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
      }, {});

    setGenderFilter(genderFilterData);

    if(data.available === 'true'){
      setAvailabilityFilter(data.available);
    }

    const domainFilterData = Object.keys(data)
      .filter(key => !['Male', 'Female', 'other', 'available'].includes(key))
      .reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
      }, {});
    setDomainFilter(domainFilterData);

  }
  
  const genderQueryString = Object.keys(genderFilter)
    .filter(key => genderFilter[key]) 
    .join(',');

  const domainQueryString = Object.keys(domainFilter)
    .filter(key => domainFilter[key]) 
    .join(',');

  useEffect(() => {

    setIsSubmitting(true);

    const url = `${import.meta.env.VITE_API_URL}/api/users/get-allusers/?search=${searchQuery}&gender=${genderQueryString}&available=${availabilityFilter}&domain=${domainQueryString}&page=${currentPage}`;

    const fetchUsers = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUsers(data.data);
        setTotalPages(data.totalPages);

      } catch (error) {
        console.log(error);
      }
      finally{
        setIsSubmitting(false);
      }
    };
    fetchUsers();

  }, [searchQuery, genderFilter, availabilityFilter, domainFilter, currentPage]);


  // Select or deselect team members
  const toggleTeamSelection = (user) => {

    // user must be available
    if(user?.available === false) return alert("User is not available");

    // domain also must be unique
    if(teamMembersDetails.some(member => (member.domain === user.domain) && (member._id === user._id))) {
      setTeamMembersDetails((prev) => {
        return prev?.filter(member => member._id !== user._id);
      });
      return;
    }
    else if(teamMembersDetails.some(member => member.domain === user.domain)) return alert("Domain already exists in team");

    setTeamMembersDetails((prev) => {
      if (prev?.some(member => member._id === user._id)) {
        return prev?.filter(member => member._id !== user._id);
      } else {
        return [...prev, user];
      }
    });

  }

  // On click create team opens a modal to confirm new team creation
  const createNewTeam = () => {
    if(teamMembersDetails.length === 0) return alert("Please select atleast one team member");
    setCreateTeam(true);
  }

  // Confirm to create new team
  const onConfirm = async (teamName) => {

    if(teamName.trim() === "") return alert("Please enter team name");

    const teamMembers = teamMembersDetails.map(member => member._id);
    const teamData = {
      teamName,
      teamMembers
    }

    const url = `${import.meta.env.VITE_API_URL}/api/teams/create-team`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData)
      });
      const data = await response.json();
      setNewTeamData(data.data);
      if(data.success) alert("Team created successfully");
      else alert("Something went wrong, please try again");
    } catch (error) {
      console.log(error);
    }
    
    setCreateTeam(false);
    setTeamMembersDetails([]);
  }

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const updateUser = async (userId) => {
    console.log(userId);
    const user = users.find(user => user._id === userId);
    setUpdateUserDetail(user);
    setupdateUserStatus(true);
  }

  const deleteUser = async (userId) => {

    if(!window.confirm("Are you sure you want to delete this user?")) return;
    setUsers(users.filter(user => user._id !== userId));

    const url = `${import.meta.env.VITE_API_URL}/api/users/delete-user/${userId}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if(data.success) alert("User deleted successfully");
      else alert("Something went wrong, please try again");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="">
      <Header searchData={searchData} createNewTeam={createNewTeam} />
      {
        createTeam && <CreateTeamModal teamMembersDetails={teamMembersDetails} onClose={() => setCreateTeam(false)} onConfirm={onConfirm} />
      }
      {
        updateUserStatus && <UpdateUser user={updateUserDetail} onClose={() => setupdateUserStatus(false)} />
      }
      <div className='flex justify-between w-screen '>
        <div>
          <Filters filterData={filterData} />
        </div>
        <div className='flex flex-col justify-between w-3/4"'>
        <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
          {
            isSubmitting ? <Loading /> : 
            (users.length === 0 ? (<div>No users found</div>) : 
            (users?.map(user => (
              <div key={user._id} className={`my-2 flex border ${teamMembersDetails?.some(member => member._id === user._id) ? "border-2 border-red-500" : ""}`}>
                <UserCard user={user} updateUser={updateUser} deleteUser={deleteUser} teamMembersDetails={teamMembersDetails} toggleTeamSelection={toggleTeamSelection} />
              </div>
            ))))
          }
        </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
        <div>
          <AllTeams newTeamData={newTeamData} />
        </div>
      </div>
        
    </div>
  )
}

export default Home