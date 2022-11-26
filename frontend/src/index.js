import React from 'react';
import ReactDOM from 'react-dom';
import MyApp from './MyApp';
import {BrowserRouter} from "react-router-dom";
import "./index.css"

ReactDOM.render(
<BrowserRouter>
<MyApp />
</BrowserRouter>
, document.getElementById('root')


);