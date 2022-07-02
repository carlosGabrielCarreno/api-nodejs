const { request, response } = require("express");
const express = require("express");
// distinto a ecmascript modules: import http from "http"
const app = express();
//app tiene que usar:
app.use(express.json());
// cuando se haga una peticion del tipo get:
//mock
let notes = [
  { content: "hacer algo1", id: 12, important: true, date: "20390/234/1" },
  { content: "hacer algo2", id: 13, important: true, date: "20390/234/2" },
  { content: "hacer algo3", id: 14, important: true, date: "20390/234/3" },
  { content: "hacer algo3", id: 15, important: true, date: "20390/234/3" },
];
app.get("/", (request, response) => {
  response.send("<h1>hola gabi</h1>");
});

app.get("/api/notes/", (request, response) => {
  response.json(notes);
});
// utilizar dinamismo...
app.get("/api/notes/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    // podria manejar el error de cualquier otra forma, esta es solo una sugerencia!
    response.status(404).end;
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  //notes = [...notes.filter((note) => note.id !== id)]; // esta es una forma
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const note = request.body;

  // validar si existe note
  if (!note || !note.content) {
    return response.status(400).json({
      error: "note.content is missing",
    });
  }

  //const newId = ++notes[notes.length - 1].id; // logica imperativa
  const ids = notes.map(({ id }) => id);
  const maxId = Math.max(...ids);

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== "undefined" ? note.important : false, // for default is false,
    date: new Date().toISOString(),
  };

  notes = [...notes, newNote];
  //notes = notes.concat(newNote)

  response.status(201).json(newNote);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
