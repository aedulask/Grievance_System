import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FileNewGrievance.css";

const FileNewGrievance = ({ token }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    gmail: "",
    mobile: "",
    district: "",
    pincode: "",
    address: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Please login to file grievance.");
      return;
    }

    const fd = new FormData();
    Object.keys(form).forEach((k) => {
      if (form[k]) fd.append(k, form[k]);
    });
    if (imageFile) fd.append("image", imageFile);

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/grievances/create", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      // Redirect to citizen dashboard -> completed grievances page
      navigate("/citizen/completed"); 
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.error || "Submission failed");
    }
  };

  return (
    <div className="grievance-page">
      <h2>File New Grievance</h2>

      <div className="grievance-container">
        <form className="grievance-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="gmail"
              value={form.gmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>District</label>
            <input
              type="text"
              name="district"
              value={form.district}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Pincode</label>
            <input
              type="text"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <input type="file" accept="image/*" onChange={handleFile} />
          </div>

          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
          {error && <p className="form-error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default FileNewGrievance;
