import React,{useState }from 'react';
import Profile from './profile';
import Setting from './Setting';

export const ThemeContext = React.createContext();

export function App() {
  const [lightTheme, setTheme] = useState(true);

  function toggleTheme(){
    setTheme((prevTheme) => !prevTheme);
    console.log(lightTheme);
  }
  return (
    <ThemeContext.Provider value={lightTheme}>
      <div className="App">
        <button onClick={toggleTheme}>change Theme</button>
      </div>
      <div>
        <Profile></Profile>
        <Setting></Setting>
      </div>
    </ThemeContext.Provider>
    
  );
}

