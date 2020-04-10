import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(function () {
    fetchRepositories();
  }, []);

  async function fetchRepositories() {
    const response = await api.get("repositories");
    setRepository(response.data);
  }

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      url: "https://github.com/Rocketseat/umbriel",
      title: `Repository ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"],
    });

    setRepository([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    fetchRepositories();
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((item) => (
          <li key={item.id || item.title}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
