import "./styles/style.css"
function Collection(){
    let collection=[]
    this.getCollection = () => collection
    this.addProject = (proj) => collection.push(proj);
    this.addNoteToProject = function(proj,note){
        proj.notes.push(note);
    }
    this.deleteProject = function(proj){
        collection=collection.filter((item)=> item !== proj)
    }
    this.deleteNote = function(proj,note){
        proj.notes = proj.notes.filter((item) => item!==note )
    }
}
function Project(name){
    this.name = name;
    this.notes = [];
}
function Note(title,description,dueDate,priority){
    this.title=title;
    this.description= description;
    this.dueDate = dueDate;
    this.priority=priority;
    this.check = check;
    
}

const proj1=new Project("Dune");
console.log(proj1.name)
const note1=new Note("what to do?")
const note2=new Note("what to do? 2")
console.log(note1)
//note1.addNoteToProject;
const vari = new Collection();
vari.addProject(proj1);
vari.addNoteToProject(proj1,note1)
vari.addNoteToProject(proj1,note2)
const proj2 = new Project("mistborn")
vari.addProject(proj2);
vari.addNoteToProject(proj2,note2)
vari.addNoteToProject(proj2,note1)
const proj3 = new Project("misty")
vari.addProject(proj3);
console.log(vari.getCollection());
vari.deleteNote(proj2,note1);
vari.deleteNote(proj1,note2);
