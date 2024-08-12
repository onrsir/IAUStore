import React, { Component } from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';


import { Link, NavLink, Redirect } from 'react-router-dom';
import { getProductCategoryList, getAllPagedProductByPageNoAndPageSizeByCategoryId, getAllPagedProductByPageNoAndPageSize } from '../../admin/Components/apiCall';



class productCategoryList extends Component {
    state = {
        categories: [],
        totalPage: 1,
        products: [],
        productSortTitle: "productTitle",
        productSortDirection: true,
        pageNo: 1,
        pageSize: 5,
        selectedFilter: "getAll",
        selectedId: null



    }
    

    componentDidMount() {

        if (this.props.match.params.categoryId == 0) {
            this.getAllProductForTable();
        }
        this.getAllCategoryFilter();
        this.getAllProductForTableByCategoryId(this.props.match.params.categoryId);
    }

    getAllProductForTable() {
        const { productSortTitle, productSortDirection, pageNo, pageSize } = this.state;
        getAllPagedProductByPageNoAndPageSize(pageNo, pageSize, productSortTitle, productSortDirection).then(response => {
            const totalPageSize = (response.data.dataSize / pageSize) + 1;
            this.setState({
                products: response.data.data,
                totalPageSize: totalPageSize,
                selectedFilter: "getAll"
            })
        })
    }

    getAllCategoryFilter() {
        getProductCategoryList().then(response => {
            this.setState({
                categories: response.data.data
            })
        })

    }


    getAllProductForTableByCategoryId(categoryId) {
        const { productSortTitle, productSortDirection, pageNo, pageSize } = this.state;
        getAllPagedProductByPageNoAndPageSizeByCategoryId(pageNo, pageSize, productSortTitle, productSortDirection, categoryId).then(response => {
            const totalPageSize = (response.data.dataSize / pageSize) + 1;
            this.setState({
                products: response.data.data,
                totalPageSize: totalPageSize,
                selectedFilter: "categoryAll",
                selectedId: categoryId
            });
        });
    }

    async setPageNoProduct(pageNo) {
        const { selectedFilter, selectedId } = this.state;
        await this.setState({
            pageNo: pageNo
        });

        if (selectedFilter == "getAll") {
            this.getAllProductForTable();
        } else if (selectedFilter == "categoryAll") {
            this.getAllProductForTableByCategoryId(selectedId);
        } else if (selectedFilter == "brandAll") {
            this.getAllProductForTableByBrandId(selectedId);
        } else if (selectedFilter == "colorAll") {
            this.getAllProductForTableByColorId(selectedId);
        } else if (selectedFilter == "sizeAll") {
            this.getAllProductForTableBySizeId(selectedId);
        }

    }



    createPageElement(n) {
        var element = [];
        for (let i = 1; i <= n; i++) {
            element.push(<li key={i}><button className='btn secondary-btn' onClick={() => this.setPageNoProduct(i)} >{i}</button></li >)
        }
        return element;
    }


    render() {
        const { categories, products, totalPageSize } = this.state;
        return (


            <div>
                
                <div className="pagination-area bg-secondary">
                    <div className="container">
                        <div className="pagination-wrapper">
                            <ul>
                                <li><a href="/">Home</a><span> -</span></li>
                                <li>Kategoriye Göre Ürün Listesi</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="category-product-list bg-secondary section-space-bottom">
                    <div className="container">
                        <div className="inner-page-main-body">
                            <div className="page-controls">
                                <div className="row">
                                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-8">
                                        <div className="page-controls-sorting display-none-in-mobile">
                                            <div className="dropdown">
                                                <button className="btn sorting-btn dropdown-toggle" type="button" data-toggle="dropdown">Kategoriler<i className="fa fa-angle-down" aria-hidden="true"></i>
                                                </button>
                                                <ul className="product-categories-list dropdown-menu">
                                                    <li><Link to="/productcategorylist/0">Tümü</Link></li>
                                                    {categories.map((category) => (
                                                        <li><NavLink to={"/productcategorylist/" + category.categoryId} >{category.categoryName}</NavLink></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="page-controls-sorting">
                                            <div className="dropdown">
                                                <button className="btn sorting-btn dropdown-toggle" type="button" data-toggle="dropdown">Sırala<i className="fa fa-sort" aria-hidden="true"></i></button>
                                                <ul className="dropdown-menu">
                                                    <li><a href="#">Fiyat</a></li>
                                                    <li><a href="#"></a></li>
                                                    <li><a href="#">Rating</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="tab-content">

                                <div role="tabpanel" className="tab-pane fade in active clear products-container" id="list-view">

                                    <div className="product-list-view-style2">
                                        {products.length > 0 ?

                                            products.map((product) => (


                                                <div className="single-item-list">
                                                    <div className="item-img">
                                                        <img src={product.imageUrl} alt="product" className="img-responsive" />
                                                    </div>
                                                    <div className="item-content">
                                                        <div className="item-info">
                                                            <div className="item-title">

                                                                <h3><Link to={"/singleproduct/" + product.productId}>{product.productTitle.substring(0, 40)}...</Link></h3>

                                                                <span>{product.categoryName}</span>
                                                            </div>
                                                            <div className="item-description">
                                                                <p>{product.productDescription.substring(0, 70)} </p>
                                                            </div>
                                                            <div className="item-sale-info">
                                                                <div className="price">₺{product.productDiscountPrice}</div>

                                                            </div>
                                                        </div>
                                                        <div className="item-profile-list">
                                                            <div className="profile-title">
                                                                <span>Satıcı:  {product.userName}</span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            )) : <p>Ürün Bulunamadı</p>
                                        }

                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <ul className="pagination-align-center">
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
        )
    }
}

export default productCategoryList;
