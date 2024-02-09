import { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase.Config";
import { toast } from "react-toastify";

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState();
  const todo = useRef();
  const val = useRef();
  const user = auth.currentUser;
  const userId = user.uid;

  // fetch data here
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "todos"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const todos = [];
        querySnapshot.forEach((doc) => {
          todos.push({ id: doc.id, ...doc.data() });
        });
        setTodoList(todos);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  // add todos here firebase and list
  async function handleAddTodo(e) {
    e.preventDefault();
    if (todo.current.value === "") {
      toast.info("🦄 kuch to likh ...", {
        position: "top-center",
      });
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        title: todo.current.value,
        userId: userId,
      });

      toast.success("Todo added successfully");
      const newTodo = { id: docRef.id, title: todo.current.value, userId };
      setTodoList([...todoList, newTodo]);
      todo.current.value = "";
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  // Delete here
  function handleDel(id) {
    deleteDoc(doc(db, "todos", id));
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
    toast.warning("Todo deleted successfully");
  }

  // updating here
  function handleUpd(id) {
    setEditIndex(id);
  }

  async function handleSave(id) {
    if (val.current.value === "") {
      toast.info("🦄 No empty plz", {
        position: "bottom-center",
      });
      return;
    }
    try {
      const todoIndex = todoList.findIndex((todo) => todo.id === id);
      const todoDocRef = doc(db, "todos", id);
      await updateDoc(todoDocRef, { title: val.current.value });

      setTodoList((prevTodoList) => {
        const updatedTodoList = [...prevTodoList];
        updatedTodoList[todoIndex] = {
          ...updatedTodoList[todoIndex],
          title: val.current.value,
        };
        return updatedTodoList;
      });
      toast.success("🎉 Todo Updated", {
        position: "top-right",
      });
      setEditIndex(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="todos w-[75%] flex h-[80vh] mt-5 bg-slate-500 rounded-xl">
        <div className="w-[55%] h-[100%] text-white flex justify-center items-center flex-col">
          <form className="" onSubmit={handleAddTodo}>
            <div className=" flex justify-center items-center flex-col gap-5">
              {/* <input type="text" placeholder="Title" ref={todo} /> */}
              <input
                type="text"
                placeholder="Type here"
                className=" bg-transparent input input-bordered w-full max-w-xs"
                ref={todo}
              />
              <button
                type="submit"
                className="btn btn-wide btn-outline btn-secondary"
              >
                Secondary
              </button>
            </div>
          </form>
        </div>
        <div className="h-[98%] w-[45%] overflow-y-scroll overflow-x-hidden py-[10px]  text-white">
          <div>
            {todoList.map((el, ind) => (
              <div
                key={ind}
                className="card w-100 bg-neutral my-2 text-neutral-content"
              >
                <div className="flex-row card-body py-[10px] items-center text-center">
                  {/* <div key={ind}> */}
                  {editIndex !== el.id ? (
                    <p className="card-title">{el.title}</p>
                  ) : (
                    <input type="text" ref={val} />
                  )}

                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDel(el.id)}
                    >
                      Delete
                    </button>
                    {editIndex !== el.id ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleUpd(el.id)}
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleSave(el.id)}
                      >
                        Save
                      </button>
                    )}
                  </div>
                  {/* </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div
        className="flex justify-center items-center"
        style={{ height: "50vh" }}
      >
        <form className="w-50" onSubmit={handleAddTodo}>
          <input type="text" placeholder="Title" ref={todo} />

          <button type="submit">Add Todo</button>
        </form>
      </div> */}
      {/* <div>
        {todoList.map((el, ind) => (
          <div key={ind}>
            {editIndex !== el.id ? (
              <p>{el.title}</p>
            ) : (
              <input type="text" ref={val} />
            )}
            <button onClick={() => handleDel(el.id)}>Delete</button>
            {editIndex !== el.id ? (
              <button onClick={() => handleUpd(el.id)}>Edit</button>
            ) : (
              <button onClick={() => handleSave(el.id)}>Save</button>
            )}
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Todo;
