console.log("Hello world");

//the empty list
var random_choice = []

var siteURL = "https://s23-deploy-mike-russ-production.up.railway.app";


//new login and register code:

var login_button = document.querySelector(".Login");

var register_button = document.querySelector(".Register");

var top_element = document.querySelector("#top");

var results_element = document.querySelector("#results");

var login_div = document.querySelector("#login");

var login_element = document.querySelector("#login_div");

var register_element = document.querySelector("#register_div");

/*everything for the login section!*/
var actual_login_button = document.querySelector("#submit_login");
var login_email = document.querySelector("#login_email");
var login_password = document.querySelector("#login_password");
var login_error_text = document.querySelector("#login_error_text");

/*everything for the register section!*/
var register_login_button = document.querySelector("#register_login");
var register_first_name = document.querySelector("#register_first_name");
var register_last_name = document.querySelector("#register_last_name");
var register_email = document.querySelector("#register_email");
var register_password = document.querySelector("#register_password");
var error_text = document.querySelector("#error_text");

login_button.onclick = function() {
    console.log("button was pushed");
    top_element.style.display = "none";
    assignment_list.style.display = "none";
    results_element.style.display = "none";
    register_element.style.display = "none";
    login_element.style.display = "block";
}

register_button.onclick = function() {
    console.log("button was pushed");
    top_element.style.display = "none";
    assignment_list.style.display = "none";
    results_element.style.display = "none";
    login_element.style.display = "none";
    register_element.style.display = "block";
}



//the add button
var addButton = document.querySelector("#add_assignment_button");
console.log("Add assignment button ", addButton);

//This is the input bar for name.
var name_of_assignment = document.querySelector("#Assignments");
console.log("my input element:", name_of_assignment);
console.log("input element text:", name_of_assignment.value);

//This is the variable for description.
var description_of_assignment = document.querySelector("#description");

//This is the variable for due date.
var assignment_due_date = document.querySelector("#due_date");

//This is the variable for course.
var assignment_course = document.querySelector("#course");

//This is the variable for professor.
var assignment_professor = document.querySelector("#professor");

//ol this is where I add any results
var assignment_list = document.querySelector("#assignment_list");
console.log("my list element:", assignment_list);

function deleteOnServer(assignment_id){
    console.log("Deleting id: ", assignment_id);
    fetch('https://s23-deploy-mike-russ-production.up.railway.app/assignments/' + assignment_id, {
        method: 'DELETE',
        credentials: 'include'
}).then(function(response) {
    if(response.status == 200){
        getRequest();
    } else{
        console.log("couldn't delete assignment");
    }
    })
}

function updateOnServer(assignment_id, assignmentName, assignmentDescription, assignmentDueDate, assignmentCourse, assignmentProfessor) {
    var data = "name=" + encodeURIComponent(assignmentName);
    data += "&description=" + encodeURIComponent(assignmentDescription);
    data += "&due_date=" + encodeURIComponent(assignmentDueDate);
    data += "&course=" + encodeURIComponent(assignmentCourse);
    data += "&professor=" + encodeURIComponent(assignmentProfessor);
    console.log("data is = ", data);
    fetch('https://s23-deploy-mike-russ-production.up.railway.app/assignments/' + assignment_id, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    }).then(function(response) {
        if (response.status == 200){
            console.log("successful");
            getRequest()
        } else{
            console.log("error")
        }
    });
}

actual_login_button.onclick = function (){
    email = login_email.value;
    var data = "email=" + encodeURIComponent(login_email.value);
    data += "&password=" + encodeURIComponent(login_password.value);
    console.log("data is = ", data);
    fetch('https://s23-deploy-mike-russ-production.up.railway.app/sessions', {
        method: 'POST', 
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    }).then(function(response){
        console.log(response);
        getRequest()
        if(response.status == 201){
            confirm("You were logged in!")
            console.log("User logged in successfully");

            top_element.style.display = "grid";
            results_element.style.display = "block";
            assignment_list.style.display = "block";
            login_element.style.display = "none";
            register_element.style.display = "none";
            login_div.style.display = "none";
            error_text.innerHTML = "";
        } else {
            if(response.status == 401){
                login_error_text.innerHTML = "username or password incorrect."
            }
        }
})
}

register_login_button.onclick = function (){
    var data = "first_name=" + encodeURIComponent(register_first_name.value);
    data += "&last_name=" + encodeURIComponent(register_last_name.value);
    data += "&email=" + encodeURIComponent(register_email.value);
    data += "&password=" + encodeURIComponent(register_password.value);
    console.log("data is = ", data);
    fetch('https://s23-deploy-mike-russ-production.up.railway.app/credentials', {
        method: 'POST', 
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    }).then(function(response){
        if(response.status == 201){
            confirm("Account created.")
            console.log("User registered successfully");

            top_element.style.display = "none";
            assignment_list.style.display = "none";
            results_element.style.display = "none";
            register_element.style.display = "none";
            login_element.style.display = "block";
            error_text.innerHTML = "";
        } else{
            if(response.status == 422){
                error_text.innerHTML = "email already in use!";
            }
        }
    })
}

