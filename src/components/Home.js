import '../components/Home.css';
import React from 'react';
import { useHistory } from "react-router-dom";

const Home = () => {

    const history = useHistory();
  
    const handleRoute = () =>{ 
      history.push("/login");
    }

     
    const registerRoute = () =>{ 
        history.push("/register");
      }

    return (
        <div>
        <div className = "title">
        <h1>NoteWorks!!!! </h1>
        </div>
        <div className = "title">
        <h1>The place where you note everything</h1>
        </div>
        <div className = "title chaddar">
        <button type="button" class="btn btn-primary" onClick={handleRoute}>LogIn</button>
        <button type="button" class="btn btn-primary" onClick={registerRoute}>Sign up Now</button>
        </div>
        </div>
    
    );
}
 
export default Home;