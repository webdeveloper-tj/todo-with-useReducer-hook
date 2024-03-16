import { useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
//init State
const initState = {
  job: "",
  jobs: ["Hello To do App"],
};
// Action
const SET_JOB = "set_job";
const SET_ADD = "set_add";
const SET_DELETE = "set_delete";
const SET_EDIT = "set_edit";
const Set_job = (playlod) => {
  return {
    type: SET_JOB,
    playlod,
  };
};
const Set_add = (playlod) => {
  return {
    type: SET_ADD,
    playlod,
  };
};
const Set_delete = (playlod) => {
  return {
    type: SET_DELETE,
    playlod,
  };
};
const Set_edit = (playlod) => {
  return {
    type: SET_EDIT,
    playlod,
  };
};
let newState;
function reducer(state, action) {
  switch (action.type) {
    case SET_JOB:
      return (newState = {
        ...state,
        job: action.playlod,
      });
      break;
    case SET_ADD:
      if (!state.jobs.includes(action.playlod)) {
        return (newState = {
          ...state,
          job: "",
          jobs: [...state.jobs, action.playlod],
        });
      } else {
        return newState;
      }
      break;
    case SET_DELETE:
      const newJobs = [...state.jobs];
      newJobs.splice(action.playlod, 1);

      return (newState = {
        ...state,
        jobs: newJobs,
      });
      break;
    default:
      throw new Error("Invalid action type please use SET_ADD");
  }
  return state;
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const input_ = useRef();
  const [edit, setEdit] = useState(false);
  const [texts, setTexts] = useState([]);
  const [currentIndexForEdit, setCurrentIndexForEdit] = useState(0);
  const { job, jobs } = state;
  useEffect(() => {}, [jobs]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!job == "") {
      dispatch(Set_add(job));
    }
    input_.current.focus();
  };
  const handleDelete = (index) => {
    dispatch(Set_delete(index));
  };
  return (
    <div className="App container-fluid">
      <h1 className="text-center">
        To do with hook <strong>useReducer</strong>
      </h1>
      <div className="container_add w-75 mx-auto border rounded shadow p-3">
        <form className="mx-auto row">
          <input
            ref={input_}
            type="text"
            placeholder="Add list"
            className="col-8 mr-3 form-control"
            value={job}
            onChange={(e) => {
              dispatch(Set_job(e.target.value));
            }}
          />
          <button className="btn btn-sm btn-primary" onClick={handleSubmit}>
            add
          </button>
        </form>
        <>
          {!jobs.length == 0 ? (
            jobs.map((job, index) => (
              <div className="my-3 border p-2" key={index}>
                <p>
                  <span>{job}</span>
                </p>
                <button
                  className="btn btn-sm btn-info mr-2"
                  onClick={(e) => {
                    setEdit(true);
                    setCurrentIndexForEdit(index);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <h1 className="my-5 text-center">No any List</h1>
          )}
        </>
      </div>
      {edit && (
        <Edit
          setEdit={setEdit}
          currentIndexForEdit={currentIndexForEdit}
          state={state}
        />
      )}
    </div>
  );
}
export function Edit({ setEdit, currentIndexForEdit, state }) {
  const editСondition = useRef();
  const [textJob, setTextJob] = useState(state.jobs[currentIndexForEdit]);
  const newJobs = state.jobs;
  const handleSave = (e) => {
    e.preventDefault();
    if (!editСondition.current.value == "") {
      state.jobs[currentIndexForEdit] = editСondition.current.value;
      setEdit(false);
    } else {
      alert("Please inter the text");
    }
  };
  return (
    <div className="Edit">
      <div className="form_edit ">
        <form className="save" onSubmit={handleSave}>
          <input
            ref={editСondition}
            type="text"
            className="form-control "
            value={textJob}
            onChange={(e) => setTextJob(e.target.value)}
          />
          <button className="btn btn bg-success">Save</button>
        </form>
        <button
          className="cancel btn btn bg-secondary"
          onClick={() => setEdit(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
