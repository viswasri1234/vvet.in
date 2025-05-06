import React, { useState } from "react";
import "./FundDrive.css";

const FundDrive = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    dob: "",
    category: "",
    customCategory: "",
    images: []
  });

  const categories = [
    "Medical Fundraising",
    "Education & Scholarships",
    "Disaster Relief &  Aid",
    "Memorial & Tribute Funds",
    "Community Development",
    "Social Causes",
    "Religious & Faith-Based Giving",
    "Crowdfunding for Needs",
    "Nonprofit & NGO Fundraising",
    "Others",
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    alert("Fundraising submission successful!");
  };

  return (
    <div className="container">
      
       <div className="container-box">
       <form>
        {step === 1 && (
            <div className="step-box">
            <h4>Step 1:Personal Details</h4>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="input-small"
              placeholder="Enter your name"
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="input-small"
              placeholder="Enter your email"
            />
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="input-small"
              placeholder="Enter phone number"
            />
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
              className="input-small"
              placeholder="Enter your age"
            />
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
              className="input-small"
            />
            <br /><br />
            <button
              type="button"
              onClick={handleNext}
              className="form-button next-button"
              disabled={!formData.name || !formData.email || !formData.phone || !formData.age || !formData.dob}
            >
              Next
            </button>
          </div>
        )}
        
        
        {step === 2 && (
           <div className="form-container-box">
            <h4>Step 2:Select a category</h4>
            {categories.map((item, index) => (
              <div key={index} className="radio-box">
                <input
                  type="radio"
                  name="category"
                  value={item}
                  checked={formData.category === item}
                  onChange={handleInputChange}
                  className="radio-input"
                />
                <label className="radio-label">{item}</label>
              </div>
            ))}
            {formData.category === "Others" && (
              <input
                type="text"
                name="customCategory"
                placeholder="Fill the category"
                value={formData.customCategory}
                onChange={handleInputChange}
                className="custom-category-input"
              />
            )}
            <div className="button-group">
              <button type="button" className="form-button back-button" onClick={handleBack}>Back</button>
              <button 
                type="button" 
                className="form-button next-button" 
                onClick={handleNext} 
                disabled={!formData.category || (formData.category === "Others" && !formData.customCategory.trim())}
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        
        {step === 3 && (
          <div className="upload-section-box">
            <h4>Step 3:Upload an Image</h4>
            <h3 className="upload-title">{formData.category === "Others" ? formData.customCategory : formData.category}</h3>
            <div className="upload-box">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
              <p className="upload-placeholder">Click or Drag & Drop to upload images</p>
            </div>
            <div className="image-preview">
              {formData.images.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt={`Proof ${index + 1}`} className="uploaded-image" />
              ))}
            </div>
            <div className="button-group">
              <button type="button" className="form-button back-button" onClick={handleBack}>Back</button>
              <button type="button" className="form-button submit-button" onClick={handleSubmit} disabled={formData.images.length === 0}>Submit</button>
            </div>
          </div>
        )}
        
      </form>
</div>
      </div>
    
    
  );
};

export default FundDrive;






















