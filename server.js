require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const connectDB = require('./config/database');
const Assignment = require('./models/Assignment');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const noteRoutes = require('./routes/noteRoutes');
const profileRoutes = require('./routes/profileRoutes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/assignments', assignmentRoutes);
app.use('/api/v1/notes', noteRoutes);
app.use('/api/v1/profile', profileRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Assignment Tracking Backend API',
    version: '1.0.0'
  });
});

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Backend is running',
    port: process.env.PORT || 5001
  });
});
cron.schedule('0 9 * * *', async () => {
  console.log('Running cron job to check for overdue assignments...');
  
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const overdueAssignments = await Assignment.find({
      dueDate: { $lt: today },
      status: { $ne: 'Completed' }
    });

    if (overdueAssignments.length > 0) {
      console.log(`Found ${overdueAssignments.length} overdue assignments`);
    } else {
      console.log('No overdue assignments found');
    }
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
