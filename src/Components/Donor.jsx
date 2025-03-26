import React, { useState } from 'react';
import './Donar.css';  

const Donor = () => {
  const [submitted, setSubmitted] = useState(false);
  const [images, setImages] = useState({
    aadharFront: null,
    aadharBack: null,
    medicalDoc1: null,
    medicalDoc2: null,
    medicalDoc3: null,
    medicalDoc4: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleImageChange = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prevImages) => ({
          ...prevImages,
          [name]: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="donar-form" style={{ textAlign: "center", maxWidth: "600px", margin: "auto" }}>
      

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your full name" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" id="dob" name="dob" required />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" name="age" placeholder="Enter your age" required />
          </div>

          <button type="submit" style={{ fontSize: "14px", padding: "8px 15px", marginTop: "10px" }}>
            Submit Details
          </button>
        </form>
      ) : (
        <div>
          <h2>Upload Documents</h2>
          <form>
            {["aadharFront", "aadharBack", "medicalDoc1", "medicalDoc2", "medicalDoc3", "medicalDoc4"].map((doc) => (
              <div key={doc} className="form-group" style={{ textAlign: "center" }}>
                <label htmlFor={doc}>
                  {doc.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:
                </label>
                <input
                  type="file"
                  id={doc}
                  name={doc}
                  accept="image/*"
                  onChange={handleImageChange}
                  required={doc === "aadharFront" || doc === "aadharBack" || doc === "medicalDoc1"}
                  style={{ display: "block", margin: "10px auto", width: "250px" }}
                />
                {images[doc] && (
                  <img
                    src={images[doc]}
                    alt="Preview"
                    style={{ marginTop: "10px", width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }}
                  />
                )}
              </div>
            ))}

            <button type="submit" style={{ fontSize: "14px", padding: "8px 15px", marginTop: "10px" }}>
              Submit Documents
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Donor;


