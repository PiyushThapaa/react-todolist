import React from 'react'

const TodoItem = ({index,title,description,action,updateHandle,deleteHandler,id}) => {
  return (
    <div className='todo-container'>
        <div className='index'>{index+1}</div>
        <div className = "todo-section">
          <div className='todo'>{title}</div>
          <div className='desc'>{description}</div>
        </div>
        <div>
          <div className='action-label'>Action</div>
          <div> <input type={'checkbox'}  className='checkbox' checked={action} onChange={()=>{updateHandle(id)}} /> </div>
        </div>
          <div className='todo-btns'>
            <button className='dlt-btn' onClick={()=>{deleteHandler(id)}}>Delete</button>
          </div>
        </div>
  )
}

export default TodoItem