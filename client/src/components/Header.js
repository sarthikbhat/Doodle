import React from 'react'
import logo from '../assets/icon.png'
import star from '../assets/star.png'
import starFilled from '../assets/star-filled.png'
import share from '../assets/share.png'

export default function Header() {
    const [docname, setDocname] = React.useState('Untitled Document')
    const [starred, setsStarred] = React.useState(false)
    const keyPress = (e) => {
        // var inv = document.querySelector('.titleBar div').offsetWidth;
        // var inp = document.querySelector('input[name="title"]');
        // console.log(inv);
        // inp.style.width = (inv-10) + 'px';
        setDocname(e.target.value)
    }
    const changeColor=()=>{
        setsStarred(prevState=>!prevState)
    }
    return (
        <nav>
            <section>
                <div className="logo-outer">
                    <img src={logo} alt="logo" />
                </div>
                <div className="titleBar">
                    <input type="text" name="title" value={docname} autoComplete='off' onChange={(e) => { keyPress(e) }} />
                    {starred?<img src={starFilled} alt="star"onClick={changeColor} />:<img src={star} onClick={changeColor} alt="star"/>}
                    <img src={share} alt="share" />
                    {/* <div>{docname}</div> */}
                </div>
            </section>
        </nav>
    )
}
