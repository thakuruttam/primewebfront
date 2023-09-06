import React, { useState } from "react";
import "../form.css";
import axios from "axios";

export const Testimonials = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    degree: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [label, setLabel] = useState("Submit");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, degree, message } = formData;

    const newErrors = {};

    if (!name) {
      newErrors.name = "Name is required";
    }

    if (!email || !validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phone || !validatePhone(phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!degree) {
      newErrors.degree = "Degree is required";
    }

    if (!message) {
      newErrors.message = "Cover Letter is required";
    }

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);

      setTimeout(async () => {
        try {
          const apidata = await axios.post(
            "https://primeweb.onrender.com/user",
            {
              phonenumber: phone,
              email: email,
              name: name,
              degree: degree,
              message: message,
            }
          );

          console.log(apidata);

          if (apidata.data.phonenumber) {
            setLabel("Submitted form");
          } else {
            setLabel("Already submitted");
          }
        } catch (error) {
          console.error("Error submitting form:", error);
          setLabel("Failed");
        } finally {
          setIsLoading(false);
        }
      }, 2000);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div id="internship" style={{ display: "block" }}>
      <div className="container">
        <div className="col-md-8">
          <div className="row">
            <div className="section-title">
              <h2>Apply for Internship</h2>
              <p>
                Please fill out the form below or mail us at{" "}
                <a href="mailto:theprimeweb@hotmail.com">
                  theprimeweb@hotmail.com
                </a>
              </p>
            </div>
            <form name="sentMessage" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Name"
                      required
                      onChange={handleChange}
                    />
                    <p className="help-block text-danger">{errors.name}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      required
                      onChange={handleChange}
                    />
                    <p className="help-block text-danger">{errors.email}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="form-control"
                      placeholder="Phone Number"
                      required
                      onChange={handleChange}
                    />
                    <p className="help-block text-danger">{errors.phone}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      id="degree"
                      name="degree"
                      className="form-control"
                      placeholder="Currently Pursuing Degree"
                      required
                      onChange={handleChange}
                    />
                    <p className="help-block text-danger">{errors.degree}</p>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  id="message"
                  className="form-control"
                  rows="4"
                  placeholder="Cover Letter"
                  required
                  onChange={handleChange}
                ></textarea>
                <p className="help-block text-danger">{errors.message}</p>
              </div>
              <div id="success"></div>
              <button
                type="submit"
                className="btn btn-custom btn-lg"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : label}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
