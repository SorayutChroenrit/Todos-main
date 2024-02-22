import { Layout } from "./components/Layout";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { Carts } from "./pages/Carts";
import { About } from "./pages/About";
import { Todos } from "./pages/Todos";

import { useState } from "react";
import { fetchTodos } from "./data/todo";
import { useEffect } from "react";
import { Login } from "./pages/Login";

function App() {
  const [todosRaw, setTodosRaw] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    setTodosRaw(fetchTodos);
  }, []);

  if (token === "") return <Login setToken={setToken} />;
  else
    return (
      <div>
        <HashRouter>
          <Routes>
            <Route element={<Layout setToken={setToken}/>}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route
                path="/todos"
                element={
                  <Todos todosRaw={todosRaw} setTodosRaw={setTodosRaw} />
                }
              />
              <Route path="/carts" element={<Carts />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    );
}

export default App;
