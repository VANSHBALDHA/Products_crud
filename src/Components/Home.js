import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:3030/usersdata")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  };

  const removeData = (id) => {
    axios
      .delete(`http://localhost:3030/usersdata/${id}`)
      .then((res) => getData())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <>
      <div className="text-center pt-5">
        <h4>React-Json-CRUD</h4>
      </div>
      <div className="container pt-5">
        <div className="pb-2 text-end">
          <button
            className="btn btn-outline-dark"
            onClick={() => navigate("/add")}
          >
            Add
          </button>
        </div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">image</th>
              <th scope="col">description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((datas, index) => (
              <>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{datas?.productname}</td>
                  <td>{datas?.productprice}</td>
                  <td>{datas?.image}</td>
                  <td>{datas?.productdescription}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => navigate(`/edit/${datas.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-dark ms-3"
                      onClick={() => navigate(`/view/${datas.id}`)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-danger ms-3"
                      onClick={() => removeData(datas.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
