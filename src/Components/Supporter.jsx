import React, { useState } from "react";
import "./Supporter.css";

const Supporter = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    dob: "",
    aadharFront: null,
    aadharBack: null,
    paymentMethod: "",
    paymentScreenshot: null,
  });

  const [showPaymentScreenshot, setShowPaymentScreenshot] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const nextStep = () => {
    if (isValid()) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const isValid = () => {
    if (step === 1) {
      return formData.name && formData.email && formData.phone && formData.age && formData.dob;
    }
    if (step === 2) {
      return formData.aadharFront && formData.aadharBack;
    }
    if (step === 3) {
      return formData.paymentMethod;
    }
    if (step === 4 && formData.paymentMethod === "UPI") {
      return formData.paymentScreenshot;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log("Submitting Form Data:", formData);
      setTimeout(() => {
        alert("Form Submitted Successfully!");
        setIsSubmitting(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          age: "",
          dob: "",
          aadharFront: null,
          aadharBack: null,
          paymentMethod: "",
          paymentScreenshot: null,
        });
      }, 2000);
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleUPIPayment = () => {
    const upiUrl =
      "upi://pay?pa=157511100001246@UBIN0815756.ifsc.npci&pn=Ashoka%20Windows%20and%20Annex%20Apartment%20Owners%20Association&cu=INR&am=50&tn=113%20Dec%202021%20fine&tr=202112113fine&refUrl=https%3A%2F%2Fwww.ashokawindows.com";
    
    // Open the UPI payment app
    window.location.href = upiUrl;

    // Immediately show the upload screenshot field after clicking Pay via UPI
    setShowPaymentScreenshot(true);
  };

  const handleNetBankingPayment = () => {
    // Placeholder for actual Net Banking redirection or API call
    alert("Redirecting to Net Banking Payment Gateway...");
  };

  return (
    <div className="supporter-container">
       <div className="step-box">  
        <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="step1-box">
            <h4>Step 1:Personal Details</h4>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-small"
              placeholder="Enter your name"
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-small"
              placeholder="Enter your email"
            />
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input-small"
              placeholder="Enter phone number"
            />
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="input-small"
              placeholder="Enter your age"
            />
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="input-small"
            />
            <br />
            <br />
            <button
              type="button"
              onClick={nextStep}
              disabled={!isValid()}
              className="form-button next-button"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step2-box">
            <h4>Step 2:Upload a Images</h4>
            <label>Aadhar Card Front:</label>
            <input
              type="file"
              name="aadharFront"
              onChange={handleChange}
              required
              className="input-small"
            />
            <label>Aadhar Card Back:</label>
            <input
              type="file"
              name="aadharBack"
              onChange={handleChange}
              required
              className="input-small"
            />
            <br />
            <br />
            <button
              type="button"
              onClick={prevStep}
              className="form-button back-button"
            >
              Back
            </button>
            <div style={{ marginTop: "10px" }}>
              <button
                type="button"
                onClick={nextStep}
                disabled={!isValid()}
                className="form-button next-button"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step3-box">
            <h4>Step 3:Select Payment Method</h4>
            <label>Payment Method:</label>
            <select
              name="paymentMethod"
              
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className="input-small"
             
            >
              
              <option value="UPI">Pay by any UPI App</option>
              <option value="Net Banking">Net Banking</option>
            </select>
            <br />
            <br />
            <button
              type="button"
              onClick={prevStep}
              className="form-button back-button"
            >
              Back
            </button>
            <div style={{ marginTop: "10px" }}>
              <button
                type="button"
                onClick={nextStep}
                disabled={!isValid()}
                className="form-button next-button"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 4 && formData.paymentMethod === "UPI" && (
          <div className="step4-box">
            <h4>Step 4:Pay via UPI</h4>
            <br></br>
            <br></br>
            <button
              type="button"
              onClick={handleUPIPayment}
              className="form-button upi-button"
            >
              Pay via UPI
            </button>
            {/* Upload screenshot field appears after Pay via UPI is clicked */}
            {showPaymentScreenshot && (
              <div className="payment-screenshot">
                <label>Upload Payment Screenshot:</label>
                <input
                  type="file"
                  name="paymentScreenshot"
                  onChange={handleChange}
                  required
                  className="input-small"
                />
              </div>
            )}
            <br />
            <br />
            <button
              type="button"
              onClick={prevStep}
              className="form-button back-button"
            >
              Back
            </button>
            <div style={{ marginTop: "10px" }}>
            <button
                 type="submit"
                 disabled={isSubmitting || !formData.paymentScreenshot}
                className="form-button submit-button"
                   >
                   {isSubmitting ? "Submitting..." : "Submit"}
               </button>
            </div>
          </div>
        )}

        {step === 4 && formData.paymentMethod === "Net Banking" && (
          <div className="step4-box">
            <h4>Step 4:Pay via Net banking</h4>
            <br></br>
            <br></br>
            {/* Net Banking - Redirection or Process */}
            <button
              type="button"
              onClick={handleNetBankingPayment}
              className="form-button net-banking-button"
            >
              Pay via Net Banking
            </button>
            {/* Upload screenshot field appears after Pay via Net Banking is clicked */}
            {showPaymentScreenshot && (
              <div className="payment-screenshot">
                <label>Upload Payment Screenshot:</label>
                <input
                  type="file"
                  name="paymentScreenshot"
                  onChange={handleChange}
                  required
                  className="input-small"
                />
              </div>
            )}
            <br />
            <br />
            <button
              type="button"
              onClick={prevStep}
              className="form-button back-button"
            >
              Back
            </button>
            <div style={{ marginTop: "10px" }}>
            <button
              type="submit"
                 disabled={isSubmitting || !formData.paymentScreenshot}
             className="form-button submit-button"
                >
              {isSubmitting ? "Submitting..." : "Submit"}
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













