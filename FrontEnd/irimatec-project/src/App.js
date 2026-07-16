import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return ( 
       <RouterProvider  router={router}/>

  );
}

export default App;
