import React, { useState } from "react";
import "./GrievanceForm.css";

const GrievanceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    category: "",
    email: "",
    mobile: "",
    gender: "",
    district: "",
    pincode: "",
    address: "",
    description: "",
    images: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      images: e.target.files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      aadhaar: "",
      category: "",
      email: "",
      mobile: "",
      gender: "",
      district: "",
      pincode: "",
      address: "",
      description: "",
      images: null,
    });
  };

  return (
    <form className="grievance-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Aadhaar Card:
        <input
          type="text"
          name="aadhaar"
          value={formData.aadhaar}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Category:
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Road">Road</option>
        </select>
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Mobile:
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Gender:
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <label>
        District:
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Pincode:
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Address:
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </label>
      <label>
        Attach Images:
        <input type="file" onChange={handleFileChange} multiple />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default GrievanceForm;
