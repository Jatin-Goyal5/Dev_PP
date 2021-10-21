import React ,{useState,useEffect}from 'react'
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { firebaseDB } from '../config/config';
import  './header.css';
const Header = ()=>{
    const currentUser = useContext(AuthContext);
    const [profileImage, setprofileImage] = useState("")
    useEffect(async() => {
        
            let doc = await firebaseDB.collection("users").doc(currentUser.uid).get();
            let user = doc.data();
            console.log(user);
            let imageUrl = user != null ?user.profileImageUrl :"";
            console.log(imageUrl);
            setprofileImage(imageUrl)
        

        
        
    }, [])
    return (
        <div className ="app_header">
            <img src = "https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""></img>
            {/* <div className="userImage">
                <img src={`${profileImage}`}></img>
            </div> */}
            
        </div>
    );
}

export default Header;