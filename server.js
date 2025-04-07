const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();

// Serve the static files from the current directory
app.use(serveStatic(path.join(__dirname)));

// Always return the main index.html, so react-router can handle routing
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'blockbench-presentation.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log('Server started on port ' + port);