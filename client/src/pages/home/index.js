import React from 'react'
import ChatArea from './components/ChatArea'
import UserSearch from './components/UserSearch'
import UsersList from './components/UsersList';

function Home() {
  const [searchKey, setSearchKey] = React.useState("");  
  return (
    <div className='flex gap-5'>
    {/* First Part  userSearch, userList/chatList */}
    <div className='w-96'>
    <UserSearch 
    searchKey={searchKey}
    setSearchKey={setSearchKey}
    />

    <UsersList
    searchKey = {searchKey}
    />
    </div>
    
    {/* Second Part : Chatbox, ChatArea */}
    <div>
    <ChatArea />  
    </div>
    </div>
  )
}

export default Home
