import React from 'react';
import "./Contact.css";


const Contact = () => {



  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    formData.append("access_key", "1cb8a5cf-6704-4dce-abcb-e1c06ab312a0"); 

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      alert("Form Submitted Successfully")
      event.target.reset();
    } else {
      console.log("Error", data);
      alert("There has been an error submitted your form. Try again.")

    }
  };

  return (
    <div className="contact-container">
      <form onSubmit={onSubmit}>
        <h2>Contact Us</h2>
        <div className="inputBox">
          <label>Name</label>
          <input type="text" name='name' placeholder='Name' required />
        </div>
        <div className="inputBox">
          <label>Email</label>
          <input type="email" name='email' placeholder='Email' required />
        </div>
        <div className="inputBox">
          <label>Message</label>
          <textarea placeholder='Message' name='Message' required></textarea>
        </div>
        <div className="inputBox">
          <input type="submit" value="Send" />
        </div>
      </form>
    </div>
  );
}

export default Contact;
