// entry point, just boots the server

require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on ${process.env.URL}:${PORT}`);
});
