import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Rating, Select, MenuItem, FormControl, InputLabel,
  Pagination, CircularProgress, Alert, Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import { Database, Filter, TrendingUp } from 'lucide-react';

const subjects = ['All', 'Mathematics', 'Physics', 'Computer Science', 'Web Engineering', 'Literature'];

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [subjectFilter, page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = subjectFilter === 'All'
        ? `http://localhost:5000/api/feedbacks?page=${page}&limit=5`
        : `http://localhost:5000/api/feedbacks/${subjectFilter}?page=${page}&limit=5`;
      const res = await axios.get(url);
      setFeedbacks(res.data.data);
      setTotalPages(res.data.pages);
      setError('');
    } catch {
      setError('Failed to load data from server.');
    }
    setLoading(false);
  };

  const avg = feedbacks.length > 0
    ? (feedbacks.reduce((a, b) => a + b.rating, 0) / feedbacks.length).toFixed(1)
    : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Database size={32} color="#0ea5e9" />
        <Typography variant="h3" sx={{ fontWeight: 800, background: 'linear-gradient(90deg, #8b5cf6, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>
          Feedback Records
        </Typography>
      </Box>

      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        elevation={0}
        sx={{
          p: 3, mb: 4, display: 'flex', flexWrap: 'wrap', gap: 3,
          justifyContent: 'space-between', alignItems: 'center', borderRadius: 4,
          background: 'rgba(30, 41, 59, 0.4)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 250 }}>
          <Filter size={20} color="#94a3b8" />
          <FormControl fullWidth size="small">
            <InputLabel>Filter Subject</InputLabel>
            <Select
              value={subjectFilter}
              label="Filter Subject"
              onChange={(e) => { setSubjectFilter(e.target.value); setPage(1); }}
              sx={{ borderRadius: 2 }}
            >
              {subjects.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box display="flex" alignItems="center" gap={2} sx={{ p: 1.5, px: 3, borderRadius: 3, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <TrendingUp size={20} color="#0ea5e9" />
          <Typography color="text.secondary" fontWeight={500}>Page Average:</Typography>
          <Rating value={parseFloat(avg)} readOnly precision={0.1} size="small" sx={{ color: '#0ea5e9' }} />
          <Typography fontWeight="bold" variant="h6" color="#fff">{avg}</Typography>
        </Box>
      </Paper>

      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 4,
          background: 'rgba(30, 41, 59, 0.3)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          overflow: 'hidden'
        }}
      >
        <Table>
          <TableHead sx={{ background: 'rgba(0,0,0,0.2)' }}>
            <TableRow>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Student</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Subject</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Rating</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Comments</TableCell>
            </TableRow>
          </TableHead>

          <TableBody component={motion.tbody} variants={containerVariants} initial="hidden" animate="show">
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                  <CircularProgress size={40} thickness={4} sx={{ color: '#8b5cf6' }} />
                </TableCell>
              </TableRow>
            ) : feedbacks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                  <Typography color="text.secondary" variant="h6">No feedback data found.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              feedbacks.map((fb) => (
                <TableRow
                  key={fb._id}
                  component={motion.tr}
                  variants={itemVariants}
                  sx={{
                    transition: 'background 0.2s',
                    '&:hover': { background: 'rgba(139, 92, 246, 0.1)' },
                    '& td': { borderBottom: '1px solid rgba(255,255,255,0.05)' }
                  }}
                >
                  <TableCell sx={{ color: '#fff' }}>
                    {new Date(fb.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500, color: '#fff' }}>{fb.studentName}</TableCell>
                  <TableCell>
                    <Chip label={fb.subject} size="small" sx={{ background: 'rgba(14, 165, 233, 0.15)', color: '#0ea5e9', fontWeight: 600, borderRadius: 1.5 }} />
                  </TableCell>
                  <TableCell>
                    <Rating value={fb.rating} readOnly size="small" sx={{ color: '#8b5cf6' }} />
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {fb.comments || <Typography variant="caption" color="rgba(255,255,255,0.2)">No comments</Typography>}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!loading && totalPages > 1 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': { color: '#fff', borderColor: 'rgba(255,255,255,0.1)' },
              '& .Mui-selected': { background: 'linear-gradient(90deg, #8b5cf6, #0ea5e9) !important', color: '#fff', fontWeight: 'bold' }
            }}
          />
        </Box>
      )}
    </Box>
  );
}