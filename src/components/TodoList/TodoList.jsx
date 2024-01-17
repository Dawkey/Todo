import { React } from 'react';
import './TodoList.scss';

export default function TodoList(props) {

  const {
    data, 
    editTodo, 
    deleteTodo, 
    checkTodo,
    hideFinishFlag,
    multiDeleteFlag,
    deleteIndexsSet,
    checkDeletedTodo
  } = props;

  function getTodoListDom() {
    return data.map((todoItem, index)=>{
      if(hideFinishFlag && todoItem.isFinished){
        return '';
      }
      return(
        <div
          className='item-container' 
          key={todoItem.id}
          onClick={()=>{
            if(multiDeleteFlag){
              checkDeletedTodo(index);
            }else{
              editTodo(index);
            }            
          }}
        >
          <div
            className={'button-check ' + (todoItem.isFinished ? 'icon-checked' : 'icon-unchecked')}
            style={{display: multiDeleteFlag ? 'none' : 'block'}}
            onClick={(e)=>{
              e.stopPropagation();
              checkTodo(index);
            }}
          />
          {!todoItem.isImportant ? '' : <div className='icon-point'/>}
          <div className='todo-item'>
            <div className={'item-content ' + (todoItem.isFinished ? 'checked' : '')}>
              {todoItem.content}
            </div>
          </div>
          <div 
            className='button-delete icon-delete'
            style={{display: multiDeleteFlag ? 'none' : 'block'}}
            onClick={(e)=>{
              e.stopPropagation();
              deleteTodo(index);
            }}
          />
          <div
            className={'button-check2 ' + (deleteIndexsSet.has(index) ? 'icon-checked2' : 'icon-unchecked2')}
            style={{display: multiDeleteFlag ? 'block' : 'none'}}
          />
        </div>        
      )
    });
  }

  return (
    <div className='todo-list'>
      {getTodoListDom()}      
    </div>
  );
}