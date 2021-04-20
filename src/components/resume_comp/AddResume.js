
import UserForm from './UserForm';

const AddResume = ({ match }) => {
  const id = match && match.params.id ? match.params.id : undefined
  
    return (  <div>
        <div className="col-lg-8 mx-auto text-center mt-5">
          <h1><b>Let's {id ? 'update' : 'generate'} your Resume!</b></h1>
          <p className="lead">Please provide accurate description</p>
          <hr />
        </div>  
        <UserForm formStatus={id}/>
      </div>   );
}
 
export default AddResume;