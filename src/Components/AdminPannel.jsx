import React, { useEffect, useState } from 'react'
import "../Style/AdminPanel.css"
import { Button, Typography } from '@mui/material'
import { AiOutlineProject } from 'react-icons/ai';
import {FaYoutube} from "react-icons/fa"
import {MdTimeline} from "react-icons/md"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {logout, updateUser} from "../actions/user"
import { useAlert } from 'react-alert';

const AdminPannel = () => {
    const dispatch = useDispatch();
    const  alert = useAlert()
    const {message:loginMessage} = useSelector(state=> state.login)
    const {message, error, loading} = useSelector(state=> state.update)


     
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] =useState("")
    const [skills, setSkills] = useState({});
    const [about,setAbout] = useState({})

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(updateUser(name, email, password, skills, about));
        console.log(name, email, password, skills, about)

    }

    const logoutHandler = (e)=>{
       dispatch(logout())
        
    }

    const handleAboutImage = (e)=>{
        const Reader = new FileReader();
        Reader.readAsDataURL(e.target.files[0]);

        Reader.onload=()=>{
            if(Reader.readyState===2){
                setAbout({...about, avatar:Reader.result});
                
            }
        }
    }

    
    const handleImages = (e, val)=>{
        const Reader = new FileReader();
        Reader.readAsDataURL(e.target.files[0]);

        Reader.onload=()=>{
            if(Reader.readyState===2){
                if(val===1){
                    setSkills({...skills, image1:Reader.result})
                }

                if(val===2){
                    setSkills({...skills, image2:Reader.result})
                }

                if(val===3){
                    setSkills({...skills, image3:Reader.result})
                }

                if(val===4){
                    setSkills({...skills, image4:Reader.result})
                }

                if(val===5){
                    setSkills({...skills, image5:Reader.result})
                }

                if(val===6){
                    setSkills({...skills, image6:Reader.result})
                }
            }
        }
    }


    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch({type:"CLEAR_ERROR"})
        }
        
        if(message){
            alert.success(message)
            dispatch({type:"CLEAR_MESSAGE"});

        }
        if(loginMessage){
            alert.success(loginMessage)
            dispatch({type:"CLEAR_MESSAGE"});

        }
    }, [alert,error,message, dispatch, loginMessage])


    return (
        <div className='adminPanel'>
            <div className='adminPanelContainer'>
            <Typography variant='h4'>
                    <p>A</p>
                    <p>D</p>
                    <p>M</p>
                    <p>I</p>
                    <p style={{marginRight: "1vmax"}} >N</p>


                    <p>P</p>
                    <p>A</p>
                    <p>N</p>
                    <p>E</p>
                    <p>L</p>
                </Typography>

                <form onSubmit={submitHandler}>
                    <input type="text" className='adminPanelInput' placeholder='Name' value={name} onChange={(e)=>setName(e.target.valueAsDate)} />

                    <input type="email" className='adminPanelInput' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.valueAsDate)} />

                    <input type="password" className='adminPanelInput' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.valueAsDate)} />


                    <div className='adminPanelSkills'>
                        <div>
                            <Typography>SKILL : 1</Typography>
                            <input type="file" className='adminPanelUpload' onChange={(e)=>handleImages(e,1)} accept="image/*"/>
                        </div>

                        <div>
                            <Typography>SKILL : 2</Typography>
                            <input type="file" className='adminPanelUpload' onChange={(e)=>handleImages(e,2)} accept="image/*"/>
                        </div>

                        <div>
                            <Typography>SKILL : 3</Typography>
                            <input type="file" className='adminPanelUpload' onChange={(e)=>handleImages(e,3)} accept="image/*"/>
                        </div>

                        <div>
                            <Typography>SKILL : 4</Typography>
                            <input type="file" className='adminPanelUpload' onChange={(e)=>handleImages(e,4)} accept="image/*"/>
                        </div>

                        <div>
                            <Typography>SKILL : 5</Typography>
                            <input type="file" className='adminPanelUpload' onChange={(e)=>handleImages(e,5)} accept="image/*"/>
                        </div>

                        <div>
                            <Typography>SKILL : 6</Typography>
                            <input type="file" className='adminPanelUpload' onChange={(e)=>handleImages(e,6)} accept="image/*"/>
                        </div>
                    </div>

                    <div className="adminPanelAbout">
                        <fieldset>
                            <legend>About</legend>
                            <input type='text' className='adminPanelInput' placeholder='Name' value={about.name} onChange={(e)=>setAbout({...about, name:e.target.value})}/>

                            <input type='text' className='adminPanelInput' placeholder='Title' value={about.title} onChange={(e)=>setAbout({...about, title:e.target.value})}/>

                            <input type='text' className='adminPanelInput' placeholder='Subtitle' value={about.subtitle} onChange={(e)=>setAbout({...about, subtitle:e.target.value})}/>

                            <input type='text' className='adminPanelInput' placeholder='Description' value={about.description} onChange={(e)=>setAbout({...about, description:e.target.value})}/>

                            <input type='text' className='adminPanelInput' placeholder='Quote' value={about.quote} onChange={(e)=>setAbout({...about, quote:e.target.value})}/>

                            <input type='file' className="adminPanelUpload"  placeholder='Choose Avatar'  onChange={handleAboutImage} accept='image/*'/>
                        </fieldset>
                    </div>

                    <Link to="/admin/timeline">
                        TIMELINE <MdTimeline />
                    </Link>
                    <Link to="/admin/youtube">
                        YOUTUBE <FaYoutube />
                    </Link>
                    <Link to="/admin/project">
                        PROJECTS < AiOutlineProject/>
                    </Link>

                    <Button type="submit" variant="contained" disabled= {loading} >Update</Button>
                </form>

                <Button variant='contained' color='error' style={{display:"block", margin:"4vmax auto"}} onClick={logoutHandler}>LOGOUT</Button>
            </div>
        </div>
    )
}

export default AdminPannel
