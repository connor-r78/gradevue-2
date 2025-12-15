const StudentVue = require("studentvue.js");

exports.handler = async (event, context) => {
  try {
    const { district, username, password } = JSON.parse(event.body);

    const client = await StudentVue.login(district, username, password);
    const gradebook = await client.getGradebook();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gradebook),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Login failed" }),
    };
  }
};
