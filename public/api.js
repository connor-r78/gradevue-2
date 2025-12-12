const StudentVue = require("studentvue.js");
StudentVue.login("https://studentvue.vbcps.com", username, password)
  .then(client => client.getMessages())
  .then(console.log);
