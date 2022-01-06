import React, {useState, useEffect} from 'react'
import "./Header.css"
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
    const [search, setSearch] = useState("")
    const [show, setShow] = useState(false)

    const submitHandler = () => {

    }

    const toggleSearchIcon = () => {
        window.innerWidth <= 800 ? setShow(true) : setShow(false)
    }

    const closeHandler = () => {
        setSearch("")
        if (window.innerWidth <= 800) {
            setShow(true)
        }
    }

    useEffect(() => {
        toggleSearchIcon()
        window.addEventListener("resize", toggleSearchIcon)
        return () => {
            window.removeEventListener("resize", toggleSearchIcon)
        }
    }, [])

    return (
        <div className='header'>

            {window.innerWidth <= 800 && !show ? "" : (
                <div className='header__left'>
                    <a href="/">NotesApp</a>
                </div>
            )}

            <div className='header__middle'>
                {show ? <SearchIcon onClick={() => setShow(false)} /> :
                <form onSubmit={submitHandler}>
                    <input type="text" placeholder='Search' onChange={e => setSearch(e.target.value)} value={search} />
                    <CloseIcon onClick={closeHandler} />
                </form>}
            </div>
            
            <div className='header__right'>
                <img src='/image/defaultProfile.svg' alt="profile" />
            </div>

        </div>
    )
}

export default Header
