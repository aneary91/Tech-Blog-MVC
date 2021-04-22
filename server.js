// Dependencies
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({}); // inside of this object there needs to be the month the date adn the eyar, needs to have a helper to format the data
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/connections');


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));  // ----- need to build this out more once i have written the contrillers


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
