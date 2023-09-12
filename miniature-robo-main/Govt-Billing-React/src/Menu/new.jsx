import React, { useState } from 'react'
import emailjs from '@emailjs/browser';

const EmailForm = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = 'service_sc5hs4m';
    const templateId = 'template_khsx1nb';
    const publicKey = 'YyjJ_hODXLVlQqFL8';

    // Create a new object that contains dynamic template params
    const templateParams = {
      from_name: "Harsh Goyal",
      from_email: "goyalharsh2408@gmail.com",
      to_name: 'Web Wizard',
      message: message,
    };

    // Send the email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response);
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }

//   return (
//     <form onSubmit={handleSubmit} className='emailForm'>
//       <input
//         type="text"
//         placeholder="Your Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         type="email"
//         placeholder="Your Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <textarea
//         cols="30"
//         rows="10"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       >
//       </textarea>
//       <button type="submit">Send Email</button>
//     </form>
//   )
}

export default EmailForm