//function for when the add button is pushed
addButton.onclick = function (event) {
    console.log("my button was clicked");

    var data = "name=" + encodeURIComponent(name_of_assignment.value);
    data += "&description=" + encodeURIComponent(description_of_assignment.value);
    data += "&due_date=" + encodeURIComponent(assignment_due_date.value);
    data += "&course=" + encodeURIComponent(assignment_course.value);
    data += "&professor=" + encodeURIComponent(assignment_professor.value)
    console.log("data is = ", data)
    fetch('https://s23-deploy-mike-russ-production.up.railway.app/assignments', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    }).then(function(response){
        getRequest();
    })

    // var newItem = document.createElement("li");
    // random_choice.push(name_of_assignment.value);
    // console.log("new list: ", random_choice);
    // newItem.innerHTML = name_of_assignment.value;
    // assignment_list.appendChild(newItem);
    name_of_assignment.value = "";
    description_of_assignment.value = "";
    assignment_due_date.value = "";
    assignment_course.value = "";
    assignment_professor.value = "";
};

function getRequest () {
    // random_choice = [];
    fetch('https://s23-deploy-mike-russ-production.up.railway.app/assignments', {
        credentials: 'include'
}   ).then(function(response){
        if(response.status == 401){
            top_element.style.display = "none";
            assignment_list.style.display = "none";
            results_element.style.display = "none";
            register_element.style.display = "none";
            login_element.style.display = "block";
        }
        response.json().then(function(data){
            random_choice = data;
            assignment_list.innerHTML = "";
            random_choice.forEach(function(assignment) {
                var list_item = document.createElement('li');

                var name_item = document.createElement('div');
                name_item.innerText = assignment.name;
                name_item.classList.add("assignment-name")
                list_item.appendChild(name_item)

                var description_item = document.createElement('div');
                description_item.innerText = assignment.description;
                description_item.classList.add("assignment-description")
                list_item.appendChild(description_item)

                var due_date_item = document.createElement('div');
                due_date_item.innerText = assignment.due_date;
                due_date_item.classList.add("assignment-due_date")
                list_item.appendChild(due_date_item)

                var course_item = document.createElement('div');
                course_item.innerText = assignment.course;
                course_item.classList.add("assignment-course")
                list_item.appendChild(course_item)

                var professor_item = document.createElement('div');
                professor_item.innerText = assignment.professor;
                professor_item.classList.add("assignment-professor")
                list_item.appendChild(professor_item)

                var deleteButton = document.createElement('button');
                deleteButton.innerHTML = 'Completed';
                deleteButton.classList.add("delete-button")
                deleteButton.onclick = function() {
                    console.log("Delete button was clicked");
                    if(confirm("Are you sure you want to mark this assignment as completed?")){
                        deleteOnServer(assignment.id)
                    }
                };
                list_item.appendChild(deleteButton);

                var editButton = document.createElement('button');
                editButton.innerHTML = "Edit";
                editButton.classList.add("edit-button");
                list_item.appendChild(editButton);
                editButton.onclick = function() {
                    console.log("Edit button was pushed");

                    //make the edit form
                    var editForm = document.createElement('div');
                    editForm.classList.add("edit-form-area");

                    var assignmentNameDiv = document.createElement('div');
                    var assignmentNameLabel = document.createElement('label');
                    assignmentNameLabel.setAttribute('for', 'edit-assignment-name-input');
                    assignmentNameLabel.innerText = "Assignment Name:";
                    var assignmentNameInput = document.createElement('input');
                    assignmentNameInput.setAttribute('type', 'text');
                    assignmentNameInput.setAttribute('id', 'edit-assignment-name-input');
                    assignmentNameInput.setAttribute('value', assignment.name);
                    assignmentNameDiv.appendChild(assignmentNameLabel);
                    assignmentNameDiv.appendChild(assignmentNameInput);
                    editForm.appendChild(assignmentNameDiv);

                    var assignmentDescriptionDiv = document.createElement('div');
                    var assignmentDescriptionLabel = document.createElement('label');
                    assignmentDescriptionLabel = document.createElement('for', 'edit-assignment-description-input');
                    assignmentDescriptionLabel.innerText = "Assignment Description:";
                    var assignmentDescriptionInput = document.createElement('input');
                    assignmentDescriptionInput.setAttribute('type', 'text');
                    assignmentDescriptionInput.setAttribute('id', 'edit-assignment-description-input');
                    assignmentDescriptionInput.setAttribute('value', assignment.description);
                    assignmentDescriptionDiv.appendChild(assignmentDescriptionLabel);
                    assignmentDescriptionDiv.appendChild(assignmentDescriptionInput);
                    editForm.appendChild(assignmentDescriptionDiv);

                    var assignmentDueDateDiv = document.createElement('div');
                    var assignmentDueDateLabel = document.createElement('label');
                    assignmentDueDateLabel = document.createElement('for', 'edit-assignment-due_date-input');
                    assignmentDueDateLabel.innerText = "Assignment DueDate:";
                    var assignmentDueDateInput = document.createElement('input');
                    assignmentDueDateInput.setAttribute('type', 'text');
                    assignmentDueDateInput.setAttribute('id', 'edit-assignment-due_date-input');
                    assignmentDueDateInput.setAttribute('value', assignment.due_date);
                    assignmentDueDateDiv.appendChild(assignmentDueDateLabel);
                    assignmentDueDateDiv.appendChild(assignmentDueDateInput);
                    editForm.appendChild(assignmentDueDateDiv);

                    var assignmentCourseDiv = document.createElement('div');
                    var assignmentCourseLabel = document.createElement('label');
                    assignmentCourseLabel = document.createElement('for', 'edit-assignment-course-input');
                    assignmentCourseLabel.innerText = "Assignment Course:";
                    var assignmentCourseInput = document.createElement('input');
                    assignmentCourseInput.setAttribute('type', 'text');
                    assignmentCourseInput.setAttribute('id', 'edit-assignment-course-input');
                    assignmentCourseInput.setAttribute('value', assignment.course);
                    assignmentCourseDiv.appendChild(assignmentCourseLabel);
                    assignmentCourseDiv.appendChild(assignmentCourseInput);
                    editForm.appendChild(assignmentCourseDiv);

                    var assignmentProfessorDiv = document.createElement('div');
                    var assignmentProfessorLabel = document.createElement('label');
                    assignmentProfessorLabel = document.createElement('for', 'edit-assignment-professor-input');
                    assignmentProfessorLabel.innerText = "Assignment Professor:";
                    var assignmentProfessorInput = document.createElement('input');
                    assignmentProfessorInput.setAttribute('type', 'text');
                    assignmentProfessorInput.setAttribute('id', 'edit-assignment-professor-input');
                    assignmentProfessorInput.setAttribute('value', assignment.professor);
                    assignmentProfessorDiv.appendChild(assignmentProfessorLabel);
                    assignmentProfessorDiv.appendChild(assignmentProfessorInput);
                    editForm.appendChild(assignmentProfessorDiv);

                    var editFormSubmitButton = document.createElement('button');
                    editFormSubmitButton.innerHTML = "Submit";
                    editFormSubmitButton.classList.add("edit-form-submit-button");
                    editFormSubmitButton.onclick = function() {
                        console.log("edit button was pushed");
                        var newAssignmentName = document.getElementById('edit-assignment-name-input').value;
                        var newAssignmentDescription = document.getElementById("edit-assignment-description-input").value;
                        var newAssignmentDueDate = document.getElementById("edit-assignment-due_date-input").value;
                        var newAssignmentCourse = document.getElementById("edit-assignment-course-input").value;
                        var newAssignmentProfessor = document.getElementById("edit-assignment-professor-input").value;
                        updateOnServer(assignment.id, newAssignmentName, newAssignmentDescription, newAssignmentDueDate, newAssignmentCourse, newAssignmentProfessor);
                    };
                    editForm.appendChild(editFormSubmitButton);

                    var editFormCancelButton = document.createElement('button');
                    editFormCancelButton.innerHTML = "Cancel";
                    editFormCancelButton.classList.add("edit-form-submit-button");
                    editFormCancelButton.onclick = function() {
                        console.log("cancel button was clicked");
                        editForm.remove();
                    };
                    editForm.appendChild(editFormCancelButton);

                    list_item.appendChild(editForm);
                };
                random_choice = data;
                assignment_list.appendChild(list_item);
            })
        })
    })
}

var randomAssignmentList = document.querySelector("#randomassignmentlist")

function selectRandom() {
    if(random_choice.length > 0) {
        var randomIndex = Math.floor(Math.random() * random_choice.length);
        var randomAssignment = random_choice[randomIndex];
        var assignmentItem = document.createElement('li');
        assignmentItem.innerHTML = `
        <div class="assignment-name">${randomAssignment.name}</div>
        <div class="assignment-description">${randomAssignment.description}</div>
        <div class="assignment-due_date">${randomAssignment.due_date}</div>
        <div class="assignment-course">${randomAssignment.course}</div>
        <div class="assignment-professor">${randomAssignment.professor}</div>
        `;
        
        randomAssignmentList.innerHTML = '';
        randomAssignmentList.appendChild(assignmentItem);
    }
}

var randomButton = document.querySelector("#pick_random_assignment");

randomButton.onclick = function () {
    console.log("my button was clicked");
    //make a list with a random assignment.
    selectRandom()
};

getRequest();
