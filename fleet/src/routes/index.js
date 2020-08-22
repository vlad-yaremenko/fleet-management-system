module.exports = app => {
  app.use('/api', require('./controllers/api'));
};
