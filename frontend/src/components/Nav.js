import React from 'react'
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import Hamburger from './Hamburger';
export default function Nav({ handleToggle, status, position = "relative", bg = "white", col = "#000", sticky }) {

    return (
        <nav className={sticky > 183 ? 'nav sticky' : 'nav'} style={{ "--str": position, "--bg": bg, "--color": col }}>
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
            <ul className='navigation'>
                <li>
                    Home
                </li>
                <li >
                    <a href="#about" rel="noopener noreferrer">
                        About us
                    </a>
                </li>
                <li>
                    <a href="#contact" rel="noopener noreferrer">
                        Contact
                    </a>

                </li>
            </ul>
            <Hamburger onClick={handleToggle} status={status} />
        </nav>
    )
}
