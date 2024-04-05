import React from 'react';
import {Outlet,  Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Home, Login, NewUser, NotFound, Team, User} from './pages';



function Layout(){
  // const {user} = useSelector(state => state.user);
  const location = useLocation();

  // return user?.token ? (<Outlet/>):(
  //   <Navigate to='/login' state={{ from: location }} replace/>
  // )
}

function App() {
  // const {theme} = useSelector(state => state.theme);
  return (
    <div className='w-full min-h-[100vh]'>
      <Routes>

        {/* <Route element={<Layout/>}> */}
          <Route path='/' element={<Home />}></Route>
          <Route path='/team/:id' element={<Team />}></Route>
          <Route path='/user/:id' element={<User />}></Route>
        {/* </Route> */}

        <Route path='/createuser' element={<NewUser />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='*' element={<NotFound />}/>

      </Routes>
    </div>
  );
}

export default App;