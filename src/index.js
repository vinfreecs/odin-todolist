import "./styles/style.css";
function Collection() {
  let collection = [];
  let beginProj = new Project("Getting Started ...");
  let beginNote = new Note(
    "New Note",
    "Add any info you wamt hear....",
    "2023-09-11",
    "black"
  );
  beginProj.notes.push(beginNote);
  collection.push(beginProj);
  let currentProj = collection[0];
  this.getCurrentProject = () => currentProj;
  this.updateCurrentProject = function (proj) {
    currentProj = proj;
  };
  this.getCollection = () => collection;

  this.addProject = function (item) {
    let flag = true;
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].name === item) {
        alert("Name already Taken!");
        flag = false;
        break;
      }
    }
    if (flag) {
      let proj = new Project(item);
      collection.push(proj);
    }
  };
  this.addNoteToProject = function (proj, title, description, dueDate,priority) {
    let note = new Note(title, description, dueDate,priority);
    proj.notes.push(note);
  };
  this.editNoteToProject = function (
    noteId,
    edittitle,
    editdescription,
    editDueDate,
    editPriority
  ) {
    currentProj.notes.map((ele) => {
      if (ele.id === noteId) {
        ele.title = edittitle;
        ele.description = editdescription;
        ele.dueDate = editDueDate;
        ele.priority = editPriority
      }
    });
  };
  this.deleteProject = function (proj) {
    collection = collection.filter((item) => item !== proj);
  };
  this.deleteNote = function (noteId) {
    currentProj.notes = currentProj.notes.filter((item) => item.id !== noteId);
  };
  this.checkNote = function (noteId) {
    currentProj.notes.map((item) => {
      if (item.id === noteId) {
        item.check === false ? (item.check = true) : (item.check = false);
      }
    });
  };
  this.getProjectByID = function (name) {
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].name === item) {
        return i;
      }
    }
  };
}
function Project(name) {
  this.name = name;
  this.notes = [];
}
function Note(title, description, dueDate,priority) {
  this.id = Date.now();
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.check = false;
  this.priority = priority
}

