import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, TextField, Button, Typography, Paper, Rating, Alert, Snackbar, MenuItem } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';

const schema = yup.object({
  studentName: yup.string().required('Student Name is required').min(2, 'Must be at least 2 characters'),
  subject: yup.string().required('Subject is required'),
  rating: yup.number().min(1, 'Please provide a rating').max(5).required('Rating is required'),
  comments: yup.string()
});

const subjects = [
  'Mathematics',
  'Physics',
  'Computer Science',
  'Web Engineering',
  'Literature'
];

export default function FeedbackForm() {
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { studentName: '', subject: '', rating: 0, comments: '' }
  });

  const ratingValue = watch('rating');

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/feedback', data);
      setSubmitStatus({ type: 'success', message: 'Feedback submitted successfully!' });
      setOpenSnackbar(true);
      reset();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.error?.[0] || 'Submission failed. Try again.'
      });
      setOpenSnackbar(true);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        style={{ width: '100%', maxWidth: 550 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            background: 'rgba(30, 41, 59, 0.4)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 1 }}>
            <Sparkles size={28} color="#0ea5e9" />
            <Typography variant="h4" align="center" sx={{ fontWeight: 800, background: 'linear-gradient(90deg, #8b5cf6, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Your Feedback
            </Typography>
          </Box>
          <Typography align="center" color="text.secondary" sx={{ mb: 4 }}>
            We value your insights to improve our courses.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Student Name"
              margin="normal"
              {...register('studentName')}
              error={!!errors.studentName}
              helperText={errors.studentName?.message}
            />

            <TextField
              select
              fullWidth
              label="Subject"
              margin="normal"
              {...register('subject')}
              error={!!errors.subject}
              helperText={errors.subject?.message}
              defaultValue=""
            >
              {subjects.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>

            <Box mt={3} mb={1} sx={{ p: 2, borderRadius: 2, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Typography color={errors.rating ? 'error' : 'text.secondary'} gutterBottom fontWeight={500}>
                How would you rate this subject? *
              </Typography>
              <Rating
                value={ratingValue}
                onChange={(_, val) => setValue('rating', val, { shouldValidate: true })}
                size="large"
                sx={{
                  color: '#0ea5e9',
                  '& .MuiRating-iconEmpty': { color: 'rgba(255,255,255,0.2)' }
                }}
              />
              {errors.rating && (
                <Typography color="error" variant="caption" display="block" mt={0.5}>
                  {errors.rating.message}
                </Typography>
              )}
            </Box>

            <TextField
              fullWidth
              label="Additional Comments (Optional)"
              margin="normal"
              multiline
              rows={4}
              {...register('comments')}
              sx={{ mt: 2 }}
            />

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                fullWidth
                disabled={isSubmitting}
                endIcon={<Send size={18} />}
                sx={{
                  mt: 4,
                  py: 1.8,
                  borderRadius: 3,
                  fontWeight: 700,
                  fontSize: '1rem',
                  background: 'linear-gradient(90deg, #8b5cf6, #0ea5e9)',
                  color: '#fff',
                  textTransform: 'none',
                  boxShadow: '0 10px 20px -10px rgba(139, 92, 246, 0.5)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #7c3aed, #0284c7)',
                  }
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Send Feedback'}
              </Button>
            </motion.div>
          </form>
        </Paper>
      </motion.div>

      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={submitStatus.type} variant="filled" sx={{ width: '100%', borderRadius: 2 }}>
          {submitStatus.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}