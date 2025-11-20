import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

export default function Header() {

  const [open, setOpen] = useState(false); 

  const styles = {
    header: {
      padding: "25px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#FFFFFF",
    },
    headering: {
      color: "black",
      fontSize:"20px",
      margin: 0,
    },
    link: {
      color: "black",
      textDecoration: "none",
      fontSize: "16px",
      fontFamily:"Intel One Mono",
    },
  };

  return (
    <>
      <header style={styles.header}>
        <h1 style={styles.headering}><b><i>Blog media</i></b></h1>

        
        <nav className='hidden md:flex gap-10'>
          <a href="#" style={styles.link}><i>Home</i></a>
          <a href="#" style={styles.link}><i>About</i></a>
          <a href="#" style={styles.link}><i>Contact</i></a>
        </nav>
        
        
        <div className="md:hidden text-2xl cursor-pointer" onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </header>

     
      {open && (
        <div className=" md:hidden">
          
          <div className="w-full h-full bg-white p-6 shadow transform translate-x-0 transition-all">

            <div className="text-2xl mb-6 cursor-pointer" onClick={() => setOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </div>

            
            <div className="flex flex-col items-end  gap-6">
              <a href="#" className="text-lg" onClick={() => setOpen(false)}>Home</a>
              <a href="#" className="text-lg" onClick={() => setOpen(false)}>About</a>
              <a href="#" className="text-lg" onClick={() => setOpen(false)}>Contact</a>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

 
