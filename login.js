function getLetterGrade(percentage)
{
  percentage = Math.round(percentage);

  if ( percentage >= 93 ) return "A";
  else if ( percentage >= 90 ) return "A-";
  else if ( percentage >= 87 ) return "B+";
  else if ( percentage >= 83 ) return "B";
  else if ( percentage >= 80 ) return "B-";
  else if ( percentage >= 77 ) return "C+";
  else if ( percentage >= 73 ) return "C";
  else if ( percentage >= 70 ) return "C-";
  else if ( percentage >= 67 ) return "D+";
  else if ( percentage >= 64 ) return "D";
  else return "E";
}

function drawCourses(parsedData)
{
  const footer = document.getElementById('footer');
  const coursedata = parsedData.Gradebook.Courses.Course;

  for ( let i = 0; i < coursedata.length; ++i ) {
    const course = document.body.insertBefore(document.createElement("span"), footer);
    course.textContent = coursedata[i].CourseName;
    course.classList.add( "coursedata");

    const grade = document.body.insertBefore(document.createElement("button"), footer);
    grade.id = coursedata[i].CourseID;
    grade.classList.add("coursedata");
    grade.textContent = coursedata[i].Marks.Mark[0].CalculatedScoreString;
    grade.addEventListener("click", function() {
      drawAssignments(coursedata, i);
    });

    const br = document.body.insertBefore(document.createElement("br"), footer);
    br.classList.add("coursedata");
  }
}

function calcPercentage(row)
{
  number = document.getElementById("number");
  letter = document.getElementById("letter");
  table = document.getElementById("table");

  points = Number(row.cells[1].lastChild.value);
  total = Number(row.cells[3].lastChild.value);
  var percentage = points / total * 10000;
  percentage = Math.round(percentage) / 100;
  if ( percentage ) row.cells[4].innerHTML = percentage + "%";

  var totalPoints = 0;
  var totalTotal = 0;

  for ( var i = 0; i < table.rows.length; ++i ) {
    var tmp = Number(table.rows[i].cells[1].lastChild.value);
    if ( !Number.isNaN(tmp) ) totalPoints += tmp;
    tmp = Number(table.rows[i].cells[3].lastChild.value);
    if ( !Number.isNaN(tmp) ) totalTotal += tmp; 
  }
  percentage = totalPoints / totalTotal * 10000;
  percentage = Math.round(percentage) / 100;
  number.innerText = " (" + percentage + ")";
  letter.innerText = getLetterGrade(percentage); 
}

function drawAssignment(table, assignment)
{
  const footer = document.getElementById("footer");

  const row = table.insertRow();
  const name = row.insertCell(0);
  name.innerHTML = assignment.Measure;

  const points = row.insertCell(1);
  pointsInput = document.createElement("input");
  pointsInput.onchange = function() {
    calcPercentage(row);
  }; 
  pointsInput.classList.add("points");
  if ( assignment.Point ) pointsInput.value = assignment.Point;
  points.appendChild(pointsInput);

  const slash = row.insertCell(2);
  slash.innerHTML = "/";
  
  const totalPoints = row.insertCell(3);
  totalPointsInput = document.createElement("input");
  totalPointsInput.onchange = function() {
    calcPercentage(row);
  }; 
  totalPointsInput.classList.add("points");
  if ( assignment.PointPossible ) totalPointsInput.value = assignment.PointPossible;
  totalPoints.appendChild(totalPointsInput);

  const percentageText = row.insertCell(4);
  calcPercentage(row);
}

function drawAssignments(coursedata, courseID)
{
  const footer = document.getElementById("footer");
  const courses = document.body.getElementsByClassName("coursedata");
  while ( courses.length > 0 ) {
    courses[0].remove();
  }

  const name = document.body.insertBefore(document.createElement("span"), footer);
  name.textContent = coursedata[courseID].CourseName + " - ";
  const letter = document.createElement("span");
  letter.id = "letter";
  document.body.insertBefore(letter, footer);
  const number = document.createElement("span");
  number.id = "number";
  document.body.insertBefore(number, footer); 

  const assignments = coursedata[courseID].Marks.Mark[0].Assignments.Assignment;
  
  const assignmentTable = document.createElement("table");
  assignmentTable.id = "table";
  assignmentTable.classList.add("assignment");
  document.body.insertBefore(assignmentTable, footer);

  if ( assignments.length )
    for ( var i = 0; i < assignments.length; ++i ) 
      drawAssignment(assignmentTable, assignments[i]);
  else drawAssignment(assignments);
}

async function loginAndFetch()
{
  const response = await fetch("/api/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      district: "https://studentvue.vbcps.com",
      username: document.getElementById('username').value,
      password: document.getElementById('password').value, 
    })
  });

  const data = await response.json();
  console.log(data);

  const title = document.getElementById('site-title');
  title.textContent = "Grades";

  const tagline = document.getElementById('site-tagline');
  const loginui = document.getElementById('login-section');
  
  tagline.remove();
  loginui.remove();

  const parsedData = JSON.parse(data);
  drawCourses(parsedData);
}
