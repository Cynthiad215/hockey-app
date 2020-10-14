import React from 'react';
import Division from './Division';


const App = () => {
  return (
    <div className="container">
        <div className="row p-5">
          <h1 className="col text-center">NHL Teams</h1>
        </div>
       
        <div className="row p-3">
          <div className="col text-left mt-3 pt-3">
            <h3 className="">WESTERN CONFERENCE</h3>
            <div className="row">
              <div className="col p-1"><Division division={'Pacific'} conference={'West'}/></div>
              <div className="col p-1"><Division division={'Central'} conference={'West'}/></div>
            </div>
          </div>

          <div className="col text-left mt-3 pt-3 ">
            <h3 className="">EASTERN CONFERENCE</h3>
            <div className="row">
              <div className="col p-1"><Division division={'Atlantic'} conference={'East'}/></div>
              <div className="col p-1"><Division division={'Metropolitan'} conference={'East'}/></div>
            </div>
          </div>
        </div>

    </div>
  ); 
}

export default App;
