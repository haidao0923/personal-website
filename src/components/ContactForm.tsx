import React, { useEffect, useState } from 'react';
import StarRating from './StarRating';
import emailjs from '@emailjs/browser';

const ContactForm: React.FC = () => {
  const [email, setEmail] = useState("noemail@gmail.com");
  const [name, setName] = useState("Your Secret Admirer");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const whineText = ["", "😢😢😰😰😰😭😭😭😭🐱🐱🐱😿😿😿😿", "Fun fact, if you google translate 'Hai', it will come up as '2', but my actual name is 'Hải' which means the Sea", "I didn't think you would even consider giving me 3-star", "Thank you, I guess", "You have great taste!"];

  let intervalId: NodeJS.Timeout;

  const startTypingAnimation = () => {
      let index = 0;
      const messageElement = document.getElementById("message") as HTMLTextAreaElement;

      const typingFunction = () => {
          if (index < whineText[rating].length) {
            messageElement.value += whineText[rating][index];
            index++;
          } else {
            setTimeout(() => {
              const newMessageValue = messageElement.value.slice(0, -whineText[rating].length);
              messageElement.value = newMessageValue;
            }, 1000);
            clearInterval(intervalId);
          }
      };

      intervalId = setInterval(typingFunction, 50);

      // Run the first iteration immediately
      typingFunction();
  };

  useEffect(() => {
    startTypingAnimation();

    // Clean up the interval on component unmount
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [rating]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`Email: ${event.target.value}`);
    setEmail(event.target.value);
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`Name: ${event.target.value}`);
    setName(event.target.value);
  }

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(`Message: ${event.target.value}`);
    setMessage(event.target.value);
  }

  const handleRatingChange = (rating: number) => {
    console.log(`Selected rating: ${rating}`);
    setRating(rating);
  };

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs.sendForm('service_atdncm5', 'template_i7ko30h', e.currentTarget, 'Wj1wGSlJqR_HvHw2U')
    .then(() => {
      // Display a success popup
      window.alert('Thank you for the feedback!');

      // Clear input values
      setEmail("noemail@gmail.com");
      setName("Your Secret Admirer");
      setMessage("");
      setRating(0);

      (document.getElementById("email") as HTMLInputElement).value = "";
      (document.getElementById("name") as HTMLInputElement).value = "";
      (document.getElementById("message") as HTMLTextAreaElement).value = "";
    })
    .catch((error) => {
      // Display an error popup if the email sending fails
      window.alert('Failed to send email. Please try again later.');
      console.error('Error sending email:', error);
    });

    console.log("Email Sent");
    console.log(`Data Sent:\nEmail: ${email}\nName: ${name}\nMessage: ${message}\nRating ${rating}`)

  }

  return (
    <form className='form' onSubmit={sendEmail}>
        <h1>Email</h1>
        <input id="email" className="email" placeholder="Email (Optional)"  onChange={handleEmailChange}></input>
        <h1>Name</h1>
        <input id="name" className="name" placeholder="Your Secret Admirer" onChange={handleNameChange}></input>
        <h1>Message</h1>
        <textarea id="message" className="message" placeholder="Write something..." rows={4} onChange={handleMessageChange}></textarea>
        <br></br>
        <StarRating onChange={handleRatingChange}></StarRating>
        <br></br>
        <input type="hidden" name="email_from" value={email}></input>
        <input type="hidden" name="name_from" value={name}></input>
        <input type="hidden" name="message" value={message}></input>
        <input type="hidden" name="rating_form" value={rating}></input>
        <button type="submit" className='submit' disabled={message.trim().length > 0 ? false: true}>Submit</button>
        <br></br>
    </form>
  );
};

export default ContactForm;
