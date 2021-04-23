import React, { useState } from 'react';

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = e => {
    setSearchTerm(e.target.value);
    props.filterTask(e.target.value);
  };
  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon">
          <i className="fa fa-search prefix"></i>
        </span>
      </div>
      <input type="text" 
      className="form-control"
       placeholder="Search"
       value={searchTerm}
       onChange={handleChange}
        aria-label="Username" 
        aria-describedby="basic-addon" />
    </div>
  );
};

export default Search;