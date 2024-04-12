import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [value, setValue] = useState({
    id: id,
    productname: "",
    productdescription: "",
    productprice: "",
  });

  const handlechange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const getData = () => {
    axios
      .get(`http://localhost:3030/usersdata/${id}`)
      .then((res) => {
        setValue({
          ...value,
          productname: res.data.productname,
          productdescription: res.data.productdescription,
          productprice: res.data.productprice,
        });
      })
      .catch((err) => console.log(err));
  };

  const UpdateData = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3030/usersdata/${id}`, value)
      .then((res) => navigate("/"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="text-center pt-5">
        <h3>Edit your data here</h3>
      </div>
      <div className="container pt-5">
        <div className="row">
          <form onSubmit={UpdateData}>
            <div class="row">
              <div class="col">
                <label>Product Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Product name"
                  name="productname"
                  value={value.productname}
                  onChange={(e) => handlechange(e)}
                />
              </div>
              <div class="col">
                <label>Product Price</label>
                <input
                  type="number"
                  class="form-control"  
                  placeholder="Product price"
                  name="productprice"
                  value={value.productprice}
                  onChange={(e) => handlechange(e)}
                />
              </div>
            </div>
            <div class="row pt-5">
              <div class="col">
                <label>Product Description</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Product description"
                  name="productdescription"
                  value={value.productdescription}
                  onChange={(e) => handlechange(e)}
                />
              </div>
              <div class="col">
                <label>Product image</label>
                <input type="file" class="form-control" />
              </div>
              <div className="pt-3 text-center">
                <button className="btn btn-success">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
