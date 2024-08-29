import React, { useState } from 'react';
import { TextField, Button, Typography, Rating, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import emailjs from 'emailjs-com';
const FeedbackForm = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: name,
      from_email: email,
      phone: phone,
      rating: rating,
      feedback: feedback, 
    };

    try {
      await emailjs.send(
        'service_a20p8xm', // Replace with your EmailJS service ID
        'template_jcl7hi7', // Replace with your EmailJS template ID
        templateParams,
        'pHky4-uujt4IL2c9p' // Replace with your EmailJS user ID
      );

      // Show success message or toast
      console.log('Feedback email sent successfully');
      setName('');
      setEmail('');
      setPhone('');
      setFeedback('');
      setRating(0);
      setSubmitted(true);
      setOpen(false); // Close the form after submission
    } catch (error) {
      console.error('Error sending feedback email:', error);
      // Show error message or toast
    }
  };

  return (
    <div>
      <div className="" onClick={handleOpen}>
        Give Feedback
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Feedback Form</DialogTitle>
        <DialogContent>
          {submitted ? (
            <Typography variant="body1" align="center">
              Thank you for your feedback!
            </Typography>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                type="email"
                label="Your Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Your Phone Number"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                margin="normal"
              />
              <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                precision={1}
                size="large"
                required
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Your Feedback"
                variant="outlined"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                margin="normal"
              />
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </DialogActions>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedbackForm;
