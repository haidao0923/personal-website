import React, { useState } from 'react';
import StarRating from './StarRating';
import emailjs from '@emailjs/browser';

const ContactForm: React.FC = () => {
  const [rating, setRating] = useState(5);


  const handleRatingChange = (rating: number) => {
    console.log(`Selected rating: ${rating}`);
    setRating(rating);
  };

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs.sendForm('service_atdncm5', 'template_i7ko30h', e.currentTarget, 'Wj1wGSlJqR_HvHw2U');
    console.log("Email Sent");

  }

  return (
    <form className='form' onSubmit={sendEmail}>
        <h1>Email</h1>
        <input id="email" className="email" name="email_from" placeholder="Email"></input>
        <h1>Name</h1>
        <input id="name" className="name" name="name_from" placeholder="Your Secret Admirer"></input>
        <h1>Message</h1>
        <textarea id="message" className="message" name="message" placeholder="Write something..." rows={4}></textarea>
        <br></br>
        <StarRating onChange={handleRatingChange}></StarRating>
        <br></br>
        <input type="hidden" name="rating_form" value={rating}></input>
        <button type="submit" className='submit'>Submit</button>
        <br></br>
    </form>
  );
};

export default ContactForm;
