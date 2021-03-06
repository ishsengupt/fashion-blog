import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadProductPage from './views/UploadProductPage/UploadProductPage'
import UploadMagazinePage from './views/UploadMagazinePage/UploadMagazinePage'
import DetailProductPage from './views/DetailProductPage/DetailProductPage';
import CartPage from './views/CartPage/CartPage';
import HistoryPage from './views/HistoryPage/HistoryPage'; 
import BrandPage from './views/BrandPage/BrandPage'; 
import HomePage from './views/HomePage/index'
import MagazinePage from './views/MagazinePage/MagazinePage';
import NewsPage from './views/NewsPage/NewsPage'; 
import Home from './views/Home/Hompage'


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/products" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
           <Route exact path="/magazine/upload" component={Auth(UploadMagazinePage, true)} /> 
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
           <Route exact path="/user/cart" component={Auth(CartPage, true)} />
          <Route exact path="/history" component={Auth(HistoryPage, true)} />
          <Route exact path="/" component={Auth(HomePage, null)} />
          <Route exact path="/brand" component={Auth(BrandPage, null)} />
          <Route exact path="/magazine" component={Auth(MagazinePage, null)} />
          <Route exact path="/news" component={Auth(NewsPage, null)} />
          <Route exact path="/homer" component={Auth(Home, null)} />
 
 
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
