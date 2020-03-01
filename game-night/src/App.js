import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" component={Login} exact />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={SignUp} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
