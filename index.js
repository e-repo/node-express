const express = require('express');
const exphgs = require('express-handlebars');
const PORT = process.env.PORT || 3000;
const app = express();

const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');

const hbs = exphgs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views'); // Устанавливем наименовани папки с вьюшками

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

