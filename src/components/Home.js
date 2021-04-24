import '../components/Home.css';
import React, { useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import ImageSlider from './ImageSlider';
import Aos from "aos";
import "aos/dist/aos.css"
import {SliderData} from '../components/SliderData';
import AuthContext from '../contexts/AuthContext';


const Home = () => {

  const auth = useContext(AuthContext);
    useEffect(() => {
      Aos.init({duration:2000});
    },[])
    const history = useHistory();
  
    const handleRoute = () =>{ 
      history.push("/login");
    }

     
    const registerRoute = () =>{ 
        history.push("/register");
    }

    const journalRoute = () =>{ 
      history.push("/journal");
  }

  const taskRoute = () =>{ 
    history.push("/task");
}

const noteRoute = () =>{ 
  history.push("/note");
}

const jobRoute = () =>{ 
  history.push("/job-application");
}

const resumeRoute = () =>{ 
  history.push("/resume");
}
  

    return (
        <div className="home">
        <div className = "title">
        <h1>Noteworks!!!! </h1>
        </div>
        <div className = "title">
        <h1>The place where you note everything</h1>
        </div>
        {auth.isLoggedIn ? null : (
        <div className = "title chaddar">
        <button type="button" class="btn btn-primary" onClick={handleRoute}>LogIn</button>
        <button type="button" class="btn btn-primary" onClick={registerRoute}>Register</button>
        </div>)}

        <ImageSlider slides={SliderData}></ImageSlider>
        {/* <SlideShow/> */}
        <div className = "trans">
           <h1>Comprehensive underneath,</h1> 
           <h1>simple on the surface</h1>
           <h3>Take a tour of our contents</h3>
        </div >
        
        {auth.isLoggedIn ? (  
      <div>
        <div className ="wp-block-columns columns-3">        
        <div data-aos="fade-left" className ="wp-block-column-jr">
         <h3>Journal!!</h3>   
         <p>Want to add a journal?</p>           
        <button type="button" class="btn btn-primary" onClick={journalRoute}>Add</button>
        </div>
        <div data-aos="flip-left"className ="wp-block-column">
        <h3>Task!!</h3>   
        <p>Want to add a task?</p> 
        <button type="button" class="btn btn-primary" onClick={taskRoute}>Add</button>
        </div>
        <div data-aos="fade-right" className ="wp-block-column">
        <h3>Note!!</h3>   
        <p>Want to add a note?</p>    
        <button type="button" class="btn btn-primary" onClick={noteRoute}>Add</button>
        </div>
        </div>

        <div className ="wp-block-columns columns-3">
        <div data-aos="fade-left" className ="wp-block-column-jr">
         <h3>Resume!!</h3>   
         <p>Want to add a Resume?</p>           
        <button type="button" class="btn btn-primary" onClick={resumeRoute}>Add</button>
        </div>
        <div data-aos="fade-right" className ="wp-block-column-job">
        <h3>Job Application!!</h3>   
        <p>Want to add for job application?</p> 
        <button type="button" class="btn btn-primary" onClick={jobRoute}>Apply</button>
        </div>
        </div>
        </div> ) : (

<div>
<div className ="wp-block-columns columns-3">        
<div data-aos="fade-left" className ="wp-block-column-jr">
 <h3>Journal!!</h3>   
 <p>Want to add a journal?</p>           
<button type="button" class="btn btn-primary" onClick={handleRoute}>Add</button>
</div>
<div data-aos="flip-left"className ="wp-block-column">
<h3>Task!!</h3>   
<p>Want to add a task?</p> 
<button type="button" class="btn btn-primary" onClick={handleRoute}>Add</button>
</div>
<div data-aos="fade-right" className ="wp-block-column">
<h3>Note!!</h3>   
<p>Want to add a note?</p>    
<button type="button" class="btn btn-primary" onClick={handleRoute}>Add</button>
</div>
</div>

<div className ="wp-block-columns columns-3">
<div data-aos="fade-left" className ="wp-block-column-jr">
 <h3>Resume!!</h3>   
 <p>Want to add a Resume?</p>           
<button type="button" class="btn btn-primary" onClick={handleRoute}>Add</button>
</div>
<div data-aos="fade-right" className ="wp-block-column-job">
<h3>Job Application!!</h3>   
<p>Want to add for job application?</p> 
<button type="button" class="btn btn-primary" onClick={handleRoute}>Apply</button>
</div>
</div>
</div> )

        }
        </div>
    
    );
}
 
export default Home;