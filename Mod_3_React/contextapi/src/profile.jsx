import React , {useContext} from 'react';
import {ThemeContext} from './App';



const Profile = ()=>{
    const theme = useContext(ThemeContext);

    const styles ={
        backgroundColor:theme?"black":"lightgray",
        color :theme?"white":"black",
        padding:"2rem"        
    };
    return (
        <div style={styles}>Profile Component</div>
    );
}

export default Profile;