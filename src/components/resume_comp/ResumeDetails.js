import React,{ useState, useEffect } from "react";
import axios from 'axios';
import { saveAs } from 'file-saver';
//import Success from './Success';

const ResumeDetails = ({ match, history }) => {
    const [resumeDetail, setresumeDetail] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/resume/'+match.params.id).then((response) => {
            setresumeDetail({
                  
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

                });
        });
      }, []);

      const downloadPDF = () => {
           
             const data = resumeDetail;
    
             let d = new Date();
    let dformat = `${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;

            axios.post('http://localhost:5000/api/resumeDownload/create-pdf', data)
            .then(() => axios.get('http://localhost:5000/api/resumeDownload/fetch-pdf', { responseType: 'blob' }))
                .then((res) => {
                    const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
    
                    saveAs(pdfBlob, 'Resume_'+dformat+'.pdf');
                });
                

          
      
        }
    
  return (<main role="main" class="container">
  <div className="starter-template">
  <div className="col-lg-12 mx-auto">
        <br/><br/>
        <div className="row text-center">
            <div className="w-50 mx-auto">
                <h1><b>{resumeDetail.name}</b></h1>
                <p className="lead email"><strong>Email:</strong> {resumeDetail.email}</p>
                <p className="lead"><strong>Contact:</strong> (+91){resumeDetail.phone}</p>
                { resumeDetail.linkedin && <p className="lead"><strong>LinkedIn:</strong> {resumeDetail.linkedin}</p>}
                { resumeDetail.github && <p className="lead"><strong>LinkedIn:</strong> {resumeDetail.github}</p>}

            </div>    
        </div>
      
        <hr/>
        <div className="col-lg-12 mx-auto bg-light">
              <h3><b>Skills</b></h3>
        </div>
        <div className="col-lg-12 row mx-auto">
            <p className="lead"> {resumeDetail.skills}</p>
        </div>

        
        <div className="col-lg-12 mx-auto bg-light">
              <h3><b>Experience</b></h3>
        </div>
        <div className="col-lg-12 mx-auto">
              <p className="lead"><b>{resumeDetail.exp1_org}, {resumeDetail.exp1_pos}</b> ({resumeDetail.exp1_dur})</p>
              <p className="mt-0">{resumeDetail.exp1_desc}</p>
        </div>
        <div className="col-lg-12 mx-auto">
        <p className="lead"><b>{resumeDetail.exp2_org}, {resumeDetail.exp2_pos}</b> ({resumeDetail.exp2_dur})</p>
              <p className="mt-0">{resumeDetail.exp2_desc}</p>
        </div>

        
        <div className="col-lg-12 mx-auto bg-light">
              <h3><b>Projects</b></h3>
        </div>
        <div className="col-lg-12 mx-auto">
              <p className="lead"><b>{resumeDetail.proj1_title}</b>{ resumeDetail.proj1_link && <p>({resumeDetail.proj1_link})</p>}</p>
              <p className="mt-0">{resumeDetail.proj1_desc}</p>
        </div>
        <div className="col-lg-12 mx-auto">
        <p className="lead"><b>{resumeDetail.proj2_title}</b>{ resumeDetail.proj2_link && <p>({resumeDetail.proj2_link})</p>}</p>
              <p className="mt-0">{resumeDetail.proj2_desc}</p>
        </div>


        <div className="col-lg-12 mx-auto bg-light">
              <h3><b>Education</b></h3>
        </div>
        <div className="col-lg-12 mx-auto">
              <p className="lead"><b>{resumeDetail.edu1_school}</b> ({resumeDetail.edu1_qualification}, {resumeDetail.edu1_year})</p>
              <p className="mt-0">{resumeDetail.edu1_desc}</p>
        </div>
        <div className="col-lg-12 mx-auto">
        <p className="lead">{ resumeDetail.edu2_school && <b>{resumeDetail.edu2_school}</b>} ({resumeDetail.edu2_qualification}, {resumeDetail.edu2_year})</p>
        { resumeDetail.edu2_desc && <p className="mt-0">{resumeDetail.edu2_desc}</p>}
        </div>

        <div className="col-lg-12 mx-auto bg-light">
              <h3><b>Extra-Curriculars/Activities</b></h3>
        </div>
        <div className="col-lg-12 mx-auto">
              <ul>
              { resumeDetail.extra_1 && <li><p className="lead"><b>Languages: </b>{resumeDetail.extra_1} </p></li>}
              { resumeDetail.extra_2 && <li><p className="lead"><b>Hobbies: </b>{resumeDetail.extra_2} </p></li>}
              { resumeDetail.extra_3 &&  <li><p className="lead">{resumeDetail.extra_3} </p></li>}
              { resumeDetail.extra_4 && <li><p className="lead">{resumeDetail.extra_4} </p></li>}
              { resumeDetail.extra_5 && <li><p className="lead">{resumeDetail.extra_5} </p></li>}
              </ul>
              
        </div>
        </div>
        </div>
      <div class="row mt-3">
        <div class="col text-left">
        <button type="button" className="btn btn-info" onClick={() => history.push("/resume")}><i className="fas fa-angle-left mr-1"></i>Back</button>
        </div>
    
        <div class="col text-right">
         <button type="submit" className="btn btn-info" onClick={downloadPDF}>Download PDF<i className="fas fa-download ml-1"></i></button>
      </div>
    </div>
        
        
        </main>
  );
};

export default ResumeDetails;