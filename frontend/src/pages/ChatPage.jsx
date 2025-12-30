import ActiveTabSwitch from '../components/ActiveTabSwitch';
import ChatContainer from '../components/ChatContainer';
import ChatsList from '../components/ChatsList';
import ContactList from '../components/ContactList';
import NoConversationPlaceholder from '../components/NoConversationPlaceholder';
import ProfileHeader from '../components/ProfileHeader';
import { useChatStore } from '../store/useChatStore'

const ChatPage = () => {
  const {activeTab, selectedUser} = useChatStore();

  return (
    <div className='relative w-full max-w-6xl'>
      {/* BORDER */}
      <div className="w-full flex shadow rounded-lg shadow-slate-700 flex-col md:flex-row">
        {/* LEFT SIDE */}
        <div className='w-80 bg-slate-800/50 backdrop-blur-sm flex flex-row'>
          <ProfileHeader/>
          <ActiveTabSwitch/>

          <div className='flex-1 overflow-y-auto p-4 space-y-2'>
            {activeTab === "chats" ? <ChatsList/> : <ContactList/>}
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className='flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm' >
          {selectedUser ? <ChatContainer/> : <NoConversationPlaceholder/>}
        </div>
      </div>
    </div>
  )
}

export default ChatPage
