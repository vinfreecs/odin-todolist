import "./styles/style.css";
function Collection() {
    let collection = [];
    let beginProj = new Project("Getting Started ...")
    let beginNote = new Note("New Note")
    beginProj.notes.push(beginNote)
    collection.push(beginProj)
    let currentProj = collection[0];
    console.log(currentProj);
    this.getCurrentProject = () => currentProj;
    this.updateCurrentProject = function (proj) {
        currentProj = proj
    }
    this.getCollection = () => collection;

    this.addProject = function (item) {
        let flag = true;
        for (let i = 0; i < collection.length; i++) {
            if (collection[i].name === item) {
                alert("Name already Taken!")
                flag = false;
                break;
            }
        }
        if (flag) {
            let proj = new Project(item);
            collection.push(proj);
        }

    }
    this.addNoteToProject = function (proj, title) {
        let note = new Note(title)
        proj.notes.push(note);
    };
    this.deleteProject = function (proj) {
        collection = collection.filter((item) => item !== proj);
    };
    this.deleteNote = function (proj, note) {
        proj.notes = proj.notes.filter((item) => item !== note);
    };
    this.getProjectByID = function (name) {
        for (let i = 0; i < collection.length; i++) {
            if (collection[i].name === item) {
                return i
            }
        }
    }
}
function Project(name) {
    this.name = name;
    this.notes = [];
}
function Note(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    //   this.check = false;
    //   this.handleCheck = function (proj, note) {
    //     this.check = true;
    //     vari.deleteNote(proj, note);
    //   };
}

function ScreenController() {
    let main = new Collection();
    let projectsList = main.getCollection()
    const projectsDiv = document.querySelector(".projects")
    const updateScreen = () => {
        projectsDiv.textContent = ""
        projectsList.map((item) => {
            const projectDiv = document.createElement("div")
            projectDiv.classList = "project-div"
            projectDiv.textContent = item.name
            projectsDiv.appendChild(projectDiv)
        })
    }
    //adding projects to collections
    let projectForm = document.querySelector(".project-form")
    projectForm.addEventListener("submit", (e) => {
        e.preventDefault()
        console.log(main.getCurrentProject())
        let name = document.getElementById("project-name")
        if (name.value === "") {
            alert("Enter some text!")
        } else {
            main.addProject(name.value)
        }
        name.value = ""
        updateScreen();
    })
    console.log(main.getCurrentProject())
    function updateNotes() {
        let proj = main.getCurrentProject()
        console.log(main.getCurrentProject())
        const rightDiv = document.querySelector(".right")
        const notesDiv = document.querySelector(".notes")
        rightDiv.style.display = "block"
        projectsList.forEach(item => {
            if (item.name === proj.name) {
                notesDiv.textContent = ""
                item.notes.forEach(ele => {
                    const note = document.createElement("div")
                    note.classList = "note"
                    const title = document.createElement("h3")
                    title.classList = "note-title"
                    title.textContent = ele.title
                    note.append(title)
                    notesDiv.append(note)
                })
            }
        });
    }
    function upCurrentProj(e) {
        projectsList.forEach(item => {
            if (item.name === e.target.textContent) {
                main.updateCurrentProject(item)
            }
        })
        updateNotes()
    }
    projectsDiv.addEventListener("click", upCurrentProj)
    let noteForm = document.querySelector(".note-form")
    noteForm.addEventListener("submit", (event) => {
        event.preventDefault()
        console.log(main.getCurrentProject())
        let noteTitle = document.getElementById("note-title")
        if (noteTitle.value === "") {
            alert("Enter some text")
        } else {
            projectsList.forEach(item => {
                if (item.name === main.getCurrentProject().name) {
                    main.addNoteToProject(item, noteTitle.value)
                }
            });
            console.log(noteTitle.value);
            updateNotes()
        }
    })
    console.log(main.getCollection());
    updateScreen();
}
ScreenController();
// console.log(proj1.name)
// const note1=new Note("what to do?")
// const note2=new Note("what to do? 2")
// console.log(note1)
// const vari = new Collection();
// vari.addProject(proj1);
// vari.addNoteToProject(proj1,note1)
// vari.addNoteToProject(proj1,note2)
// const proj2 = new Project("mistborn")
// vari.addProject(proj2);
// vari.addNoteToProject(proj2,note2)
// vari.addNoteToProject(proj2,note1)
// const proj3 = new Project("misty")
// vari.addProject(proj3);
// console.log(vari.getCollection());

