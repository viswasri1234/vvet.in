import { useState } from "react";
import "./FundDrive.css";
// Inside src/Components/FundDrive.jsx
import { submitVvvetForm } from "../vvvetApi";
import axios from "axios";



const FundDrive = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    dob: "",
    category: "",
    pan: "",
    customCategory: "",
    images: []
  });
  const [isPanVerified, setIsPanVerified] = useState(false); // To track PAN verification status
  const [verificationError, setVerificationError] = useState(""); 
  const [panImage, setPanImage] = useState(null); // Define panImage state

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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  // const handleSubmit = () => {
  //   alert("Fundraising submission successful!");
  // };
  const handlePanImageUpload = (e) => {
    const file = e.target.files[0];
    setPanImage(file); // Store PAN image in state
  };

  
  



  // const verifyPan = async () => {
  //   try {
  //     const formDataForPan = new FormData();
  //     formDataForPan.append("pan", formData.pan);
  //     formDataForPan.append("panImage", panImage); // panImage must be a File object
  
  //     const response = await axios.post(
  //       "http://localhost:5002/api/verify-pan",
  //       formDataForPan,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         withCredentials: true, // Ensures credentials (cookies) are sent
  //       }
  //     );
  //     console.log("vathuten da punda",response.data); // Check the backend response

  //     const isValid = response.data.verified;
  //     setIsPanVerified(isValid);
  
  //     if (!isValid) {
  //       setVerificationError("PAN number and uploaded image do not match.");
  //     }
  
  //     return isValid;
  //   } catch (error) {
  //     setVerificationError("An error occurred during PAN verification.");
  //     console.error(error);
  //     return false;
  //   }
  // };

  //demoooooooooooooooooooooooooooooooooo//
  // const verifyPan = async () => {
  //   try {
  //     const formDataForPan = new FormData();
  //     formDataForPan.append("pan", formData.pan);
  //     formDataForPan.append("panImage", panImage);
  
  //     // Using the proxy path - note we removed the full URL
  //     const response = await axios.post(
  //       "/api/verify-pan",  // Just use the relative path when using a proxy
  //       formDataForPan,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  
  //     console.log("PAN verification response:", response.data);
  //     const isValid = response.data.verified;
  //     setIsPanVerified(isValid);
  
  //     if (!isValid) {
  //       setVerificationError("PAN number and uploaded image do not match.");
  //     }
  
  //     return isValid;
  //   } catch (error) {
  //     console.error("Error verifying PAN:", error);
  //     setVerificationError("An error occurred during PAN verification.");
  //     return false;
  //   }
  // };



  const verifyPan = async () => {
    try {
      // Validate PAN format client-side first
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(formData.pan)) {
        setVerificationError("Invalid PAN format. It should be in the format ABCDE1234F.");
        setIsPanVerified(false);
        return false;
      }
  
      if (!panImage) {
        setVerificationError("Please upload a PAN card image.");
        setIsPanVerified(false);
        return false;
      }
  
      const formDataForPan = new FormData();
      formDataForPan.append("pan", formData.pan);
      formDataForPan.append("panImage", panImage);
  
      // Show loading state if needed
      // setIsLoading(true);
  
      const response = await axios.post(
        "http://localhost:5002/api/verify-pan",
        formDataForPan,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Hide loading state
      // setIsLoading(false);
  
      console.log("PAN verification response:", response.data);
      
      if (response.data.verified) {
        setIsPanVerified(true);
        setVerificationError(""); // Clear any previous errors
        return true;
      } else {
        setIsPanVerified(false);
        setVerificationError(response.data.message || "PAN verification failed.");
        return false;
      }
    } catch (error) {
      // Hide loading state
      // setIsLoading(false);
      
      console.error("Error verifying PAN:", error);
      
      // Handle specific error cases
      if (error.response) {
        // The server responded with an error status
        setVerificationError(error.response.data.message || "PAN verification failed. Server returned an error.");
      } else if (error.request) {
        // The request was made but no response was received
        setVerificationError("Cannot connect to the verification service. Please try again later.");
      } else {
        // Something else caused the error
        setVerificationError("An error occurred during PAN verification.");
      }
      
      setIsPanVerified(false);
      return false;
    }
  };

  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (!isPanVerified) {
  //     const verified = await verifyPan();
  //     if (!verified) {
  //       alert("PAN not verified. Please verify before submitting.");
  //       return;
  //     }
  //   }
  
  //   try {
  //     await submitVvvetForm(formData);
  //     alert('Form submitted successfully');
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     alert('Error submitting form');
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPanVerified) {
      const verified = await verifyPan();
      if (!verified) {
        alert("PAN not verified. Please verify before submitting.");
        return;
      }
    }

    // Proceed with form submission (assuming `submitVvvetForm` is defined)
    try {
      await submitVvvetForm(formData); // Make sure this function is defined elsewhere
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };
  

  return (
    <div className="container">
      
       <div className="container-box">
       <form>
       {step === 1 && (
        <div className="step-box">
          <h4>Step 1: Personal Details</h4>

          <div className="form-grid">
            <div className="form-field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Full Name"
              />
            </div>

            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="example@domain.com"
              />
            </div>
            <div className="form-field">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
                placeholder="e.g. 25"
              />
            </div>
            <div className="form-field">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.date}
                onChange={handleInputChange}
                required
                placeholder="e.g. 25"
              />
            </div>
          </div>
          <div className="form-field">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="10-digit number"
              />
            </div>
          <div className="form-field">
            <label>PAN Number</label>
            <input
              type="text"
              name="pan"
              value={formData.pan}
              onChange={handleInputChange}
              required
              maxLength={10}
              placeholder="e.g. ABCDE1234F"
              className="input-small"
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              title="Enter valid 10-character PAN (e.g. ABCDE1234F)"
            />
          </div>
          <div className="form-field">
                <label>Upload PAN Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePanImageUpload}
                  required
                />
                {panImage && <p>{panImage.name}</p>} {/* Display image file name */}
              </div>
          {verificationError && <p style={{ color: 'red' }}>{verificationError}</p>}
          <div className="form-field">
            <button
              type="button"
              className="form-button verify-button"
              onClick={verifyPan}
              disabled={!formData.pan || !panImage}
            >
              Verify PAN
            </button>
            {isPanVerified && <p style={{ color: 'green' }}>PAN verified successfully!</p>}
          </div>
          <div className="button-group">
            <button
              type="button"
              onClick={handleNext}
              className="form-button next-button"
              disabled={!formData.name || !formData.email || !formData.phone || !formData.age || !formData.dob || !formData.pan}
            >
              Next
            </button>
          </div>
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






















