import React, { Component } from 'react'
import { connect } from 'react-redux'
import dateFormat, { masks } from "dateformat";

import { Link } from 'react-router-dom';

import { deleteProduct, getByUserName, getAllPagedProductByPageNoAndPageSizeByUserId } from '../../admin/Components/apiCall'

class UserProfile extends Component {

    state = {
        userId: null,
        userFirstName: null,
        userLastName: null,
        userName: null,
        userPassword: null,
        userMail: null,
        userCountry: null,
        userRegisterDate: null,
        userAbout: null,
        userSeller: null,
        coverImage_imageUrl: null,
        profileImage_imageUrl: null,
        products: [],
        totalPageSize: null,
        pageNo: 1,
        pageSize: 5
    };
    componentDidMount() {

        const pathUserName = this.props.match.params.username;
        this.getUserByUsername(pathUserName);

    }


    getProductByUserIdForTable(userId) {
        const { pageNo, pageSize } = this.state;

        getAllPagedProductByPageNoAndPageSizeByUserId(pageNo, pageSize, "productTitle", true, userId).then(response => {
            const totalPageSize = (response.data.dataSize / pageSize) + 1;
            this.setState({
                products: response.data.data,
                totalPageSize: totalPageSize
            });
        });
    }

    getUserByUsername(userName) {
        getByUserName(userName).then(response => {
            this.setState({
                userId: response.data.data.userId,
                userFirstName: response.data.data.userFirstName,
                userLastName: response.data.data.userLastName,
                userName: response.data.data.userName,
                userPassword: response.data.data.userPassword,
                userMail: response.data.data.userMail,
                userCountry: response.data.data.userCountry,
                userRegisterDate: response.data.data.userRegisterDate,
                userAbout: response.data.data.userAbout,
                userSeller: response.data.data.userSeller,
                coverImage_imageUrl: response.data.data.coverImage_imageUrl,
                profileImage_imageUrl: response.data.data.profileImage_imageUrl,

            });
            this.getProductByUserIdForTable(response.data.data.userId);

        });
    }

    createPageElement(n) {
        var element = [];
        for (let i = 1; i <= n; i++) {
            element.push(<li key={i}><button className='btn secondary-btn' onClick={() => this.setPageNoProduct(i)} >{i}</button></li >)
        }
        return element;
    }

    async setPageNoProduct(pageNo) {
        const { userId } = this.state;
        await this.setState({
            pageNo: pageNo
        });

        this.getProductByUserIdForTable(userId);
    }

    onClickDelete = async event => {
        try {
            const response = await deleteProduct(event.productId);

        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.componentDidMount();



    };

    render() {



        const pathUserName = this.props.match.params.username;

        const { totalPageSize, products, userName, isLoggedIn, userMail, userCountry, userRegisterDate, userAbout, coverImage_imageUrl, profileImage_imageUrl } = this.state;

        const { loginUserName } = this.props;


        return (
            <div>

                <div className="pagination-area bg-secondary">
                    <div className="container">
                        <div className="pagination-wrapper">
                            <ul>
                                <li><a href="/">{pathUserName} {isLoggedIn && "true"}</a><span> -</span></li>
                                <li>{userName}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="profile-page-area bg-secondary section-space-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 col-md-8 col-sm-8 col-xs-12 col-lg-push-3 col-md-push-4 col-sm-push-4">
                                <div className="inner-page-main-body">
                                    <div className="single-banner">
                                    </div>
                                    <div className="author-summery">
                                        <div className="single-item">
                                            <div className="item-title">Şehir:</div>
                                            <div className="item-details">{userCountry}</div>
                                        </div>
                                        <div className="single-item">
                                            <div className="item-title">Kayıt Tarihi:</div>
                                            <div className="item-details">{dateFormat(userRegisterDate, "fullDate")}</div>
                                        </div>
                                        <div className="single-item">
                                            <div className="item-title">Mail Adresi:</div>
                                            <div className="item-details">{userMail}</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 col-lg-pull-9 col-md-pull-8 col-sm-pull-8">
                                <div className="fox-sidebar">
                                    <div className="sidebar-item">
                                        <div className="sidebar-item-inner">
                                            <h3 className="sidebar-item-title">Profil Sahibi</h3>
                                            <div className="sidebar-author-info">
                                                <div className="sidebar-author-img">
                                                </div>
                                                <div className="sidebar-author-content">
                                                    <h3> {userName}</h3>
                                                    <a href="#" className="view-profile"><i className="fa fa-circle" aria-hidden="true"></i>Aktif</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <ul class="sidebar-product-btn">


                                    </ul>



                                </div>
                            </div>
                        </div>
                        <div className="row profile-wrapper">
                            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                <ul className="profile-title">
                                    <li className="active"><a href="#Profile" data-toggle="tab" aria-expanded="false"><i className="fa fa-user" aria-hidden="true"></i> Hakkımzda</a></li>
                                    <li><a href="#Products" data-toggle="tab" aria-expanded="false"><i className="fa fa-briefcase" aria-hidden="true"></i> Ürünlerim ({products.size})</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-9 col-md-8 col-sm-8 col-xs-12">
                                <div className="tab-content">
                                    <div className="tab-pane fade active in" id="Profile">
                                        <div className="inner-page-details inner-page-content-box">
                                            <h3>Hakkımda:</h3>
                                            <p>{userAbout}</p>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="Products">
                                        <h3 className="title-inner-section">Ürünlerim</h3>
                                        <div className="inner-page-main-body">
                                            <div className="row more-product-item-wrapper">

                                                {products.map((product) => (
                                                    <div className="col-lg-4 col-md-6 col-sm-4 col-xs-6">
                                                        <div className="more-product-item">
                                                            <div className="more-product-item-img">
                                                                <img src={product.imageUrl} alt="product" className="img-responsive" />
                                                            </div>
                                                            <div className="more-product-item-details">

                                                                <h4><Link to={"/singleproduct/" + product.productId}>{product.brandName}{" "} -{" "} {product.productTitle.substring(0, 20)}...</Link></h4>
                                                                <div className="p-title">{product.categoryName}</div>
                                                                <div className="p-price">₺{product.productDiscountPrice}</div>
                                                                <button onClick={() => this.onClickDelete(product)} className='apply-now-btn-color'><i className="fa fa-trash"></i></button>
                                                            </div>

                                                        </div>

                                                    </div>

                                                ))}




                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <ul className="pagination-align-left">
                                                        {this.createPageElement(totalPageSize)}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


const mapStateToProps = (store) => {
    return {
        isLoggedIn: store.isLoggedIn,
        loginUserName: store.userName,
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

export default connect(mapStateToProps)(UserProfile);