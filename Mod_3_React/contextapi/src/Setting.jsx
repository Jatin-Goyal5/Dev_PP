import React , {useContext} from 'react';
import {ThemeContext} from './App';

const Setting = ()=>{
    const theme = useContext(ThemeContext);

    const styles ={
        backgroundColor:theme?"lightgray":"black",
        color:theme?"black":"white",
        padding:"2rem"        
    };
    return (
        <div style={styles}>Setting Component</div>
    );
}

export default Setting;