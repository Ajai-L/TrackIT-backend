const Assignment = require('../models/Assignment');

exports.getAllAssignments = async (req, res) => {
  try {
    const userId = req.user.id;

    const assignments = await Assignment.find({ userId });

    res.status(200).json({
      status: 'success',
      assignments
    });
  } catch (error) {
    console.error('Get assignments error:', error);
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.createAssignment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, subject, description, dueDate, status } = req.body;

    if (!title || !subject || !description || !dueDate) {
      return res.status(400).json({
        status: 'fail',
        message: 'All fields are required'
      });
    }
    const assignment = await Assignment.create({
      title,
      subject,
      description,
      dueDate,
      status: status || 'Pending',
      userId
    });

    res.status(201).json({
      status: 'success',
      message: 'Assignment created successfully',
      assignment
    });
  } catch (error) {
    console.error('Create assignment error:', error);
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Get single assignment
exports.getAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const assignment = await Assignment.findOne({ _id: id, userId });

    if (!assignment) {
      return res.status(404).json({
        status: 'fail',
        message: 'Assignment not found'
      });
    }

    res.status(200).json({
      status: 'success',
      assignment
    });
  } catch (error) {
    console.error('Get assignment error:', error);
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Update assignment
exports.updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, subject, description, dueDate, status } = req.body;

    let assignment = await Assignment.findOne({ _id: id, userId });

    if (!assignment) {
      return res.status(404).json({
        status: 'fail',
        message: 'Assignment not found'
      });
    }

    // Update fields
    if (title) assignment.title = title;
    if (subject) assignment.subject = subject;
    if (description) assignment.description = description;
    if (dueDate) assignment.dueDate = dueDate;
    if (status) assignment.status = status;
    assignment.updatedAt = Date.now();

    assignment = await assignment.save();

    res.status(200).json({
      status: 'success',
      message: 'Assignment updated successfully',
      assignment
    });
  } catch (error) {
    console.error('Update assignment error:', error);
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Delete assignment
exports.deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const assignment = await Assignment.findOneAndDelete({ _id: id, userId });

    if (!assignment) {
      return res.status(404).json({
        status: 'fail',
        message: 'Assignment not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Assignment deleted successfully'
    });
  } catch (error) {
    console.error('Delete assignment error:', error);
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};
