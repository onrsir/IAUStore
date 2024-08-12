import React, { Component } from 'react'

import CategoryData from './Components/Category/CategoryData';
import ImageData from './Components/Image/ImageData';
import UserData from './Components/User/UserData';
import ColorData from './Components/Color/ColorData';
import BrandData from './Components/Brand/BrandData';
import AdressData from './Components/Adress/AdressData';
import SizeData from './Components/Size/SizeData';
import ProductData from './Components/Product/ProductData';
import CommentData from './Components/Comment/CommentData';

class AdminPage extends Component {
    render() {
        return (

            <div>
                
                <div className="pagination-area bg-secondary">
                    <div className="container">
                        <div className="pagination-wrapper">
                            <ul>
                                <li><a href="index.htm">Home</a><span> -</span></li>
                                <li>Ayarlar</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="settings-page-area bg-secondary section-space-bottom">
                    <div className="container">
                        <div className="row settings-wrapper">
                            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                                <ul className="settings-title">
                                    <li className="active"><a href="#Image" data-toggle="tab" aria-expanded="false">Resimler</a></li>
                                    <li ><a href="#User" data-toggle="tab" aria-expanded="false">Kullanıcı Bilgileri</a></li>
                                    <li><a href="#Product" data-toggle="tab" aria-expanded="false">Ürünler</a></li>
                                    <li><a href="#Category" data-toggle="tab" aria-expanded="false">Kategoriler</a></li>
                                    <li><a href="#Color" data-toggle="tab" aria-expanded="false">Renkler</a></li>
                                    <li><a href="#Brand" data-toggle="tab" aria-expanded="false">Markalar</a></li>
                                    <li><a href="#Adress" data-toggle="tab" aria-expanded="false">Adresler</a></li>
                                    <li><a href="#Size" data-toggle="tab" aria-expanded="false">Bedenler</a></li>
                                    <li><a href="#Comment" data-toggle="tab" aria-expanded="false">Yorumlar</a></li>

                                </ul>
                            </div>
                            <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
                                <div className="form-horizontal" id="personal-info-form">
                                    <div className="settings-details tab-content">
                                        <div className="tab-pane fade active in" id="Image">
                                            <h3 className="title-section">Resimler</h3>
                                            <div className="personal-info inner-page-padding">
                                                <ImageData />
                                            </div>

                                        </div>
                                        <div className="tab-pane fade " id="User">
                                            <h2 className="title-section">Kullanıcı Bilgileri</h2>

                                            <div className="personal-info inner-page-padding">
                                                <UserData />

                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="Product">
                                            <h3 className="title-section">Ürünler</h3>
                                            <div className="personal-info inner-page-padding">
                                                <ProductData />
                                            </div>

                                        </div>
                                        <div className="tab-pane fade" id="Category">
                                            <h3 className="title-section">Kategoriler</h3>
                                            <div className="personal-info inner-page-padding">
                                                <CategoryData />
                                            </div>

                                        </div>
                                        <div className="tab-pane fade" id="Color">
                                            <h3 className="title-section">Renkler</h3>
                                            <div className="personal-info inner-page-padding">
                                                <ColorData />
                                            </div>

                                        </div>
                                        <div className="tab-pane fade" id="Brand">
                                            <h3 className="title-section">Markalar</h3>
                                            <div className="personal-info inner-page-padding">
                                                <BrandData />
                                            </div>

                                        </div>
                                        <div className="tab-pane fade" id="Adress">
                                            <h3 className="title-section">Adresler</h3>
                                            <div className="personal-info inner-page-padding">
                                                <AdressData />
                                            </div>

                                        </div>
                                        <div className="tab-pane fade" id="Size">
                                            <h3 className="title-section">Bedenler</h3>
                                            <div className="personal-info inner-page-padding">
                                                <SizeData />
                                            </div>

                                        </div>
                                        <div className="tab-pane fade" id="Comment">
                                            <h3 className="title-section">Yorumlar</h3>
                                            <div className="personal-info inner-page-padding">
                                                <CommentData />
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
export default AdminPage;




// *User
// *image
// *comment
// *color
// *category
// *adress


