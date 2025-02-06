import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "./FormBuilder.css";
import { json } from "./json";

function FormBuilder() {
  const survey = new Model(json);

  survey.completedHtml = `
    <h3>Thank you for registering!</h3>
    <p>We will get back to you with more details soon.</p>
`;

  // Callback function for when the form is completed
  survey.onComplete.add((sender) => {
    const formData = sender.data;
    const submitFormData = () => {
      const payload = {
        formData,
      };
      fetch(`http://localhost:3333/api/v1/recordFormData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => console.log("response === ", response))
        .catch((error) => console.log("error ==== ", error));
    };
    submitFormData()
  });

  return (
    <div style={{ textAlign: "center", height: "100%" }}>
      <Survey model={survey} />
    </div>
  );
}

export default FormBuilder;
