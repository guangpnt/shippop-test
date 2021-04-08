import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import BookList from './components/BookList'
import BookDetail from './components/BookDetail'
import Basket from './components/Basket'
import Payment from './components/Payment'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/UserInfo'
import BookPage from './components/BookPage'
import EditBookPage from './components/EditBookPage'
import { useState } from 'react';

function App() {

  const [goods, setGoods] = useState()

  return (
    <div className="app">
      <Navbar goods={goods}/>
      <Router>
        <Switch>
          <Route exact path="/book/:id">
            <BookDetail addGoods={goods => setGoods(goods)}/>
            <BookList title="สินค้าอื่นๆ" more="ดูสินค้าทั้งหมด" status="all" path="/book"/>
          </Route>
          <Route exact path="/">
            <Carousel/>
            <BookList title="สินค้าขายดี" more="ดูสินค้าขายดีทั้งหมด" status="topSell" path="/top-sell-book"/>
            <BookList title="สินค้าแนะนำ" more="ดูสินค้าแนะนำ" status="recommend" path="/recommend-book"/>
          </Route>
          <Route exact path="/user/login">
            <Login/>
          </Route>
          <Route exact path="/user/register">
            <Register/>
          </Route>
          <Route exact path="/user/profile">
            <Profile/>
          </Route>
          <Route exact path="/user/book/edit/:id">
            <EditBookPage/>
          </Route>
          <Route exact path="/user/basket">
            <Basket/>
          </Route>
          <Route exact path="/user/payment">
            <Payment/>
          </Route>
          <Route exact path="/book">
            <BookPage status="all" title="สินค้าทั้งหมด"/>
          </Route>
          <Route exact path="/top-sell-book">
            <BookPage status="topSell" title="สินค้าขายดี"/>
          </Route>
          <Route exact path="/recommend-book">
            <BookPage status="recommend" title="สินค้าแนะนำ"/>
          </Route>
        </Switch>
      </Router>
    </div>
  ) 
}

export default App;