function ScreenController() {
  let main = new Collection();
  let projectsList = main.getCollection();
  const projectsDiv = document.querySelector(".projects");
  const updateScreen = () => {
    projectsDiv.textContent = "";
    projectsList.map((item) => {
      const projectDiv = document.createElement("button");
      projectDiv.classList = "project-div-btn";
      projectDiv.textContent = item.name;
      projectsDiv.appendChild(projectDiv);
    });
  };
  function updateNotes() {
    let proj = main.getCurrentProject();
    const rightDiv = document.querySelector(".right");
    const notesDiv = document.querySelector(".notes");
    rightDiv.style.display = "block";
    projectsList.forEach((item) => {
      if (item.name === proj.name) {
        notesDiv.textContent = "";
        item.notes.forEach((ele) => {
          const note = document.createElement("div");
          note.classList = "note";
          const title = document.createElement("h3");
          title.classList = "note-title";
          title.textContent = ele.title;
          const description = document.createElement("p");
          description.classList = "note-description";
          description.textContent = ele.description;
          const dueDate = document.createElement("p");
          dueDate.classList = "note-due-date";
          dueDate.textContent = ele.dueDate;
          const deleteNote = document.createElement("button");
          deleteNote.classList = "note-delete";
          deleteNote.textContent = "del";
          note.id = ele.id;
          const check = document.createElement("input");
          check.type = "checkbox";
          check.name = "check";
          check.id = "note-check";
          const status = document.createElement("p");
          status.classList = "note-status";
          status.textContent = "pending";
          if (ele.check === true) {
            status.textContent = "DONE";
            check.checked = true;
          }
          const editBtn = document.createElement("button");
          editBtn.classList = "note-edit";
          editBtn.textContent = "edit";
          note.style.borderColor = ele.priority
          note.append(title);
          note.append(description);
          note.append(dueDate);
          note.append(deleteNote);
          note.append(editBtn);
          note.append(check);
          note.append(status);
          notesDiv.append(note);
        });
      }
    });
  }
  function upCurrentProj(e) {
    projectsList.forEach((item) => {
      if (item.name === e.target.textContent) {
        main.updateCurrentProject(item);
      }
    });
    updateNotes();
  }
  function addNotes(e) {
    if (noteForm.classList.value === "note-form-inp") {
      e.preventDefault();
      let noteTitle = document.getElementById("note-title-inp");
      let noteDescription = document.getElementById("note-description-inp");
      let noteDueDate = document.getElementById("note-due-date-inp");
      let notePriority1 = document.getElementById("note-priority-1");
      let notePriority2 = document.getElementById("note-priority-2");
      let notePriority3 = document.getElementById("note-priority-3");
      let notePriority = document.querySelectorAll('input[name="priority"]:checked')
      let priorityColorValue = notePriority.length>0 ? notePriority[0].value : "black"
      console.log(priorityColorValue);
      console.log(notePriority1,notePriority2,notePriority3);
      if (noteTitle.value === "") {
        alert("Enter some text");
      } else {
        projectsList.forEach((item) => {
          if (item.name === main.getCurrentProject().name) {
            main.addNoteToProject(
              item,
              noteTitle.value,
              noteDescription.value,
              noteDueDate.value,
              priorityColorValue
            );
          }
        });
        updateNotes();
      }
      noteTitle.value = "";
      noteDescription.value = "";
      noteDueDate.value = "";
      notePriority1.checked = false
      notePriority2.checked = false
      notePriority3.checked = false

      noteForm.style.display = "none";
    }
  }
  function addProjects(e) {
    e.preventDefault();
    let name = document.getElementById("project-name");
    if (name.value === "") {
      alert("Enter some text!");
    } else {
      main.addProject(name.value);
    }
    name.value = "";
    projectForm.style.display="none"
    projectsFormBtn.style.display="block"
    updateScreen();
  }
  function deleteNote(e) {
    if (e.target.classList.value === "note-delete") {
      main.deleteNote(parseInt(e.target.parentNode.id));
      updateNotes();
    }
  }
  function checkNote(e) {
    if (e.target.id === "note-check") {
      main.checkNote(parseInt(e.target.parentNode.id));
    }
    updateNotes();
  }
  function editNote(e){
    e.preventDefault();
    let noteTitleEdit = document.getElementById("note-title-edit");
    let noteDescriptionEdit = document.getElementById("note-description-edit");
    let noteDueDateEdit = document.getElementById("note-due-date-edit");
    let notePriorityEdit = document.querySelectorAll('input[name="priority-edit"]:checked')
    let priorityColorValueEdit = notePriorityEdit.length>0 ? notePriorityEdit[0].value : "black"

    main.editNoteToProject(
      editNoteId,
      noteTitleEdit.value,
      noteDescriptionEdit.value,
      noteDueDateEdit.value,
      priorityColorValueEdit
    );
    updateNotes();
    noteFormEdit.style.display = "none";
    editNoteId=null;
  }
  function editNoteForm(e){
    if (e.target.classList.value === "note-edit") {
        let noteFormEdit = document.querySelector(".note-form-edit");
        noteFormEdit.style.display = "block";
        let noteTitleEdit = document.getElementById("note-title-edit");
        let noteDescriptionEdit = document.getElementById(
          "note-description-edit"
        );
        let noteDueDateEdit = document.getElementById("note-due-date-edit");
        
        noteTitleEdit.value =
          e.target.parentNode.querySelector(".note-title").textContent;
        noteDescriptionEdit.value =
          e.target.parentNode.querySelector(".note-description").textContent;
        noteDueDateEdit.value =
          e.target.parentNode.querySelector(".note-due-date").textContent;
        editNoteId= parseInt(e.target.parentNode.id);
        let notePriorityEdit1 = document.getElementById("note-priority-1-edit");
    let notePriorityEdit2 = document.getElementById("note-priority-2-edit");
    let notePriorityEdit3 = document.getElementById("note-priority-3-edit");
    notePriorityEdit1.checked = false
    notePriorityEdit2.checked = false
    notePriorityEdit3.checked = false
      }
  }
  //adding projects to collections
  let projectForm = document.querySelector(".project-form");
  projectForm.addEventListener("submit", addProjects);
  //updating currentProject selected
  projectsDiv.addEventListener("click", upCurrentProj);
  //taking input from form and updating notes to respective project
  let noteForm = document.querySelector(".note-form-inp");
  noteForm.addEventListener("submit", addNotes);
  //deleting notes
  document.addEventListener("click", deleteNote);
  //marking notes as completed or not
  document.addEventListener("change", checkNote);
  // editing note and updating the form of editing
  let editNoteId =null;
  document.addEventListener("click", editNoteForm);
  //submitting and updating the ntes in the project
  let noteFormEdit = document.querySelector(".note-form-edit");
  noteFormEdit.addEventListener("submit", editNote);
  //to make the adding note form appear
  const noteFormBtn = document.querySelector(".note-form-btn");
  //making addNote form appear by clicking +
  noteFormBtn.addEventListener("click", () => {
    noteForm.style.display = "block";
  });
  const projectsFormBtn = document.querySelector(".project-form-btn")
  projectsFormBtn.addEventListener("click",()=>{
    projectForm.style.display="flex"
    projectsFormBtn.style.display="none"
  })
  const noteFormCloseBtn = document.querySelector(".note-form-close")
  noteFormCloseBtn.addEventListener("click",()=>{
    noteForm.style.display="none"
  })
  const noteFormCloseEditBtn = document.querySelector(".note-form-close-edit")
  noteFormCloseEditBtn.addEventListener("click",()=>{
    noteFormEdit.style.display="none"
  })
  console.log(main.getCollection());
  updateScreen();
  updateNotes();
}
ScreenController();
