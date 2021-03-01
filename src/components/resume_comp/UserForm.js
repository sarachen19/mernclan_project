import React,{useState} from 'react';
import PersonalDetails from './PersonalDetails';
import Experience from './Experience';
import Project from './Project';
import Education from './Education';
import Success from './Success';
import Extras from './Extras';


const UserForm = () => {


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

    const submitted = () => {
        const { status } = resumeFields;
        setResumeFields({
            ...resumeFields,
            status: status + 1
        });
    };

    

    const handleChange = (evt) => {
        const value = evt.target.value;
        setResumeFields({
          ...resumeFields,
          [evt.target.name]: value
        });
    };
const { step } = resumeFields;
    switch (step) {
        case 1:
            return (
                <div className="App pt-5 mt-5">
                    <div className="container col-lg-8 mx-auto text-center">

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
                    <div className="container col-lg-8 mx-auto text-center">

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
                    <div className="container col-lg-8 mx-auto text-center">

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
                    <div className="container col-lg-8 mx-auto text-center">

                        <Education
                            values={resumeFields}
                            prevStep={prevStep}
                            /*submitted={this.submitted}*/
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
                    <div className="container col-lg-8 mx-auto text-center">

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

        case 6:

            return (
                <div className="App pt-5 mt-5">
                    <div className="container col-lg-8 mx-auto text-center">

                        <Success />
                    </div>
                    <br />
                </div>
            );

    } ;
}
 
export default UserForm;