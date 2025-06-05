import React from 'react';
import 
 {BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'

const Header = (OpenSidebar) => {
    return (
        <header className='header'>
           <div className='menu-icon'>
                <BsJustify className='icon' onClick={OpenSidebar} />
           </div>
           <div className='herder-left'>
               <BsSearch className='icon' />
           </div>
           <div className="header-right">
            {/* <BsFillBellFill className='icon' />
            <BsFillEnvelopeFill className='icon' /> */}
            <BsPersonCircle className='icon' />
           </div>
        </header>
    );
};

export default Header;