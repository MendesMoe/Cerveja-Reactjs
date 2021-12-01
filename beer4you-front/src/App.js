import React from 'react';
import logo from './logo.svg';
import Header from './containers/header';
import Home from './containers/home';
import Product from './containers/product';
import Detail from './containers/detail';
import Basket from './containers/basket';
import Payment from './containers/payment';
import Profil from './containers/profil';
import Success from './containers/success';
import Admin from './containers/admin/admin';
import AddBeer from './containers/admin/beer/addBeer'
import EditBeer from './containers/admin/beer/editBeer'
import Register from './containers/user/register'
import Login from './containers/user/login'
import Logout from './containers/user/logout'
import Counter from './containers/testHook'
import './App.css';
import {Switch, Route} from 'react-router-dom';
import RequireDataAuth from './helpers/require-data-auth';

// router avc un HOC RequireDataAuth
function App() {
  return (
    <div className="App">
      <Header />
      <main>
	      <Switch>
	        <Route exact path="/" component= {RequireDataAuth(Home)}/>
	        <Route exact path="/register" component= {RequireDataAuth(Register)}/>
	        <Route exact path="/login" component= {RequireDataAuth(Login)}/>
	        <Route exact path="/logout" component= {Logout}/>
	        <Route exact path="/product" component= {RequireDataAuth(Product)}/>
	        <Route exact path="/profil" component= {RequireDataAuth(Profil, true)}/>
	        <Route exact path="/detail/:id" component= {RequireDataAuth(Detail)}/>
	        <Route exact path="/basket" component= {RequireDataAuth(Basket)}/>
	        <Route exact path="/payment/:orderId" component= {RequireDataAuth(Payment, true)}/>
	        <Route exact path="/success" component= {RequireDataAuth(Success)}/>
	        <Route exact path="/admin" component= {RequireDataAuth(Admin, true)}/>
	        <Route exact path="/admin/beer/add" component= {RequireDataAuth(AddBeer, true)}/>
	        <Route exact path="/admin/beer/edit/:id" component= {RequireDataAuth(EditBeer, true)}/>
	        <Route exact path="/hook" component={()=> <Counter something="foo" />}/>
	      </Switch>
      </main>
    </div>
  );
}

export default App;
