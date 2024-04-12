import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState({
    productname: "",
    productdescription: "",
    productprice: "",
  });

  const [image, setImage] = useState("");

  const handlechange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleImagechange = (e) => {
    console.log(e.target.value);
    setImage(e.target.value[0]);
  };

  const handesubmit = (e) => {
    e.preventDefault();

    if (
      !value.productname ||
      !value.productprice ||
      !value.productdescription
    ) {
      alert("Please fill all fields");
    } else {
      axios
        .post("http://localhost:3030/usersdata", value)
        .then(() => console.log("success!"))
        .catch((err) => console.log(err));
      setValue({
        productname: "",
        productdescription: "",
        productprice: "",
      });
      navigate("/");
    }
  };

  return (
    <>
      <div className="text-center pt-5">
        <h3>Add your data here</h3>
      </div>
      <div className="container pt-5">
        <div className="row">
          <form onSubmit={handesubmit}>
            <div className="row">
              <div className="col">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product name"
                  name="productname"
                  onChange={handlechange}
                />
              </div>
              <div className="col">
                <label>Product Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Product price"
                  name="productprice"
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className="row pt-5">
              <div className="col">
                <label>Product Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product description"
                  name="productdescription"
                  onChange={handlechange}
                />
              </div>
              <div className="col">
                <label>Product image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImagechange}
                />
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

export default Add;
