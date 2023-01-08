import React from 'react';
import ReactDOM from 'react-dom';

function Loading() {
  return (<div className='vh-100 w-100 position-absolute z-index-1000 top-0 bg-dark opacity-75'>
      <div className='center'>
          <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
    </div>
      </div>
  </div>);
}

function showLoading(){
  ReactDOM.render(<Loading/>, document.getElementById('root'));
}

export {Loading, showLoading};
