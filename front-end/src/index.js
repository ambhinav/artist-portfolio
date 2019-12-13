import ReactDOM from "react-dom";
import React from 'react'
import Routing from './app'
import Firebase, { FirebaseContext } from "./Components/Firebase";

ReactDOM.render(
<FirebaseContext.Provider value={new Firebase()}>
    <Routing />
</FirebaseContext.Provider>
, document.getElementById('root'));

module.hot.accept()