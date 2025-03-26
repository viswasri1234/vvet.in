import React from 'react';
import './Donar.css';  

const Donar = () => {
  return (
    <div className="donar-form">
      <h2>Donar Details</h2>
      <form>
      

<div className="form-group">
  <label htmlFor="aadharFront">Upload Aadhaar Front:</label>
  <input type="file" id="aadharFront" name="aadharFront" accept="image/*" required />
</div>

<div className="form-group">
  <label htmlFor="aadharBack">Upload Aadhaar Back:</label>
  <input type="file" id="aadharBack" name="aadharBack" accept="image/*" required />
</div>
<div className="form-group">
  <label htmlFor="medicalDoc1">Upload Medical Document 1:</label>
  <input type="file" id="medicalDoc1" name="medicalDoc1" accept="image/*" required />
</div>

<div className="form-group">
  <label htmlFor="medicalDoc2">Upload Medical Document 2:</label>
  <input type="file" id="medicalDoc2" name="medicalDoc2" accept="image/*" />
</div>

<div className="form-group">
  <label htmlFor="medicalDoc3">Upload Medical Document 3:</label>
  <input type="file" id="medicalDoc3" name="medicalDoc3" accept="image/*" />
</div>

<div className="form-group">
  <label htmlFor="medicalDoc4">Upload Medical Document 4:</label>
  <input type="file" id="medicalDoc4" name="medicalDoc4" accept="image/*" />
</div>



<button type="submit">Submit</button>


        
      </form>
    </div>
  );
};

export default Donar;
