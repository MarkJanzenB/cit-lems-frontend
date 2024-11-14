import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default {
  optimizeDeps: {
    include: [
      '@mui/x-date-pickers',
      '@mui/x-date-pickers/AdapterDateFns',
      '@mui/x-date-pickers/LocalizationProvider',
    ],
  },
};
