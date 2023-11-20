let timetableData = [];

function generateTimetable() {
  const subject = document.getElementById('subject').value;
  const courseCode = document.getElementById('courseCode').value;
  const group = document.getElementById('group').value;
  const lecturer = document.getElementById('lecturer').value;
  const venue = document.getElementById('venue').value;

  if (lecturerClash(lecturer)) {
    alert('Lecturer has a clash in the timetable. Please choose a different time.');
    return;
  }

  const timetableEntry = {
    courseCode: courseCode,
    group: group,
    day: getDay(),
    time: getTime(),
  };

  timetableData.push(timetableEntry);

  displayTimetable();
}

function lecturerClash(lecturer) {
  return timetableData.some(entry => entry.lecturer === lecturer && entry.day === getDay());
}

function getDay() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
 
  return days[Math.floor(Math.random() * days.length)];
}

function getTime() {
  
  const hours = Math.floor(Math.random() * (18 - 7 + 1)) + 7;
  const minutes = Math.random() < 0.5 ? '00' : '30';
  return `${hours}:${minutes}`;
}

function displayTimetable() {
  const timetableTable = document.getElementById('timetable');
  timetableTable.innerHTML = '';

  const headerRow = timetableTable.insertRow(0);
  headerRow.insertCell(0).outerHTML = '<th>Time</th>';
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  days.forEach(day => headerRow.insertCell(-1).outerHTML = `<th>${day}</th>`);

  for (let i = 7; i <= 18; i++) {
    const time = `${i}:00 - ${i + 1}:00`;
    const newRow = timetableTable.insertRow(-1);
    newRow.insertCell(0).innerText = time;

    days.forEach(day => {
      const matchingEntry = timetableData.find(entry => entry.day === day && entry.time.startsWith(`${i}:`));
      newRow.insertCell(-1).innerText = matchingEntry ? `${matchingEntry.courseCode} - ${matchingEntry.group}` : '';
    });
  }
}
