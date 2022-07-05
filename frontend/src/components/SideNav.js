import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import ChatIcon from '@mui/icons-material/Chat';
export default function SideNav({ status, handleRemove }) {
    useEffect(() => {
        window.addEventListener("click", (e) => {
            if (e.target.className === "sidenav") {
                handleRemove();
            }
        })
    })
    const sideData = [
        { name: "Home", id: 1, icon: HomeIcon, rels: "/" },
        { name: "About Us", id: 2, path: "about", icon: InfoIcon },
        { name: "Contact Us", id: 3, path: "contact", icon: ChatIcon },
    ]

    return (
        <>
            {
                status && <div className='sidenav'>

                    <div className="wrapper">
                        <div className='logo_container'>
                            <div className="logo free">
                                <span>
                                    <div className="icon">
                                        <DirectionsCarFilledIcon />
                                    </div>
                                    <span>
                                        greenCar
                                    </span>
                                    <span>
                                        autocare
                                    </span>
                                </span>
                            </div>
                            <span>Green Car Wash</span>
                        </div>
                        <ul>
                            {
                                sideData.map((item) => <li key={item.id} onClick={handleRemove}>
                                    {
                                        item.path ? <a href={`#${item.path}`}>
                                            <item.icon className='icon' />
                                            {item.name}
                                        </a> : <Link to={`${item?.rels}`}>
                                            <item.icon className='icon' />
                                            {item.name}</Link>
                                    }


                                </li>)
                            }
                        </ul>
                    </div>
                </div>
            }
        </>

    )
}
