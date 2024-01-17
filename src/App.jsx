import { React, useMemo, useState } from 'react';
import './App.scss';
import './assets/icons/icons.css';
import TodoList from './components/TodoList/TodoList';
import TodoOperator from './components/TodoOperator/TodoOperator';
import MessageDialog from './components/MessageDialog/MessageDialog';

function App() {

  const [todoList, setTodoList] = useState([]);

  const [operatorType, setOperatorType] = useState("add");
  const [operatorEditIndex, setOperatorEditIndex] = useState(0);
  const [operatorShowFlag, setOperatorShowFlag] = useState(false);  

  const [mesDlgShowFlag, setMesDlgShowFlag] = useState(false);
  const [deleteIndexs, setDeleteIndexs] = useState([]);

  const [moreDlgShowFlag, setMoreDlgShowFlag] = useState(false);
  const [multiDeleteFlag, setMultiDeleteFlag] = useState(false);
  const [hideFinishFlag, setHideFinishFlag] = useState(false);

  const deleteIndexsSet = useMemo(()=>{
    return new Set(deleteIndexs);
  }, [deleteIndexs]);

  const multiDeleteDisable = useMemo(()=>{
    if(todoList.length === 0){
      return true;
    }
    if(hideFinishFlag){
      for(let todoItem of todoList){
        if(todoItem.isFinished === false){
          return false;
        }
      }
      return true;
    }
    return false;
  }, [todoList, hideFinishFlag]);

  function addTodo(){
    setOperatorType("add");
    setOperatorShowFlag(true);
  }

  function editTodo(index) {
    setOperatorType("edit");
    setOperatorEditIndex(index);
    setOperatorShowFlag(true);
  }

  function deleteTodo(index) {
    setDeleteIndexs([index]);
    setMesDlgShowFlag(true);
  }

  function deleteTodoList (){
    const indexSet = new Set(deleteIndexs);
    const newTodoList = todoList.filter((todoItem, index)=>{
      return !indexSet.has(index);
    });
    setTodoList(newTodoList);
    clearDeleteEffect();
  }

  function checkTodo(index) {
    const newTodoList = [...todoList];
    newTodoList[index].isFinished = !newTodoList[index].isFinished;
    setTodoList(newTodoList);
  }

  function checkDeletedTodo(index) {
    const newDeleteIndexs = deleteIndexs.filter((value)=>{
      return value !== index;
    });
    if(deleteIndexs.length === newDeleteIndexs.length){
      newDeleteIndexs.push(index);
    }
    setDeleteIndexs(newDeleteIndexs);
  }

  function clearDeleteEffect() {
    setDeleteIndexs([]);
    setMultiDeleteFlag(false);
  }

  return (
    <div className="App">

      <div className='todo-header'>
        待办事项
        <div 
          className='button-more icon-more'
          style={{display: multiDeleteFlag ? 'none' : 'block'}}
          onClick={()=>{setMoreDlgShowFlag(!moreDlgShowFlag)}}
        />
        <div
          className='button-close icon-close'
          style={{display: multiDeleteFlag ? 'block' : 'none'}}
          onClick={()=>{clearDeleteEffect()}}
        />
      </div>

      <div className='more-dialog'
        style={{display: moreDlgShowFlag ? 'block' : 'none'}}
        onClick={()=>{setMoreDlgShowFlag(false)}}
      >
        <div className='button-container'>
          <div 
            className='button-hide'
            onClick={()=>{setHideFinishFlag(!hideFinishFlag)}}
          >
            {!hideFinishFlag ? '隐藏已完成待办' : '显示已完成待办'}
          </div>
          <div 
            className={'button-start-multi-delete ' + (multiDeleteDisable ? 'disable' : '')}
            onClick={()=>{
              if(multiDeleteDisable) return;
              setMultiDeleteFlag(true);
              setMoreDlgShowFlag(false);
            }}
          >
            批量删除
          </div>
        </div>
      </div>

      <TodoList 
        data={todoList}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        checkTodo={checkTodo}
        hideFinishFlag={hideFinishFlag}
        multiDeleteFlag={multiDeleteFlag}
        deleteIndexsSet={deleteIndexsSet}
        checkDeletedTodo={checkDeletedTodo}
      />

      <div 
        className='button-add icon-add'
        style={{display: multiDeleteFlag ? 'none' : 'block'}}
        onClick={()=>{addTodo();}}
      />

      <div
        className={'button-multi-delete icon-delete ' + (deleteIndexs.length === 0 ? 'disable' : '')}
        style={{display: multiDeleteFlag ? 'block' : 'none'}}
        onClick={()=>{
          if(deleteIndexs.length === 0) return;
          setMesDlgShowFlag(true);
        }}
      />

      <TodoOperator
        type={operatorType}
        editIndex={operatorEditIndex}
        isShow={operatorShowFlag}
        setShowFlag={setOperatorShowFlag}
        todoList={todoList}
        setTodoList={setTodoList}
      />

      <MessageDialog
        content={multiDeleteFlag ? "是否删除勾选的待办？" : "是否删除此待办？"}
        isShow={mesDlgShowFlag}
        setShowFlag={setMesDlgShowFlag}
        onConfirm={()=>{deleteTodoList();}}
        onCancel={()=>{clearDeleteEffect();}}
      />      
    </div>
  );
}

export default App;
