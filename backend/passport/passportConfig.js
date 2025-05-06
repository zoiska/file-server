const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
      const user = [{ id: 1, username: 'admin', password: 'admin' }];
  
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
  
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password' });
      }
  
      return done(null, user);
    }
  ));
  
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    if (user) {
        done(null, user);
    } else {
        done(new Error('User not found'));
    }
});
  