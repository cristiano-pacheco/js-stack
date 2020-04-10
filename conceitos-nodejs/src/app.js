const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const repository = {
    id: uuid(),
    title: request.body.title,
    url: request.body.url,
    techs: [...request.body.techs],
    likes: 0,
  };
  repositories.push(repository);
  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  let repository = repositories.filter((item) => item.id === id);

  if (!repository || repository.length === 0) {
    return response.status(400).json();
  }

  const { title, url, techs } = request.body;

  repository[0].title = title;
  repository[0].url = url;
  repository[0].techs = techs;

  repositories.forEach((item) => {
    if (item.id !== id) {
      return;
    }
    item = repository;
  });

  return response.json(repository[0]);
});

app.delete("/repositories/:id", (request, response) => {
  repository = repositories.filter((item) => item.id === request.params.id);

  if (!repository || repository.length === 0) {
    return response.status(400).json();
  }

  for (var i = 0; i < repositories.length; i++) {
    if (repositories[i].id === request.params.id) {
      repositories.splice(i, 1);
      return response.status(204).json();
    }
  }

  return response.status(400).json(null);
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  repositories.forEach((item) => {
    if (item.id === id) {
      item.likes += 1;
      return response.json(item);
    }
  });
  return response.status(400).json(null);
});

module.exports = app;
