
import React, { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [formData, setFormData] = useState({
      name: "",
    }); 
  
   const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const{getData} = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = getData(formData);
     
    console.log("Submitted Data:", formData);

  };

  return (
    <div>
      <h2>GETDATA</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="name"
          type="text"
          required
          value={formData.name} // ✅ Corrected this
          onChange={onChange}
          placeholder="Enter name here..."
        />
        <br />

        <button type="submit" className="btn btn-success">Success</button>
      </form>
    </div>
  );
};

export default SignupPage

 