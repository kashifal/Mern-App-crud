import axios from "axios"; 
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [userForm, setUserForm] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/tasks")
      .then((response) => {
        setPeople(response.data);
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
      .post("http://localhost:3001/tasks", userForm)
      .then((response) => {
        
        setBtnLoading(false);
        setPeople(response.data);
        setUserForm({
          title: "",
          description: "",
          deadline: "",
        })
        console.log(userForm);
        setLoading(false);
        
        
        
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }


  const deletHandler = (id) => {
    setLoading(true); 
    axios
      .delete(`http://localhost:3001/tasks/${id}`)
      .then((response) => { 
        setPeople(response.data); 
        setLoading(false); 
      })
      .catch((error) => {           
        console.error(error);
        setLoading(false);
      });
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl py-16 mx-auto">
      <form onSubmit={formHandler} className="my-8 grid rounded px-6 py-8 grid-cols-1 gap-8 max-w-4xl mx-auto bg-gray-50">
        <div className="">
          <label htmlFor="title" className="py-2 text-lg block">
            Title
          </label>
          <input
          value={userForm.title}
          required
            onChange={(e) =>
              setUserForm({ ...userForm, title: e.target.value })
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
          value={userForm.description}
            required
            onChange={(e) =>
              setUserForm({ ...userForm, description: e.target.value })
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
          value={userForm.deadline}

            onChange={(e) =>
              setUserForm({ ...userForm, deadline: e.target.value })
            }
            type="date"
            required
            className="px-3 py-1 w-full block ring-1 ring-gray-300 rounded-sm"
           
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
          className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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

      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            All Tasks
          </h1>
        </div>
      </div>
       <div className={people.length <= 0 ? "mt-8 flow-root text-center" :" hidden"}>
        <h1 className="text-center px-6 py-3 bg-red-50 text-red-500 ">No Task</h1>
         </div>
      <div className={people.length <= 0 ? "hidden" :"mt-8 flow-root"}>
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    ></th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Deadline
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {people.map((person, index) => (
                    <tr key={person._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.deadline}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/task/${person._id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                            <span className="sr-only">, {person.title}</span>
                          </Link>
                          <button
                            onClick={() => deletHandler(person._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                            <span className="sr-only">, {person.title}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
