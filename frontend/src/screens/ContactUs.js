import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import Footer from './Footer'; // Import the Footer component

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.subject) newErrors.subject = "Subject is required";
        if (!formData.message) newErrors.message = "Message is required";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            // Handle form submission logic (e.g., send data to server)
            console.log('Form data:', formData);
            // Optionally, redirect after submission
            navigate('/thank-you');
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <>
            <Navbar /> {/* Include the Navbar component */}
            <div className="container my-5">
                <h2 className="mb-4 text-center">Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="subject" className="form-label">Subject</label>
                        <input
                            type="text"
                            className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                        {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                            id="message"
                            name="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                        {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <Footer /> {/* Include the Footer component */}
        </>
    );
}
