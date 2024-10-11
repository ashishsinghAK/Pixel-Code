import React from 'react'
import { Link } from 'react-router-dom';

const Button = ({children,active,linkto}) => {
  return (
    <Link to={linkto}>
    <div className={`text-center text-[1rem]  py-2 rounded-md font-bold
        ${active ? "bg-yellow-500 text-black": "bg-slate-800" } hover:scale-95
        transition-all duration-200  w-[12em]`}>
        {children}
     </div>
    </Link>
  )
}

export default Button;
