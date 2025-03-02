// Function to display students from localStorage
function displayStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const tbody = document.querySelector('#studentTable tbody');
    tbody.innerHTML = ''; 

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.studentName}</td>
            <td>${student.studentId}</td>
            <td>${student.emailId}</td>

            <td>${student.studentClass}</td>
            <td>${student.rollNo}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Function to add a new student
document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Get input values
    const studentName = document.getElementById('studentName').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const emailId = document.getElementById('emailId').value.trim();
    
    const studentClass = document.getElementById('studentClass').value.trim();
    const rollNo = document.getElementById('rollNo').value.trim();

    // Input validation
    if (!studentName || !studentId || !emailId||  !studentClass || !rollNo) {
        alert('All fields are required!');
        return;
    }

    if (!/^[A-Za-z\s]+$/.test(studentName)) {
        alert('Student Name should contain only letters and spaces.');
        return;
    }

    if (!/^\d+$/.test(studentId)) {
        alert('Student ID should contain only numbers.');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!/^\d+$/.test(rollNo)) {
        alert('Roll No. should contain only numbers.');
        return;
    }

    // Create a student object
    const student = { studentName, studentId, emailId, studentClass, rollNo };

    // Get existing students from localStorage or initialize an empty array
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Add the new student to the array
    students.push(student);

    // Save the updated array back to localStorage
    localStorage.setItem('students', JSON.stringify(students));

    // Refresh the display
    displayStudents();

    // Reset the form
    this.reset();
});

// Function to delete a student
function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students'));

    // Remove the student at the specified index
    students.splice(index, 1);

    // Save the updated array back to localStorage
    localStorage.setItem('students', JSON.stringify(students));

    // Refresh the display
    displayStudents();
}

// Function to edit a student
function editStudent(index) {
    let students = JSON.parse(localStorage.getItem('students'));

    // Get the student to edit
    const student = students[index];

    //  student's details
    document.getElementById('studentName').value = student.studentName;
    document.getElementById('studentId').value = student.studentId;
    document.getElementById('emailId').value = student.emailId;
    document.getElementById('studentClass').value = student.studentClass;
    document.getElementById('rollNo').value = student.rollNo;

    // Delete the student from the list 
    deleteStudent(index);
}

// Display students when the page loads
window.onload = displayStudents;