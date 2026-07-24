import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Streamify() {
  const [isScrolled, setScrolled] = useState(false);

  window.onscroll = ()=>{
    setScrolled(window.pageYOffset === 0 ? false : true);
    return ()=> (window.onscroll =null);
  };


  return (
    <div>
      <Navbar isScrolled={isScrolled} />
    </div>
  )
};

