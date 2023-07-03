import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios"; 
import { useNavigate } from 'react-router-dom';


const Task = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    deadline: "",
  });
 const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
 

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/tasks/${id}`)
      .then((response) => {
        setTask(response.data);
        
        console.log(response.data);
        setLoading(false);
      })

      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);



  function formHandler(e) {
    e.preventDefault();
    setLoading(true);
    setBtnLoading(true);
    axios
      .put(`http://localhost:3001/tasks/${id}`, task)
      .then((response) => { 
        setBtnLoading(false); 
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }



  return (
    <Fragment>
      
      <form onSubmit={formHandler} className="my-8 grid rounded px-6 py-8 grid-cols-1 gap-8 max-w-4xl mx-auto bg-gray-50">
      <h1 className='text-2xl'>Update Task</h1>
    <div className="">
      <label htmlFor="title" className="py-2 text-lg block">
        Title
      </label>
      <input
      value={task.title}
      required
        onChange={(e) =>
          setTask({ ...task, title: e.target.value })
        }
        type="text"
        className="px-3 py-1 block ring-1 w-full ring-gray-300 rounded-sm"
        placeholder="Name"
        name=""
        id="title"
      />
    </div>
    <div className="">

      <label htmlFor="desc" className="py-2 text-lg block">
        Description
      </label>
      <input
      value={task.description}
        required
        onChange={(e) =>
          setTask({ ...task, description: e.target.value })
        }
        type="text"
        className="px-3 w-full py-1 block ring-1 ring-gray-300 rounded-sm"
        placeholder="title"
        name=""
        id="desc"
      />
    </div>
    <div className="">
      <label htmlFor="date" className="py-2 text-lg block">
        Deadline
      </label>
      <input
      value={task.deadline}

        onChange={(e) =>
          setTask({ ...task, deadline: e.target.value })
        }
        type="date"
        required
        className="px-3 py-1 w-full block ring-1 ring-gray-300 rounded-sm"
        placeholder="email@"
        name="date"
        id="date"
      />
    </div>
    <button
      type="submit" 
      className=" mb-8 rounded-md bg-indigo-600 flex items-center justify-center px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
     {
     btnLoading === false ?  'Add Task' : 
     <div role="status">
    <svg
      aria-hidden="true"
      class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span class="sr-only">Loading...</span>
  </div>
      }
    </button>
  </form>
    </Fragment>
  )
}

export default Task