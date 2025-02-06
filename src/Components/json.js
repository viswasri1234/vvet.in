export const json = {
    "title": "Neet Mock test Registration Form",
    "logoPosition": "right",
    "pages": [
      {
        "name": "page1",
        "elements": [
          {
            "type": "text",
            "name": "student_name",
            "title": "Student Name",
            "isRequired": true
          },
          {
            "type": "dropdown",
            "name": "standard",
            "title": "Standard",
            "isRequired": true,
            "choices": [
              {
                "value": "Item 1",
                "text": "8th"
              },
              {
                "value": "Item 2",
                "text": "9th"
              },
              {
                "value": "Item 3",
                "text": "10th"
              },
              {
                "value": "Item 4",
                "text": "11th"
              },
              {
                "value": "Item 5",
                "text": "12th"
              }
            ]
          },
          {
            "type": "text",
            "name": "school_name",
            "title": "School Name",
            "isRequired": true
          },
          {
            "type": "text",
            "name": "pincode",
            "title": "Pincode",
            "isRequired": true
          },
          {
            "type": "text",
            "name": "email_id",
            "title": "Email ID",
            "isRequired": true,
            "inputType": "email"
          },
          {
            "type": "text",
            "name": "contact_number",
            "title": "Contact Number",
            "isRequired": true,
            "inputType": "tel"
          }
        ]
      }
    ]
  }