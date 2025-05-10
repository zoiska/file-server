const fs = require('fs').promises
const path = require('path')

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const usersFile = path.join(__dirname, './users.json');

async function getUsers() {
  const data = await fs.readFile(usersFile, 'utf8')
  const users = JSON.parse(data)
  return users
}

passport.use(new LocalStrategy( async (username, password, done) => {
  const users = await getUsers();
  const user = users.find((u) => u.username === username);
  if (!user) {
    return done(null, false, { message: 'Incorrect username' });
  }
  if (user.password !== password) {
    return done(null, false, { message: 'Incorrect password' });
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.uuid);
});

passport.deserializeUser(async (uuid, done) => {
  const users = await getUsers();
  const user = users.find((u) => u.uuid === uuid);
  done(null, user);
});
