import React from "react";
import swal from '@sweetalert/with-react'

function App() {
  const [task, setTask] = React.useState("");
  const [taskList, setTaskList] = React.useState([]);
  const [editMode, setEditMode] = React.useState(false);
  const [id, setId] = React.useState('');
  const [err, setErr] = React.useState('')

  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) {
      setErr("Empty task!");
      return;
    }
    setTaskList([...taskList, { id: taskList.length, taskName: task }]);
    setTask("")
    setErr("")
  };


  const removeTask = (id) => {
    swal(
      {
        title: 'This task will be removed permanently!',
        text: 'Continue?',
        icon: 'warning',
        dangerMode: true,
        buttons: true
      })
      .then((value) => {
        if (value) {
          const newList = taskList.filter(task => task.id !== id)
          setTaskList(newList)
          setEditMode(false)
          setTask('')
          swal('Successfully Removed!', '  ', 'success', { buttons: false, timer: 1200 })
        }
      })
  }

  const edit = (task) => {
    setErr('')
    editMode ? setErr('Already Editing!') : setEditMode(true)
    setTask(task.taskName)
    setId(task.id)
  }

  const editTask = (e) => {
    e.preventDefault();
    if (!task.trim()) {
      setErr("Empty task!");
      return;
    }

    const editedTask = taskList.map(item => item.id === id ? { id: id, taskName: task } : item)
    setTaskList(editedTask)
    setEditMode(false)
    setTask('')
    setId('')
    setErr('')
  }

  const cancelEdit = (e) => {
    e.preventDefault()
    setTask('')
    setErr('')
    setEditMode(false)
  }

  const clearList = () => {
    swal({
      title: 'The tasks list will be cleared permanently!',
      text: 'Continue?',
      icon: 'warning',
      dangerMode: true,
      buttons: true
    })
      .then((value) => {
        if (value) {
          setTaskList("")
          setEditMode(false)
          setTask('')
          swal('Successfully Cleared!', '  ', 'success', { buttons: false, timer: 1200 })
        }
      })
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center header">Task Manager</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4 className="text-center mb-4 header">
            {editMode ? "Edit Task" : "Add a Task"}
          </h4>
          <form onSubmit={editMode ? editTask : addTask}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter a task"
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />

            {err ? <h6 className="text-danger text-center" style={{ 'fontSize': '12px' }}>{err}</h6> : null}

            {
              editMode ? <button
                className={"btn btn-warning btn-block"}
                type="submit">
                Edit Task
              </button> : <button
                className="btn btn-info btn-block"
                type="submit">
                Add
              </button>
            }
            <button
              type="reset"
              onClick={cancelEdit}
              className="btn btn-danger btn-block mt-2"
              hidden={editMode ? false : true}>
              Cancel
            </button>
            {
              taskList.length !== 0 ? (
                <button onClick={clearList} type="reset" className="btn btn-dark btn-block">Clear</button>
              ) : null
            }
          </form>
        </div>
        <div className="col-7">
          <h4 className="text-center mb-4 header">Tasks List</h4>
          <ul className="list-group">
            {taskList.length === 0
              ? (<li className="list-group-item text-capitalize mb-2 shadow font-weight-bold text-center bg header">no tasks pending</li>)
              : (
                taskList.map((task) => (
                  <li key={task.id} className="list-group-item text-dark text-capitalize mb-2 shadow bg">
                    <span className="lead font-weight-bold header">{task.taskName}</span>
                    <button onClick={() => removeTask(task.id)} className="btn btn-danger btn-sm float-right mx-2">
                      Remove
                    </button>
                    <button onClick={() => edit(task)} className="btn btn-warning btn-sm float-right">
                      Edit
                    </button>
                  </li>
                ))
              )}

          </ul>
        </div>
      </div>
    </div >
  );
}

export default App;
