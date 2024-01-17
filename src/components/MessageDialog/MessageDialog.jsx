import { React } from 'react';
import './MessageDialog.scss';

export default function MessageDialog(props) {
  const {
    content, 
    isShow, 
    setShowFlag, 
    onConfirm,
    onCancel
  } = props;

  return !isShow ? '' : (
    <div className="message-dialog">
      <div className="dialog-container">
        <div className="content">{content}</div>
        <div className="button-container">
          <div 
            className="button-cancel"
            onClick={()=>{
              if(onCancel){
                onCancel();
              }
              setShowFlag(false);
            }}
          >
            取消
          </div>
          <div className="button-separator"/>
          <div 
            className="button-delete"
            onClick={()=>{
              onConfirm();
              setShowFlag(false);
            }}
          >
            删除
          </div>
        </div>
      </div>
    </div>
  )
}