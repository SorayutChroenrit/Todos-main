import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from 'sweetalert2';

// const itemPerPage = 5;

export const Todos = ({ todosRaw, setTodosRaw }) => {
  // const [todosRaw, setTodosRaw] = useState([]);
  const [itemsPerPage,setItemsPerPage] = useState(5)

  const [todos, setTodos] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [onlyWaiting, setOnlyWaiting] = useState(false);

  // useEffect(() => {
  //    setTodos(fetchTodos);
  //   setTodosRaw(fetchTodos);
  // }, []);

  useEffect(() => {
    const selectedItem = todosRaw.filter((todo) => {
      return !onlyWaiting || !todo.completed;
    });
    setTodos(selectedItem);
  }, [todosRaw, onlyWaiting,itemsPerPage]);

  useEffect(() => {
    setNumPages(Math.ceil(todos.length / itemsPerPage));
  }, [todos]);

  useEffect(() => {
    if (numPages === 0) {
      setCurPage(0);
    } else {
      if (curPage === 0) {
        setCurPage(1);
      } else if (curPage > numPages) {
        setCurPage(numPages);
      }
    }
  }, [numPages]);

  const waitingClick = (id) => {
    const selectedItem = todos.find((todo) => {
      return todo.id === id;
    });
    // console.log(selectedItem)
    selectedItem.completed = true;
    // console.log(selectedItem)
    setTodosRaw([...todosRaw]);
  };

  const deleteClick = (id) => {
    const selectedItem = todos.filter((todo) => {
      return todo.id !== id;
      
    });
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        // console.log(selectedItem)
        setTodosRaw( selectedItem);
      }
    });
  };

  const todosHtml = todos.map((todo, index) => {
    const start = (curPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    if (start <= index && index < end)
      return (
        <tr key={todo.id}style={{ textAlign: "center" }}>
          <td>
            <span className="badge bg-secondary">{todo.id}</span>
          </td>
          {/*<td style={{ textAlign: "left" }}>{todo.userID}</td>*/}
          <td style={{ textAlign: "left" }}>{todo.title}</td>
          <td style={{ textAlign: "right" }}>
            {todo.completed ? (
              <button className="btn btn-sm btn-success">
                done <i className="bi bi-check2-square"></i>
              </button>
            ) : (
              <button
                className="btn btn-sm btn-warning"
                onClick={() => {
                  waitingClick(todo.id);
                }}
              >
                waiting <i className="bi bi-alarm"></i>
              </button>
            )}
            <button
              className="btn btn-sm btn-danger"
              style={{ marginLeft: "5px", textAlign: "right" }}
              onClick={() => {
                deleteClick(todo.id);
              }}
            >
              <i className="bi bi-trash3"></i>
            </button>
          </td>
        </tr>
      );
  });
  const [showAddmodal, setShowAddmodal] = useState(false);

  const idRef = useRef();
  const topicRef = useRef();
  const addClick = () => {
    setShowAddmodal(true);
  };
  
  const saveTodo = () => {
    const todo = {
      id: Number(idRef.current.innerText),
      userId: 0,
      title: topicRef.current.value,
      completed: false,
    };
    setTodosRaw([...todosRaw, todo]);
    idRef.current.innerText = "";
    topicRef.current.value = "";
    setShowAddmodal(false);
    Swal.fire({
      title: 'Success',
      text: 'Todo saved successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };
  const SelectChange = (event) => {
    const selectedValue = parseInt(event.target.value);
    setItemsPerPage(selectedValue);
  };
  return (
    <div>
      {/* modal */}
      <Modal
        show={showAddmodal}
        onHide={() => {
          setShowAddmodal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            id:{" "}
            <span className="badge bg-secondary" ref={idRef}>
              {todosRaw.reduce((prev, cur) => {
                return cur.id > prev ? cur.id : prev;
              }, 0) + 1}
            </span>
          </div>
          <div>
            Title: <br></br>
            <input type="text" ref={topicRef}></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowAddmodal(false);
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={saveTodo}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="form-check form-switch" style={{ textAlign: "left" }}>
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked={onlyWaiting}
            onChange={(e) => {
              setOnlyWaiting(e.target.checked);
            }}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Show only{" "}
            <button className="btn btn-sm btn-warning">
              waiting <i className="bi bi-alarm"></i>
            </button>
          </label>
        </div>
        <div>
        <select className="form-select" aria-label="Default select example" value={itemsPerPage} onChange={SelectChange} >
  <option value={5} >5 items per page</option>
  <option value={10} >10 items per page</option>
  <option value={50} >50 items per page</option>
  <option value={100} >100 items per page</option>
</select>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr className="table-dark">
            <th style={{ textAlign: "center" }}>ID</th>
            {/*<th>User ID</th>*/}
            <th style={{ textAlign: "left" }}>Title</th>
            <th style={{ textAlign: "right" }}>
              Completed
              <button
                className="btn btn-sm btn-primary"
                style={{ margin: "5px" }}
                onClick={addClick}
              >
                <i className="bi bi-plus-lg"></i>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>{todosHtml}</tbody>
      </table>
      <button
        className="btn btn-outline-primary"
        style={{ margin: "5px" }}
        onClick={() => setCurPage(1)}
        disabled={curPage === 1 ? true : false}
      >
        First
      </button>
      <button
        className="btn btn-outline-primary"
        style={{ margin: "5px" }}
        onClick={() => {
          if (curPage > 1) setCurPage((p) => p - 1);
        }}
        disabled={curPage === 1}
      >
        Previous
      </button>
      {curPage} / {numPages}
      <button
        className="btn btn-outline-primary"
        style={{ margin: "5px" }}
        onClick={() => {
          if (curPage < numPages) setCurPage((p) => p + 1);
        }}
        disabled={curPage === numPages}
      >
        Next
      </button>
      <button
        className="btn btn-outline-primary"
        style={{ margin: "5px" }}
        onClick={() => setCurPage(numPages)}
        disabled={curPage === numPages}
      >
        Last
      </button>
    </div>
  );
};
