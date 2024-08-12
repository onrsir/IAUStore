import React, { Component } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { getProductCategoryList, getAllPagedProductByPageNoAndPageSizeByCategoryId, getProductByCategoryList } from '../../admin/Components/apiCall';

class Home extends Component {


    state = {
        categories: [],
        products: []
    }

    componentDidMount() {
        this.getAllCategoryFilter();
        this.getAllProductForTableByCategoryId();
    }
    getAllCategoryFilter() {
        getProductCategoryList().then(response => {
            this.setState({
                categories: response.data.data
            })
        })

    }

    getAllProductForTableByCategoryId() {

        getProductByCategoryList().then(response => {
            this.setState({
                products: response.data.data
            })
        })


    }

    render() {
        const { categories, products } = this.state;
        return (
            <div>
               

                <div className="main-banner2-area">
                    <div className="container">
                        <div className="main-banner2-wrapper">
                            <h1>Blue Fashion Pazar Yerine Hoş Geldiniz!</h1>

                            
                        </div>
                    </div>
                </div>
                <div className="newest-products-area bg-secondary section-space-default">
                    <div className="container">
                        <h2 className="title-default">En Yeni Çıkan Ürünlerimize Göz Atalım</h2>
                    </div>
                    <div className="container-fluid" id="isotope-container">


                        <div className="row featuredContainer">
                            {products.map((product) => (
                                <div className={"col-lg-3 col-md-3 col-sm-6 col-xs-12 " + product.categoryName}>
                                    <div className="single-item-grid">
                                        <div className="item-img">
                                            <img src={product.imageUrl} alt="product" className="img-responsive" />
                                            <div className="trending-sign" data-tips="Trending"><i className="fa fa-bolt" aria-hidden="true"></i></div>
                                        </div>
                                        <div className="item-content">
                                            <div className="item-info">
                                                <h3><Link to={"/singleproduct/" + product.productId}>{product.productTitle.substring(0, 20)}...</Link></h3>
                                                <span>{product.categoryName}</span>
                                                <div className="price">₺{product.productDiscountPrice}</div>
                                            </div>
                                            <div className="item-profile">
                                                <div className="profile-title">
                                                    <div className="img-wrapper"><img src="asset/img/images\profiles.jpg" alt="profile" className="img-responsive img-circle" /></div>
                                                    <span>{product.userName}</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                </div>
                            ))}


                        </div>






                        
                    </div>
                </div>


                <div className="why-choose-area bg-primaryText section-space-default">
                    <div className="container">
                        <h2 className="title-textPrimary">Neden Blue Fashion'u Seçiyorsunuz?</h2>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div className="why-choose-box">
                                    <a href="#"><i className="fa fa-gift" aria-hidden="true"></i></a>
                                    <h3><a href="#">Kolayca Al & Sat </a></h3>
                                    <p>Dorem Ipsum is simply dummy text of the pring and typesetting industry. Lorem Ipsum has been the industry's standaum.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div className="why-choose-box">
                                    <a href="#"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></a>
                                    <h3><a href="#">Kaliteli Ürünler</a></h3>
                                    <p>Dorem Ipsum is simply dummy text of the pring and typesetting industry. Lorem Ipsum has been the industry's standaum.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div className="why-choose-box">
                                    <a href="#"><i className="fa fa-lock" aria-hidden="true"></i></a>
                                    <h3><a href="#">100% Güvenli Ödeme</a></h3>
                                    <p>Dorem Ipsum is simply dummy text of the pring and typesetting industry. Lorem Ipsum has been the industry's standaum.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               
            </div >
        )
    }
}

export default Home;
