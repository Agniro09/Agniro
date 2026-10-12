import { useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  budget: '',
  description: '',
};

const useContactUs = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const submitInquiry = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Your inquiry could not be sent. Please try again.');
      }

      setFeedback({ type: 'success', message: result.message });
      setForm(initialForm);
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Unable to reach the server. Please try again later.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    submitting,
    feedback,
    updateField,
    submitInquiry,
  };
};

export default useContactUs;
