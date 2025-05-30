import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from './components/Chatbot/Chatbot';

function Layout() {

  return (
    <>
      <Navbar />
      <Outlet />
      <Chatbot /> {/* Añadir el componente Chatbot aquí */}
    </>
  )
}

export default Layout
