import { useChatStore } from "../store/useChatStore"

const ActiveTabSwitch = () => {
  const {activeTab, setActiveTab} = useChatStore(); 

  return (
    <div className="flex justify-between tabs tabs-box bg-transparent p-2 m-2">
      <button
      onClick={()=>setActiveTab("chats")}
      className={`tab ${
          activeTab === "chats" ? "bg-cyan-500/20 text-cyan-400 w-1/2" : "text-slate-400 w-1/2"
        }`}
      >
        Chats
      </button>
      
      <button
      onClick={()=>setActiveTab("contacts")}
      className={`tab ${
          activeTab === "contacts" ? "bg-cyan-500/20 text-cyan-400 w-1/2" : "text-slate-400 w-1/2"
        }`}
      >
        Contacts
      </button>
      
    </div>
  )
}

export default ActiveTabSwitch
