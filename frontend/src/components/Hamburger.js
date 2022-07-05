import React from 'react'

export default function Hamburger({ onClick, status }) {
    return (
        <div className={status ? "toggle active" : "toggle "} onClick={onClick} >
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}
