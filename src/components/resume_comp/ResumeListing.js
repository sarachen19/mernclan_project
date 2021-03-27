import React from "react";
import { NavLink, Link } from "react-router-dom";


const ResumeListing = () => {
    return (  
        <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>
              <button
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>
              <button
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            <td>
              <button
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );

  };

export default ResumeListing;