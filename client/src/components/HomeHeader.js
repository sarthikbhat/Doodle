import { useState } from 'react'
import logo from '../assets/icon.png'

export default function HomeHeader() {
    const [search, setSearch] = useState('')

    const keyPress = (e) => {
        setSearch(e.target.value)
    }

    return (
        <nav>
            <section>
                <div className='right'>
                    <div className="logo-outer">
                        <img src={logo} alt="logo" />
                    </div>
                    <p>Doodle</p>
                <div style={{ flex: 1 }} />
                    <div className="avatar-sm">
                    SB
                </div>
                </div>
                <div style={{ flex: 1 }} />
                <div className="searchBar">
                    <input type="text" name="title" placeholder='Search' value={search} autoComplete='off' onChange={(e) => { keyPress(e) }} />
                </div>
                <div style={{ flex: 1 }} />
                <div className="avatar">
                    SB
                </div>
            </section>
        </nav>
    )
}
