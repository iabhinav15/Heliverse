import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {Home, NewUser, NotFound, Team, User} from './pages';


function App() {

  return (
    <div className='w-full min-h-[100vh]'>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/team/:id' element={<Team />}></Route>
        <Route path='/user/:id' element={<User />}></Route>
        <Route path='/createuser' element={<NewUser />}/>
        <Route path='*' element={<NotFound />}/>

      </Routes>
    </div>
  );
}

export default App;