import React, { Component } from 'react'
import { connect } from 'react-redux'
import dateFormat, { masks } from "dateformat";

import { Link } from 'react-router-dom';
import { getByProductId, getSinglePageByProductId, getAllCommentsByProductId, createComment } from '../../admin/Components/apiCall'

class SingleProduct extends Component {

    state = {
        productId: null,
        productTitle: null,
        productDescription: null,
        productPrice: null,
        productDiscountPrice: null,
        brandName: null,
        sizeName: null,
        categoryName: null,
        colorName: null,
        userName: null,
        profileImageImageUrl: null,
        imageUrl: null,
        comments: [],
        commentTitle: null,
        commentContent: null,

    };
    onChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };

    onClickSave = async event => {
        event.preventDefault();

        const body = {
            commentTitle: this.state.commentTitle,
            commentContent: this.state.commentContent,
            commentCreateDate: new Date(),
            commentScore: 10,
            parent_CommentId: null,
            userId: this.props.userId,
            productId: this.props.match.params.id,

        };

        try {
            const response = await createComment(body);
        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.componentDidMount();
        this.deleteForm();

    };


    updateProduct = async productId => {
        const response = await getSinglePageByProductId(productId);


        this.setState({
            productId: response.data.data.productId,
            productTitle: response.data.data.productTitle,
            productDescription: response.data.data.productDescription,
            productPrice: response.data.data.productPrice,
            productDiscountPrice: response.data.data.productDiscountPrice,
            brandName: response.data.data.brandName,
            sizeName: response.data.data.sizeName,
            categoryName: response.data.data.categoryName,
            colorName: response.data.data.colorName,
            userName: response.data.data.userName,
            profileImageImageUrl: response.data.data.profileImageImageUrl,
            imageUrl: response.data.data.imageUrl



        })
    };

    componentDidMount() {
        this.updateProduct(this.props.match.params.id);
        this.getAllCommentsByProductId(this.props.match.params.id);
    };

    getAllCommentsByProductId(productId) {
        getAllCommentsByProductId(productId).then(response => {
            this.setState({
                comments: response.data.data
            })
        })
    }


    deleteForm = event => {
        this.setState({

            commentTitle: null,
            commentContent: null,

        })
        this.render();
    };







    render() {
        const { commentTitle, commentContent, comments, productTitle, productDescription, profileImageImageUrl, userName, productDiscountPrice, imageUrl, categoryName, brandName, sizeName, colorName } = this.state;

        const { isLoggedIn, profileImage_imageUrl, userFirstName, userLastName } = this.props;

        return (
            <div>


                <div className="pagination-area bg-secondary">
                    <div className="container">
                        <div className="pagination-wrapper">
                            <ul>
                                <li><a href="/">Home</a><span> - </span></li>
                                <li><a href="#">{categoryName}</a><span> - </span></li>
                                <li>{productTitle}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="product-details-page bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 col-md-8 col-sm-8 col-xs-12">
                                <div className="inner-page-main-body">
                                    <div className="single-banner">
                                        <img src={imageUrl} alt="product" height={300} className="img-responsive" />
                                    </div>
                                    <h2 className="title-inner-default">{brandName} - {productTitle}</h2>
                                    <p className="para-inner-default">{productDescription} </p>
                                    <div className="product-tag-line">

                                        <ul className="social-default">
                                            <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                            <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                            <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                            <li><a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a></li>
                                        </ul>
                                    </div>



                                    <section className="content-item" id="comments">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-sm-8">


                                                    {isLoggedIn && <form>
                                                        <h3 className="pull-left">{userFirstName} {userLastName} Tarafından Yeni Yorum</h3>

                                                        <fieldset>
                                                            <div className="row">
                                                                <div className="col-sm-3 col-lg-2 hidden-xs">
                                                                    <img className="img-responsive" src={profileImage_imageUrl} alt="" />
                                                                </div>
                                                                <div className="form-group col-xs-12 col-sm-9 col-lg-10">

                                                                    <input placeholder="Yorum Başlığı Giriniz..." className="form-control" value={commentTitle != null ? commentTitle : ''} defaultValue={commentTitle} name="commentTitle" onChange={this.onChange} />
                                                                    <br />

                                                                    <textarea placeholder="Yorum İçeriği Giriniz..." className="form-control" value={commentContent != null ? commentContent : ''} defaultValue={commentContent} name="commentContent" onChange={this.onChange} />

                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                        <button onClick={this.onClickSave} className='btn btn-normal pull-right'>Gönder </button>
                                                    </form>}

                                                    <h3>{comments.length} Adet Yorum Bulunuyor</h3>
                                                    {comments.map((comment) => (
                                                        <div className="media">
                                                            <a className="pull-left" href="#"><img className="media-object" src={comment.profileImageImageUrl} alt="" /></a>
                                                            <div className="media-body">
                                                                <h4 className="media-heading">{comment.userName}{" - "}{comment.commentTitle}</h4>

                                                                <p>{comment.commentContent}</p>
                                                                <ul className="list-unstyled list-inline media-detail pull-left">
                                                                    <li><i className="fa fa-calendar"></i>{dateFormat(comment.commentCreateDate, "fullDate")}</li>

                                                                </ul>

                                                            </div>
                                                        </div>
                                                    ))}






                                                </div>
                                            </div>
                                        </div>
                                    </section>





                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                <div className="fox-sidebar">

                                    <div className="sidebar-item">
                                        <div className="sidebar-item-inner">
                                            <h3 className="sidebar-item-title">Ürünün Fiyatı</h3>

                                            <ul className="sidebar-product-price">
                                                <li>₺{productDiscountPrice}</li>
                                                <li>
                                                    <form id="personal-info-form">
                                                        <div className="custom-select">
                                                            <span>{sizeName}</span>
                                                        </div>
                                                    </form>
                                                </li>
                                            </ul>

                                            <ul className="sidebar-product-btn">

                                            </ul>

                                        </div>
                                    </div>


                                    <div className="sidebar-item">
                                        <div className="sidebar-item-inner">
                                            <h3 className="sidebar-item-title">Ürünün Sahibi</h3>
                                            <div className="sidebar-author-info">
                                                <img src="asset/img/images\profiles.jpg" alt="product" className="img-responsive" />
                                               
                                            </div>
                                            <div className="sidebar-author-content">

<Link className="view-profile" to={`/userprofile/${userName}`}>Profili Görüntüle</Link>
</div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            </div >
        )
    }
}



const mapStateToProps = (store) => {
    return {
        userId: store.userId,
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



export default connect(mapStateToProps)(SingleProduct);

