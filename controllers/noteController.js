const Note = require('../models/Note');

exports.getAllNotes = async (req, res) => {
  try {
    const userId = req.user.id;

    const notes = await Note.find({ userId });

    res.status(200).json({
      status: 'success',
      notes
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.createNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, date, subject, description } = req.body;

    if (!name || !date || !subject || !description) {
      return res.status(400).json({
        status: 'fail',
        message: 'All fields are required'
      });
    }
    const note = await Note.create({
      name,
      date,
      subject,
      description,
      userId
    });

    res.status(201).json({
      status: 'success',
      message: 'Note created successfully',
      note
    });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const note = await Note.findOne({ _id: id, userId });

    if (!note) {
      return res.status(404).json({
        status: 'fail',
        message: 'Note not found'
      });
    }

    res.status(200).json({
      status: 'success',
      note
    });
  } catch (error) {
    console.error('Get note error:', error);
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { name, date, subject, description } = req.body;

    let note = await Note.findOne({ _id: id, userId });

    if (!note) {
      return res.status(404).json({
        status: 'fail',
        message: 'Note not found'
      });
    }
    if (name) note.name = name;
    if (date) note.date = date;
    if (subject) note.subject = subject;
    if (description) note.description = description;
    note.updatedAt = Date.now();

    note = await note.save();

    res.status(200).json({
      status: 'success',
      message: 'Note updated successfully',
      note
    });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const note = await Note.findOneAndDelete({ _id: id, userId });

    if (!note) {
      return res.status(404).json({
        status: 'fail',
        message: 'Note not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Note deleted successfully'
    });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};
