import { React, useEffect, useState } from 'react';
import './TodoOperator.scss';
import MessageDialog from '../MessageDialog/MessageDialog';

export default function TodoOperator(props){
  const {
    type,
    editIndex,
    isShow,
    setShowFlag,
    todoList,
    setTodoList
  } = props;

  const [content, setContent] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [note, setNote] = useState('');

  const [mesDlgShowFlag, setMesDlgShowFlag] = useState(false);

  initData();

  function initData() {
    useEffect(()=>{
      if(!isShow) return;
      if(type === 'add'){
        setContent('');
        setIsFinished(false);
        setIsImportant(false);
        setNote('');
      } else {
        const todoItem = todoList[editIndex];
        setContent(todoItem.content);
        setIsFinished(todoItem.isFinished);
        setIsImportant(todoItem.isImportant);
        setNote(todoItem.note);
      }
    }, [isShow]);
  }

  function confirmTodoList (){
    const todoItem = {
      id: new Date().getTime(),
      content,
      isFinished,
      isImportant,
      note,
      alarmTime: null,
    }
    let newTodoList = [];
    if(type === 'add'){
      newTodoList = [...todoList, todoItem];
    } else{
      newTodoList = [...todoList];
      newTodoList[editIndex] = todoItem;
    }    
    setTodoList(newTodoList);
    goBack();
  }

  function openMessageDialog (){
    setMesDlgShowFlag(true);
  }

  function deleteTodoList (){
    const newTodoList = [...todoList];
    newTodoList.splice(editIndex,1);
    setTodoList(newTodoList);
    goBack();
  }

  function goBack (){
    setContent('');
    setIsFinished(false);
    setIsImportant(false);
    setNote('');
    setShowFlag(false);
  }


  return !isShow ? '' :
  (
    <div className='todo-operator'>

      <div className='operator-header'>
        <div 
          className='button-back icon-back'
          onClick={()=>{goBack();}}
        />
        <div 
          className='button-confirm icon-confirm'
          onClick={()=>{confirmTodoList();}}
        />
      </div>

      <div className='operator-body'>
        <div className='item-container'>
          <div
            className={'button-check ' + (isFinished ? 'icon-checked' : 'icon-unchecked')}
            style={{display: type === 'add' ? 'none' : 'block'}}
            onClick={()=>{setIsFinished(!isFinished)}}
          />
          <div className='todo-item'>
            <div className='item-copy'>{content}</div>
            <textarea 
              className='item-input'
              value={content}
              onChange={e=>{setContent(e.target.value);}}
            />
            {/* <div className='item-content'>待办事项1</div> */}
          </div>
        </div>          
        <div className='item-container'>
          <div className={'icon-point ' + (isImportant ? 'important' : '')}/>
          <div className='todo-item'>
            <div className='item-content'>重要</div>
          </div>
          <div className='switch'>
            <input 
              type='checkbox'
              checked={isImportant}
              onChange={e=>{setIsImportant(e.target.checked);}}
            />
          </div>
        </div>
        <div className='item-container'>
          <div className='icon-note'/>
          <div className='todo-item'>
            <div className='item-copy'>{note}</div>
            <textarea
              className='item-input'
              placeholder='备注'
              value={note}
              onChange={e=>{setNote(e.target.value);}}
            />            
          </div>            
        </div>

        <div className='operator-foot'>
          <div
            className='button-delete icon-delete'
            style={{display: type === 'add' ? 'none' : 'block'}}
            onClick={()=>{openMessageDialog();}}
          />
        </div>
      </div>

      <MessageDialog
        content="是否删除此待办？"
        isShow={mesDlgShowFlag}
        setShowFlag={setMesDlgShowFlag}
        onConfirm={()=>{deleteTodoList();}}
      />

    </div>
  );
  
}