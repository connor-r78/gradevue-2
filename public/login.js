async function loginAndFetch()
{
  const response = await fetch("http://localhost:3000/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      district: "https://studentvue.vbcps.com",
      username: document.getElementById('username').value,
      password: document.getElementById('password').value, 
    })
  });

  const data = await response.json();

  const loginui = document.getElementById('loginui');
  loginui.remove();

  const parsedData = JSON.parse(data);
  console.log(parsedData);

  const coursedata = parsedData.Gradebook.Courses.Course;
  for ( var i = 0; i < coursedata.length; ++i ) {
    const courses = document.body.appendChild(document.createElement("p"));
    courses.textContent = coursedata[i].Marks.Mark[0].CalculatedScoreString;
  }
}
