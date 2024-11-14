const app = require('./src/app.js');

const POST = process.env.PORT || 3001;
app.listen(POST, () => {
  console.log(`Server is running on port ${POST}`);
});
