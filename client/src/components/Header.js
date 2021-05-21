import {useState,useEffect} from 'react'
import logo from '../assets/icon.png'
import star from '../assets/star.png'
import starFilled from '../assets/star-filled.png'
import share from '../assets/share.png'
import { useParams } from 'react-router-dom';

export default function Header({socket}) {
    const [docname, setDocname] = useState('')
    const [starred, setsStarred] = useState(false)
    const { id: docId } = useParams()

    useEffect(() => {
        if (socket == null) return
    
        socket.once("load-name", name => {
            setDocname(name)
        })
    
      }, [socket, docId])

    // useEffect(() => {
    //     if (socket == null) return
    //     socket.emit('change-name',docname)
    //   }, [socket, docname,docId])

    useEffect(() => {
        const changeName = (name)=>{setDocname(name)}
        if (socket == null) return
        socket.on('receive-name',changeName)

        return ()=> {
            socket.off('receive-name',changeName)
        }
      }, [socket, docname,docId])
      
    const keyPress = (e) => {
        // var inv = document.querySelector('.titleBar div').offsetWidth;
        // var inp = document.querySelector('input[name="title"]');
        // console.log(inv);
        // inp.style.width = (inv-10) + 'px';

        socket.emit('change-name',e.target.value)
        setDocname(e.target.value)
    }
    const changeColor=()=>{
        setsStarred(prevState=>!prevState)
    }
    return (
        <nav>
            <section id="doc-head">
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
