const express = require('express');
const {
  getAllAssignments,
  createAssignment,
  getAssignment,
  updateAssignment,
  deleteAssignment
} = require('../controllers/assignmentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', getAllAssignments);
router.post('/', createAssignment);
router.get('/:id', getAssignment);
router.put('/:id', updateAssignment);
router.delete('/:id', deleteAssignment);

module.exports = router;
