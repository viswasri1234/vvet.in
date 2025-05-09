import { useState } from "react";
import "./Supporter.css";
import { submitVvvetForm } from "../vvvetApi";
import axios from "axios";

const Supporter = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    dob: "",
    pan: "",
    aadhar: "",
    accountNumber: "",
    ifsc: "",
    images: []
  });
  const [isPanVerified, setIsPanVerified] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [panImage, setPanImage] = useState(null);

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

  const handlePanImageUpload = (e) => {
    const file = e.target.files[0];
    setPanImage(file);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const verifyPan = async () => {
    try {
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

      const response = await axios.post(
        "http://localhost:5002/api/verify-pan",
        formDataForPan,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.verified) {
        setIsPanVerified(true);
        setVerificationError("");
        return true;
      } else {
        setIsPanVerified(false);
        setVerificationError(response.data.message || "PAN verification failed.");
        return false;
      }
    } catch (error) {
      if (error.response) {
        setVerificationError(error.response.data.message || "PAN verification failed. Server returned an error.");
      } else if (error.request) {
        setVerificationError("Cannot connect to the verification service. Please try again later.");
      } else {
        setVerificationError("An error occurred during PAN verification.");
      }

      setIsPanVerified(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPanVerified) {
      const verified = await verifyPan();
      if (!verified) {
        alert("PAN not verified. Please verify before submitting.");
        return;
      }
    }

    try {
      await submitVvvetForm(formData);
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
                    value={formData.dob}
                    onChange={handleInputChange}
                    required
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
                {panImage && <p>{panImage.name}</p>}
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
                  disabled={
                    !formData.name ||
                    !formData.email ||
                    !formData.phone ||
                    !formData.age ||
                    !formData.dob ||
                    !formData.pan
                  }
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-container-box">
              <h4>Step 2: Aadhar & Bank Details</h4>

              <div className="form-field">
                <label>Aadhar Number</label>
                <input
                  type="text"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleInputChange}
                  placeholder="12-digit Aadhar"
                  maxLength={12}
                  pattern="\d{12}"
                  required
                />
              </div>

              <div className="form-field">
                <label>Bank Name</label>
                <input
                  type="text"
                  name="Bank name"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="Bank name"
                />
              </div>

              <div className="form-field">
                <label>Bank Branch</label>
                <input
                  type="text"
                  name="branch name"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="Bank branch name"
                />
              </div>

              <div className="form-field">
                <label>Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="Account Number"
                />
              </div>

              <div className="form-field">
                <label>IFSC Code</label>
                <input
                  type="text"
                  name="ifsc"
                  value={formData.ifsc}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. SBIN0001234"
                  pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
                  title="Enter valid IFSC (e.g. SBIN0001234)"
                />
              </div>

              <div className="button-group">
                <button type="button" className="form-button back-button" onClick={handleBack}>
                  Back
                </button>
                <button
                  type="button"
                  className="form-button next-button"
                  onClick={handleNext}
                  disabled={
                    !formData.aadhar ||
                    !formData.accountNumber ||
                    !formData.ifsc
                  }
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="upload-section-box">
              <h4>Step 3: Upload an Image</h4>
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
                <button type="button" className="form-button back-button" onClick={handleBack}>
                  Back
                </button>
                <button
                  type="button"
                  className="form-button submit-button"
                  onClick={handleSubmit}
                  disabled={formData.images.length === 0}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Supporter;












