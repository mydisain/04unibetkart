// ... existing code ...

const handleSubmit = (values, { setSubmitting }) => {
  dispatch(login({ email: values.email, password: values.password }))
    .unwrap()
    .then(() => {
      // Success handling
      navigate('/dashboard');
    })
    .catch((error) => {
      // Error handling
      console.error('Login error:', error);
      // Display error to user
    })
    .finally(() => {
      setSubmitting(false);
    });
};

// ... existing code ...