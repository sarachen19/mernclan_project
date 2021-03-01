
import UserForm from '../components/resume_comp/UserForm';

const Resume = () => {

  return (  <div>
    <div className="col-lg-8 mx-auto text-center mt-5">
      <h1><b>Let's generate your Resume!</b></h1>
      <p className="lead">Please provide accurate description</p>
      <hr />
    </div>  
    <UserForm/>
  </div>   );
}
 
export default Resume;