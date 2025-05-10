import { useState } from "react";
import "./Supporter.css";
import { submitVvvetForm } from "../vvvetApi";
import axios from "axios";
import html2canvas from "html2canvas";  // Import html2canvas

const Supporter = () => {
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
    images: [],
    paymentMethod: "" // ✅ Added payment method
  });

  const [isPanVerified, setIsPanVerified] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [panImage, setPanImage] = useState(null);
  const [aadhaarImage, setAadhaarImage] = useState(null); // ✅ Aadhaar state

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
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const handlePanImageUpload = (e) => {
    const file = e.target.files[0];
    setPanImage(file);
  };

  const handleAadhaarImageUpload = (e) => {
    const file = e.target.files[0];
    setAadhaarImage(file);
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
      console.error("Error verifying PAN:", error);
      setIsPanVerified(false);

      if (error.response) {
        setVerificationError(error.response.data.message || "PAN verification failed. Server returned an error.");
      } else if (error.request) {
        setVerificationError("Cannot connect to the verification service. Please try again later.");
      } else {
        setVerificationError("An error occurred during PAN verification.");
      }

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

    if (!formData.paymentMethod) {
      alert("Please select a payment method before submitting.");
      return;
    }

    try {
      await submitVvvetForm(formData);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  // Capture the payment section screenshot
  const capturePaymentScreenshot = async (paymentSectionId) => {
    const element = document.getElementById(paymentSectionId);
    if (element) {
      try {
        const canvas = await html2canvas(element);
        const imageData = canvas.toDataURL("image/png");
        // Here, you can save or do something with the screenshot (e.g., send it to the server)
        console.log(imageData); // For now, we just log the image data URL
        alert("Screenshot captured successfully!");
      } catch (error) {
        console.error("Error capturing screenshot:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="container-box">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="step-box">
              <h4>Step 1: Personal Details</h4>
              <div className="form-grid">
                <div className="form-field">
                  <label>Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-field">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-field">
                  <label>Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleInputChange} required />
                </div>
                <div className="form-field">
                  <label>Date of Birth</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="form-field">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>

              <div className="form-field">
                <label>PAN Number</label>
                <input type="text" name="pan" value={formData.pan} onChange={handleInputChange} required />
              </div>

              <div className="form-field">
                <label>Aadhar Number</label>
                <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleInputChange} required />
              </div>

              <div className="form-field">
                <label>Upload PAN Image</label>
                <input type="file" accept="image/*" onChange={handlePanImageUpload} required />
                {panImage && <p>{panImage.name}</p>}
              </div>

              <div className="form-field">
                <label>Upload Aadhaar Image</label>
                <input type="file" accept="image/*" onChange={handleAadhaarImageUpload} required />
                {aadhaarImage && <p>{aadhaarImage.name}</p>}
              </div>

              {verificationError && <p style={{ color: "red" }}>{verificationError}</p>}

              <div className="form-field">
                <button
                  type="button"
                  className="form-button verify-button"
                  onClick={verifyPan}
                  disabled={!formData.pan || !panImage}
                >
                  Verify PAN
                </button>
                {isPanVerified && <p style={{ color: "green" }}>PAN verified successfully!</p>}
              </div>

              <div className="button-group">
                <button type="button" onClick={handleNext} className="form-button next-button">
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="payment-method-box">
              <h4>Step 4: Select a Payment Method</h4>

              <div className="radio-box">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === "upi"}
                  onChange={handleInputChange}
                  className="radio-input"
                />
                <label className="radio-label">Pay via UPI</label>
              </div>

              <div className="radio-box">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={formData.paymentMethod === "netbanking"}
                  onChange={handleInputChange}
                  className="radio-input"
                />
                <label className="radio-label">Pay via Net Banking</label>
              </div>

              <div id="payment-upi-section">
                {formData.paymentMethod === "upi" && (
                  <div className="upi-box">
                    <a
                      href="upi://pay?pa=157511100001246@UBIN0815756.ifsc.npci&pn=Ashoka Windows and Annex Apartment Owners Association&cu=INR&am=50&tn=113 Dec 2021 fine&tr=202112113fine&refUrl=https://www.ashokawindows.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="upi-link"
                    >
                      Click to Pay via UPI
                    </a>
                    <p>Use any UPI app like Google Pay, PhonePe, Paytm, etc.</p>
                    <button
                      type="button"
                      onClick={() => capturePaymentScreenshot("payment-upi-section")}
                    >
                      Capture UPI Screenshot
                    </button>
                  </div>
                )}
              </div>

              <div id="payment-netbanking-section">
                {formData.paymentMethod === "netbanking" && (
                  <div className="netbanking-box">
                    <p>Proceed to your bank’s Net Banking portal and transfer ₹50 to:</p>
                    <ul>
                      <li>Account: <strong>Ashoka Windows and Annex Apartment Owners Association</strong></li>
                      <li>Account Number: <strong>157511100001246</strong></li>
                      <li>IFSC: <strong>UBIN0815756</strong></li>
                    </ul>
                    <p>Reference: <strong>202112113fine</strong></p>
                    <button
                      type="button"
                      onClick={() => capturePaymentScreenshot("payment-netbanking-section")}
                    >
                      Capture Net Banking Screenshot
                    </button>
                  </div>
                )}
              </div>

              <div className="button-group">
                <button type="button" className="form-button back-button" onClick={handleBack}>
                  Back
                </button>
                <button type="submit" className="form-button submit-button" disabled={!formData.paymentMethod}>
                  Submit Form
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












