import {Route, Routes} from "react-router"; 
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";


const App = () => {
  return (
    <div className="min-h-screen bg-zinc-900 relative flex items-center justify-center p-4 overflow-hidden">
      <Routes>
        <Route path="/" element={<ChatPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
    </div>
  )
}

export default App
