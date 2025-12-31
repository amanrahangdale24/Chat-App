import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import LoaderPage from "./components/Loader";
import { Toaster } from "react-hot-toast";


const App = () => {
  const { authUser,isCheckingAuth ,checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if(isCheckingAuth){
    return <LoaderPage/>; 
  }
  return (
    <div className="min-h-screen bg-zinc-900 relative flex items-center justify-center p-4 overflow-hidden">
      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to={"/"} />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
