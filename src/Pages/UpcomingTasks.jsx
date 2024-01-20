import React from 'react'

const UpcomingTasks = ({
    upcomingFormData,
    handleUpcomingChange,
    upcomingAddTask,
    upcomingEmptyTaskErrorMsg,
    upcomingTasks
    }) => {

        console.log(upcomingTasks)

  return (
    <>
    <div className='m-4 p-2 text-2xl font-semibold'>
        Plan your upcoming tasks
    </div>
    <form onSubmit={upcomingAddTask} className='m-4 p-2  rounded-lg shadow-lg flex flex-col' >
        <input value={upcomingFormData.title} onChange={handleUpcomingChange} type="text" name="title" id="" placeholder='Enter task' />
        <input value={upcomingFormData.description} onChange={handleUpcomingChange} type="text" name="description" id="" placeholder='Enter description'/>
        <input value={upcomingFormData.dueDate} onChange={handleUpcomingChange} type="datetime-local" name="dueDate" id="" />
        <button>add task</button>
    </form>
    <p>{upcomingEmptyTaskErrorMsg}</p>
    </>
  )
}

export default UpcomingTasks