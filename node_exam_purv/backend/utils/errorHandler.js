// utils/errorHandler.js
const errorHandler = (res, error) => {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server Error' });
  };
  

module.exports = errorHandler