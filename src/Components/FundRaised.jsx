import React from "react";

const FundRaised = () => {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="fundName">Fundraiser Name:</label>
        <input type="text" id="fundName" name="fundName" placeholder="Enter fundraiser name" required />
      </div>

      <div className="form-group">
        <label htmlFor="fundAmount">Required Amount:</label>
        <input type="number" id="fundAmount" name="fundAmount" placeholder="Enter required amount" required />
      </div>

      <div className="form-group">
        <label htmlFor="fundPurpose">Purpose of Fundraising:</label>
        <textarea id="fundPurpose" name="fundPurpose" placeholder="Describe the purpose" required></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="supportingDoc1">Upload Supporting Document 1:</label>
        <input type="file" id="supportingDoc1" name="supportingDoc1" accept="image/*,application/pdf" required />
      </div>

      <div className="form-group">
        <label htmlFor="supportingDoc2">Upload Supporting Document 2 (Optional):</label>
        <input type="file" id="supportingDoc2" name="supportingDoc2" accept="image/*,application/pdf" />
      </div>

      <button type="submit" style={{ fontSize: "12px", padding: "5px 10px" }}>Submit</button>
    </form>
  );
};

export default FundRaised;

