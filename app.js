const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('index');
});

const port = 3000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});