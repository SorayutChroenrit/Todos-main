import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = ({setToken}) => {
  const [CurBtn, setCurBtn] = useState("");
  const btnStyle = { width: "90px", margin: "10px" };
    const homeRef = useRef()
    const ProductRef = useRef()
    const cartsRef = useRef()
    const aboutRef = useRef()
    const todosRef = useRef()
  useEffect(() => {
    homeRef.current.click()
  } , [])
  return (
    <div>
      <Link to={'/'}>
        <button
          className={
            "btn btn-outline-primary" + (CurBtn === "home" ? " active" : "")
          }
          style={btnStyle}
          onClick={() => setCurBtn("home")}
          ref={homeRef}
        >
          Home
        </button>
      </Link>
      <Link to={'/todos'}>
        <button
          className={
            "btn btn-outline-primary" + (CurBtn === "todos" ? " active" : "")
          }
          style={btnStyle}
          onClick={() => setCurBtn("todos")}
          ref={todosRef}
        >
          Todos
        </button>
      </Link>
      <Link to={'/products'}>
      <button
        className={
          "btn btn-outline-primary" + (CurBtn === "product" ? " active" : "")
        }
        style={btnStyle}
        onClick={() => setCurBtn("product")}
        ref={ProductRef}
      >
        Products
      </button>
      </Link>
      <Link to={'/carts'}>
      <button
        className={
          "btn btn-outline-primary" + (CurBtn === "carts" ? " active" : "")
        }
        style={btnStyle}
        onClick={() => setCurBtn("carts")}
        ref={cartsRef}
      >
        Cart
      </button>
      </Link>
      <Link to={'/about'}>
      <button
        className={
          "btn btn-outline-primary" + (CurBtn === "about" ? " active" : "")
        }
        style={btnStyle}
        onClick={() => setCurBtn("about")}
        ref={aboutRef}
      >
        About
      </button>
      </Link>
      <button
        className={
          "btn btn-outline-danger"
        }
        onClick={() => setToken('')}
        ref={aboutRef}
      >
        Logout
      </button>
      <hr/>
    </div>
  );
};
