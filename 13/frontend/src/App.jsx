import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Typography, Button, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquarePlus, LayoutDashboard, GraduationCap } from 'lucide-react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#8b5cf6' }, // Violet
    secondary: { main: '#0ea5e9' }, // Sky
    background: {
      default: '#0f172a', // Slate 900
      paper: 'rgba(30, 41, 59, 0.7)', // Slate 800 with opacity
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    }
  },
  typography: {
    fontFamily: '"Inter", "Poppins", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
          }
        }
      }
    }
  },
});

export default function App() {
  const [view, setView] = useState('student');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', background: 'radial-gradient(circle at top left, #1e1b4b, #0f172a 50%, #020617)' }}>
        
        {/* Modern Sidebar */}
        <Box 
          component={motion.div}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{
            width: 280,
            p: 3,
            borderRight: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(20px)',
            zIndex: 10
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6, mt: 2 }}>
            <Box sx={{ p: 1, borderRadius: 2, background: 'linear-gradient(135deg, #8b5cf6, #0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={28} color="#fff" />
            </Box>
            <Typography variant="h6" fontWeight="bold" sx={{ background: 'linear-gradient(90deg, #fff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              UniFeedback
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant={view === 'student' ? 'contained' : 'text'}
              onClick={() => setView('student')}
              startIcon={<MessageSquarePlus size={20} />}
              sx={{ 
                justifyContent: 'flex-start', 
                color: view === 'student' ? '#fff' : 'text.secondary',
                background: view === 'student' ? 'linear-gradient(90deg, #8b5cf6, #6d28d9)' : 'transparent',
                '&:hover': { background: view === 'student' ? 'linear-gradient(90deg, #8b5cf6, #6d28d9)' : 'rgba(255,255,255,0.05)' }
              }}
            >
              Submit Feedback
            </Button>
            
            <Button
              fullWidth
              variant={view === 'admin' ? 'contained' : 'text'}
              onClick={() => setView('admin')}
              startIcon={<LayoutDashboard size={20} />}
              sx={{ 
                justifyContent: 'flex-start', 
                color: view === 'admin' ? '#fff' : 'text.secondary',
                background: view === 'admin' ? 'linear-gradient(90deg, #0ea5e9, #0284c7)' : 'transparent',
                '&:hover': { background: view === 'admin' ? 'linear-gradient(90deg, #0ea5e9, #0284c7)' : 'rgba(255,255,255,0.05)' }
              }}
            >
              Admin Dashboard
            </Button>
          </Box>
        </Box>

        {/* Main Content Area */}
        <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 2, md: 6 }, position: 'relative' }}>
          {/* Subtle animated background glowing orbs */}
          <Box sx={{ position: 'absolute', top: '10%', right: '20%', width: 300, height: 300, background: '#8b5cf6', filter: 'blur(150px)', opacity: 0.15, borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />
          <Box sx={{ position: 'absolute', bottom: '10%', left: '10%', width: 250, height: 250, background: '#0ea5e9', filter: 'blur(150px)', opacity: 0.15, borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />
          
          <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 1200, mx: 'auto' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {view === 'student' ? <FeedbackForm /> : <FeedbackList />}
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}