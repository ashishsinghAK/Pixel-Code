import React from 'react'
import * as Icons from "react-icons/vsc"
import { useLocation, NavLink } from "react-router-dom"


function SideBarLink({ link, iconName }) {
    const Icon = Icons[iconName] || Icons.VscFile;
    const location = useLocation();

   
    return (
        <div>
            <NavLink to={link.path}
            >
                <div className='flex items-center gap-2'>
                    {Icon && <Icon className="text-lg" />}
                    <span>{link.name}</span>
                </div>
            </NavLink>
        </div>
    )
}

export default SideBarLink