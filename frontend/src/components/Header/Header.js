import React from 'react'
import "./Header.css"
import CancelIcon from '@mui/icons-material/Cancel';

const Header = () => {
    return (
        <div className='header'>
            <div className='header__left'>
                <a href="/">NotesApp</a>
            </div>
            <div className='header__middle'>
                <div>
                    <input type="text" placeholder='Search' />
                    <CancelIcon />
                </div>
            </div>
            <div className='header__right'>
                <img src='/image/defaultProfile.svg' alt="profile" />
            </div>
        </div>
    )
}

export default Header
