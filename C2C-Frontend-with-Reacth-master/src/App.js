
import './App.css';
import AdminPage from './admin/AdminPage';
import Home from './frontend/pages/Home';

import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import SingleProduct from './frontend/pages/singleProduct';
import productCategoryList from './frontend/pages/productCategoryList';
import productList from './frontend/pages/ProductList';
import AboutUs from './frontend/pages/AboutUs';
import Login from './frontend/login';
import register from './frontend/register';
import UserProfile from './frontend/pages/UserProfile';
import Header from './frontend/components/Header';
import Footer from './frontend/components/Footer';
import React from 'react';
import { connect } from 'react-redux'
import UploadProduct from './frontend/pages/UploadProduct';
import EditProfile from './frontend/pages/EditProfile';
import userAdress from './frontend/pages/userAdress';
class App extends React.Component {
  //static contextType = Authentication;



  render() {

    const { isLoggedIn, userSeller } = this.props
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />

            <Route path="/singleproduct/:id" component={SingleProduct} />
            <Route path="/productlist/" component={productList} />
            <Route path="/productcategorylist/:categoryId" component={productCategoryList} />
            <Route path="/aboutus/" component={AboutUs} />


            <Route path="/userprofile/:username/" component={UserProfile} />


            {!isLoggedIn &&
              <Route path="/login/" component={Login} />

            }
            {!isLoggedIn &&
              <Route path="/register/" component={register} />

            }

            {isLoggedIn &&
              <Route path="/uploadproduct/" component={UploadProduct} />

            }

            {isLoggedIn &&
              <Route path="/editprofile/" component={EditProfile} />

            }
            {userSeller == "Admin" &&
              <Route path="/adminpage" component={AdminPage} />

            }
            {isLoggedIn &&

              <Route path="/useradress/" component={userAdress} />

            }






            <Redirect to="/" />
          </Switch>
          <Footer />
        </Router>
      </div >

    );
  }


}

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.isLoggedIn,
    userSeller: store.userSeller

  }
}

export default connect(mapStateToProps)(App);
