import React from 'react';
import AddUser from './Components/Users/AddUser';
import UserList from './Components/Users/UserList';
import { useState } from 'react';

function App() {
  const [userList, setUserList] = useState([])
  const addUserHandler = (dName, dAge) => {
    setUserList((prev) => {
      return [
        ...prev,
        {name: dName, age: dAge, id: Math.random().toString()}
      ]
      // return an array
    })
  }

  return (
    <div>
      <AddUser onAddUser={addUserHandler}></AddUser>
      <UserList users={userList}></UserList>
    </div>
  );
}

export default App;
