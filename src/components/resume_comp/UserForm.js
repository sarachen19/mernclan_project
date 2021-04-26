import React,{useState,useEffect} from 'react';
import PersonalDetails from './PersonalDetails';
import Experience from './Experience';
import Project from './Project';
import Education from './Education';
import axios from 'axios';
import {Redirect } from "react-router-dom";
import apiService from '../apiService';
import { API_Types_Enum } from "../DataConstants";
//import Success from './Success';
import Extras from './Extras';


const UserForm = (props) => {
    const { formStatus } = props;
    const [isRedirect, setRedirect] = useState(false);
    const [isAddResLoading, setIsAddResLoading] = useState(false);
    const [addReserror, setaddResError] = useState();
   

    const [resumeFields,setResumeFields]=useState(
        {
            step: 1,
            name: '',
            email: '',
            phone: '',
            linkedin: '',
            github: '',
            skills: '',
    
            exp1_org: '',
            exp1_pos: '',
            exp1_desc: '',
            exp1_dur: '',
    
            exp2_org: '',
            exp2_pos: '',
            exp2_desc: '',
            exp2_dur: '',
    
            proj1_title: '',
            proj1_link: '',
            proj1_desc: '',
    
            proj2_title: '',
            proj2_link: '',
            proj2_desc: '',
    
            edu1_school: '',
            edu1_year: '',
            edu1_qualification: '',
            edu1_desc: '',
    
            edu2_school: '',
            edu2_year: '',
            edu2_qualification: '',
            edu2_desc: '',
            
            extra_1: '',
            extra_2: '',
            extra_3: '',
            extra_4: '',
            extra_5: '',
    
            status: 0
        }
      );

    useEffect(() => {
        if(formStatus !== undefined)
{
    // get api call on edit resume
apiService("/api/resume/"+formStatus,
      null,
      API_Types_Enum.get,
      (response) => setResumeFields({
        step: 1,
    name: response.data.name,
    email: response.data.email,
    phone: response.data.phone,
    linkedin: response.data.linkedin,
    github: response.data.github,
    skills: response.data.skills,
    exp1_org: response.data.experience[0].organization,
    exp1_pos: response.data.experience[0].position,
    exp1_desc: response.data.experience[0].description,
    exp1_dur: response.data.experience[0].duration,
    exp2_org: response.data.experience[1].organization,
    exp2_pos: response.data.experience[1].position,
    exp2_desc: response.data.experience[1].description,
    exp2_dur: response.data.experience[1].duration,
    proj1_title: response.data.project[0].title,
    proj1_link: response.data.project[0].link,
    proj1_desc:response.data.project[0].description,
    proj2_title: response.data.project[1].title,
    proj2_link: response.data.project[1].link,
    proj2_desc: response.data.project[1].description,
    edu1_school: response.data.education[0].school,
    edu1_year: response.data.education[0].year,
    edu1_qualification: response.data.education[0].qualification,
    edu1_desc: response.data.education[0].description,
    edu2_school: response.data.education[1].school,
    edu2_year: response.data.education[1].year,
    edu2_qualification: response.data.education[1].qualification,
    edu2_desc: response.data.education[1].description,
    extra_1: response.data.extra[0].title,
    extra_2: response.data.extra[1].title,
    extra_3: response.data.extra[2].title,
    extra_4: response.data.extra[3].title,
    extra_5: response.data.extra[4].title,
    status: 0,
    id:response.data._id
      }),
      (err) => console.log(err));
    }
      }, []);

      
     // next button function

      const nextStep = () => {
        const { step } = resumeFields;
        setResumeFields({
            ...resumeFields,
            step: step + 1
        });
    };

    // Go back to prev step
    const prevStep = () => {
        const { step } = resumeFields;
        setResumeFields({
            ...resumeFields,
            step: step - 1
        });
    };
//submit button function
    const submitted = () => {
        
            addResume(resumeFields);
    };

    
    const addResume = async(resumedata) => {
  

    let data = resumedata;
    try {
        if(resumeFields.id)
        {
           //update api call with put method
            setIsAddResLoading(true);
            apiService("/api/resume",
            data,
                API_Types_Enum.put_with_auth,
                (response) => {console.log('resume updated');
                setIsAddResLoading(false);
                setaddResError(null);
                setRedirect(true)},
                (err) => {
                    setIsAddResLoading(false);
     
      let error_message="";
      err.response.data.errors.map((error)=> 
(
    error_message += error.msg+"\n"
   
 )
)
                    setaddResError(error_message);
                });
            
        }else{
            //post api call with post method
            setIsAddResLoading(true);
            apiService("/api/resume",
            data,
                API_Types_Enum.post_with_auth,
                (response) => {console.log('resume added');
                setIsAddResLoading(false);
                setaddResError(null);
                setRedirect(true)},
                (err) => {setIsAddResLoading(false);
     
      let error_message="";
      err.response.data.errors.map((error)=> 
(
    error_message += error.msg+"\n"
   
 )
)
                    setaddResError(error_message);});
        }
            
              
        
        console.log(resumedata);
      
    } catch (e) {
      console.log(e.response.data.errors);
    }
    };

    
//redirection logic
    if(isRedirect){
        console.log('Redirecting..')
        return <Redirect to='/resume' />
      }

      //handlechange function
    const handleChange = (evt) => {
        const value = evt.target.value;
        setResumeFields({
          ...resumeFields,
          [evt.target.name]: value
        });
    };
    //multi-step form structure
const { step } = resumeFields;
    switch (step) {
        case 1:
            return (
                <div className="App pt-5 mt-5">
                    <div className="container col-lg-10 mx-auto text-center">

                        <PersonalDetails
                            values={resumeFields}
                            nextStep={nextStep}
                            handleChange={handleChange}
                        />
                    </div>
                    <br />
                </div>
            );

        case 2:

            return (
                <div className="App pt-5 mt-5">
                    <div className="container col-lg-10 mx-auto text-center">

                        <Experience
                            values={resumeFields}
                            prevStep={prevStep}
                            nextStep={nextStep}
                            handleChange={handleChange}
                        />
                    </div>
                    <br />
                </div>
            );

        case 3:

            return (
                <div className="App pt-5 mt-5">
                    <div className="container col-lg-10 mx-auto text-center">

                        <Project
                            values={resumeFields}
                            prevStep={prevStep}
                            nextStep={nextStep}
                            handleChange={handleChange}
                        />
                    </div>
                    <br />
                </div>
            );

        case 4:

            return (
                <div className="App pt-5 mt-5">
                    <div className="container col-lg-10 mx-auto text-center">

                        <Education
                            values={resumeFields}
                            prevStep={prevStep}
                            nextStep={nextStep}
                            handleChange={handleChange}
                        />
                    </div>
                    <br />
                </div>
            );


        case 5:

            return (
                <div className="App pt-5 mt-5">
                    <div className="container col-lg-10 mx-auto text-center">
                    {isAddResLoading && <div className="alert alert-info regLabel"><strong>Loading...</strong></div>}
        {addReserror && <div className="alert alert-danger regLabel">{addReserror}</div>}
                        <Extras
                            values={resumeFields}
                            prevStep={prevStep}
                            nextStep={nextStep}
                            submitted={submitted}
                            handleChange={handleChange}
                        />
                    </div>
                    <br />
                </div>
            );

      
    } ;
}
 
export default UserForm;