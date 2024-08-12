import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { getCategoryByParentId } from '../../admin/Components/apiCall';
import { Authentication } from '../shared/AuthenticationContext';
import { connect } from 'react-redux'

import { logoutSuccess } from '../redux/authActions';

class header extends Component {

    //static contextType = Authentication;
    state = {
        categoryGiyim: [],
        categoryAksesuar: [],
        categoryAyakkabi: []

    }


    componentDidMount() {
        this.getcategoryByGiyim();
        this.getcategoryByAyakkabi();
        this.getcategoryByAksesuar();
    }

    getcategoryByGiyim() {
        getCategoryByParentId(1).then(response => {
            this.setState({
                categoryGiyim: response.data.data
            })
        })
    }
    getcategoryByAksesuar() {
        getCategoryByParentId(4).then(response => {
            this.setState({
                categoryAksesuar: response.data.data
            })
        })
    }
    getcategoryByAyakkabi() {
        getCategoryByParentId(3).then(response => {
            this.setState({
                categoryAyakkabi: response.data.data
            })
        })
    }

    /*onClickLogout = () => {
        this.props.dispatch(logoutSuccess());
    };*/


    render() {

        const { userSeller, isLoggedIn, userName, onLogoutSuccess, userFirstName, userLastName, profileImage_imageUrl } = this.props;
        const { categoryAksesuar, categoryAyakkabi, categoryGiyim } = this.state;

        const defaultProfileImage = '/public/asset/img/images/profils.jpg';


        let links = (
            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                <ul className="profile-notification">
                    <li><Link className="apply-now-btn" to="/login/" id="login-button">Giriş</Link></li>
                    <li><Link className="apply-now-btn-color hidden-on-mobile" to="/register/">Kayıt Ol</Link></li>
                </ul>
            </div>
        );
        if (isLoggedIn) {
            links = (
                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                <ul className="profile-notification">
                    <li>
                        <div className="user-account-info">
                            <div className="user-account-info-controler" style={{ display: 'flex', alignItems: 'center' }}>
                                <div className="user-account-img">
                                    <img
                                        className="img-responsive"
                                        src="asset/img/images\profiles.jpg"
                                        alt="profile"
                                        style={{ borderRadius: '50%', width: '40px', height: '40px' }} // Inline styling
                                    />
                                </div>
                                <div className="user-account-title" style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                                    <div className="user-account-name">{userFirstName} {userLastName}</div>
                                </div>
                                <div className="user-account-dropdown">
                                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                                </div>
                            </div>
                                <ul>
                                    <li>
                                        <Link to={`/userprofile/${userName}`}>Profil Sayfası</Link>

                                    </li>
                                    <li><Link to="/uploadproduct/">Ürünler</Link></li>
                                    <li><Link to="/editprofile/">Hesap Ayarları</Link></li>
                                   
                                    {
                                        userSeller == "Admin" && <li><Link to="/adminpage/">Admin Ayarları</Link></li>
                                    }

                                </ul>
                            </div>
                        </li>
                        <li><Link className="apply-now-btn" onClick={onLogoutSuccess} >Çıkış Yap</Link></li>

                    </ul>
                </div>
            );
        }
        return (


            <header>
                <div id="header2" className="header2-area right-nav-mobile">
                    <div className="header-top-bar">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-2 col-md-2 col-sm-2 hidden-xs">
                                    <div className="logo-area">
                                        <a href="index.html"><img className="img-responsive" src="asset/img\laga.png" alt="logo" /></a>
                                    </div>
                                </div>
                                {links}
                            </div>
                        </div>
                    </div>

                    <div className="main-menu-area bg-primaryText" id="sticker">
                        <div className="container">
                            <nav id="desktop-nav">
                                <ul>
                                    <li className="active"><a href="/">Anasayfa</a>

                                    </li>
                                    <li><Link to="/aboutus/">Hakkımızda</Link></li>
                                    <li><Link to="/productcategorylist/0">Kategoriler</Link>
                                        <ul className="mega-menu-area">
                                            <li>
                                                <Link to="/productcategorylist/1">Giyim</Link>
                                                {categoryGiyim.map((category) => (<Link to={"/productcategorylist/" + category.categoryId}>{category.categoryName}</Link>))}
                                            </li>
                                            <li>
                                                <Link to="/productcategorylist/4">Aksesuar</Link>
                                                {categoryAksesuar.map((category) => (<Link to={"/productcategorylist/" + category.categoryId}>{category.categoryName}</Link>))}
                                            </li>
                                            <li>
                                                <Link to="/productcategorylist/3">Ayakkabı</Link>
                                                {categoryAyakkabi.map((category) => (<Link to={"/productcategorylist/" + category.categoryId}>{category.categoryName}</Link>))}
                                            </li>

                                        </ul>
                                    </li>


                                    <li><Link to="/productlist">Ürün Listesi</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>


            </header>

        )


    }
}

const mapStateToProps = (store) => {
    return {
        isLoggedIn: store.isLoggedIn,
        userName: store.userName,
        userFirstName: store.userFirstName,
        userLastName: store.userLastName,
        userPassword: store.userPassword,
        userMail: store.userMail,
        userCountry: store.userCountry,
        userRegisterDate: store.userRegisterDate,
        userAbout: store.userAbout,
        userSeller: store.userSeller,
        coverImage_imageUrl: store.coverImage_imageUrl,
        profileImage_imageUrl: store.profileImage_imageUrl,
    }
}

const mapDisptchToProps = (dispatch) => {
    return {
        onLogoutSuccess: () => dispatch(logoutSuccess())

    };
};

export default connect(mapStateToProps, mapDisptchToProps)(header);
