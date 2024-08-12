import React, { Component } from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';

import { Link } from 'react-router-dom';
import { getProductBrandList, getProductColorList, getProductSizeList, getProductCategoryList, getAllPagedProductByPageNoAndPageSize, getAllPagedProductByPageNoAndPageSizeByCategoryId, getAllPagedProductByPageNoAndPageSizeByBrandId, getAllPagedProductByPageNoAndPageSizeByColorId, getAllPagedProductByPageNoAndPageSizeBySizeId, getAllCategory, getAllColor, getAllBrand, getAllSize } from '../../admin/Components/apiCall';

class productList extends Component {

    state = {
        categories: [],
        totalPage: 1,
        products: [],
        productSortTitle: "productTitle",
        productSortDirection: true,
        pageNo: 1,
        pageSize: 5,
        brands: [],
        colors: [],
        sizes: [],
        selectedFilter: "getAll",
        selectedId: null


    }

    componentDidMount() {
        this.getAllCategoryFilter();
        this.getAllBrandFilter();
        this.getAllColorFilter();
        this.getAllSizeFilter();
        this.getAllProductForTable();

    }

    getAllProductForTable() {
        this.setState({ selectedFilter: "getAll" })
        const { productSortTitle, productSortDirection, pageNo, pageSize } = this.state;
        getAllPagedProductByPageNoAndPageSize(pageNo, pageSize, productSortTitle, productSortDirection).then(response => {
            const totalPageSize = (response.data.dataSize / pageSize) + 1;
            this.setState({
                products: response.data.data,
                totalPageSize: totalPageSize
            });

        });
    }

    getAllCategoryFilter() {
        this.setState({ selectedFilter: "categoryAll" })
        getProductCategoryList().then(response => {
            this.setState({
                categories: response.data.data
            })
        })

    }

    getAllBrandFilter() {
        this.setState({ selectedFilter: "brandAll" })
        getProductBrandList().then(response => {
            this.setState({
                brands: response.data.data
            })
        })

    }

    getAllColorFilter() {
        this.setState({ selectedFilter: "colorAll" })
        getProductColorList().then(response => {
            this.setState({
                colors: response.data.data
            })
        })

    }
    getAllSizeFilter() {
        this.setState({ selectedFilter: "sizeAll" })
        getProductSizeList().then(response => {
            this.setState({
                sizes: response.data.data
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
    getAllProductForTableByBrandId(brandId) {
        const { productSortTitle, productSortDirection, pageNo, pageSize } = this.state;
        getAllPagedProductByPageNoAndPageSizeByBrandId(pageNo, pageSize, productSortTitle, productSortDirection, brandId).then(response => {
            const totalPageSize = (response.data.dataSize / pageSize) + 1;
            this.setState({
                products: response.data.data,
                totalPageSize: totalPageSize,
                selectedFilter: "brandAll",
                selectedId: brandId
            });

        });
    }
    getAllProductForTableByColorId(colorId) {
        const { productSortTitle, productSortDirection, pageNo, pageSize } = this.state;
        getAllPagedProductByPageNoAndPageSizeByColorId(pageNo, pageSize, productSortTitle, productSortDirection, colorId).then(response => {
            const totalPageSize = (response.data.dataSize / pageSize) + 1;
            this.setState({
                products: response.data.data,
                totalPageSize: totalPageSize,
                selectedFilter: "colorAll",
                selectedId: colorId
            });

        });
    }

    getAllProductForTableBySizeId(sizeId) {
        const { productSortTitle, productSortDirection, pageNo, pageSize } = this.state;
        getAllPagedProductByPageNoAndPageSizeBySizeId(pageNo, pageSize, productSortTitle, productSortDirection, sizeId).then(response => {
            const totalPageSize = (response.data.dataSize / pageSize) + 1;
            this.setState({
                products: response.data.data,
                totalPageSize: totalPageSize,
                selectedFilter: "sizeAll",
                selectedId: sizeId
            });

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


    async setProductTable(productSortTitle, productSortDirection) {
        const { selectedFilter, selectedId } = this.state;
        await this.setState({
            productSortTitle: productSortTitle,
            productSortDirection: productSortDirection
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

    async setPageNo(selectedFilter, selectedId) {
        await this.setState({
            pageNo: 1
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




    render() {

        const { products, categories, colors, brands, sizes, totalPageSize } = this.state;

        return (
            <div>
                
                <div className="pagination-area bg-secondary">
                    <div className="container">
                        <div className="pagination-wrapper">
                            <ul>
                                <li><a href="/">Home</a><span> -</span></li>
                                <li>Ürün Listesi</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="product-page-list bg-secondary section-space-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 col-md-8 col-sm-8 col-xs-12 col-lg-push-3 col-md-push-4 col-sm-push-4">
                                <div className="inner-page-main-body">
                                    <div className="page-controls">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-8">
                                                <div className="page-controls-sorting">
                                                    <div className="dropdown">
                                                        <button className="btn sorting-btn dropdown-toggle" type="button" data-toggle="dropdown">Default Sorting<i className="fa fa-sort" aria-hidden="true"></i></button>
                                                        <ul className="dropdown-menu">
                                                            <li><button onClick={() => this.setProductTable("productDiscountPrice", true)} className='btn px-3'>Fiyata göre artan</button></li>

                                                            <li><button onClick={() => this.setProductTable("productDiscountPrice", false)} className='btn px-3'>Fiyata göre azalan</button></li>

                                                            <li><button onClick={() => this.setProductTable("brand", true)} className='btn px-3'>Markaya göre artan</button></li>

                                                            <li><button onClick={() => this.setProductTable("brand", false)} className='btn px-3'>Markaya göre azalan</button></li>

                                                            <li><button onClick={() => this.setProductTable("size", true)} className='btn px-3'>Bedene göre artan</button></li>

                                                            <li><button onClick={() => this.setProductTable("size", false)} className='btn px-3'>Bedene göre azalan</button></li>

                                                            <li><button onClick={() => this.setProductTable("category", true)} className='btn px-3'>Kategoriye göre artan</button></li>

                                                            <li><button onClick={() => this.setProductTable("category", false)} className='btn px-3'>Kategoriye göre azalan</button></li>

                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="tab-content">
                                        <div role="tabpanel" className="tab-pane fade in active clear products-container" id="list-view">
                                            <div className="product-list-view">
                                                {products.map((product) => (

                                                    <div key={product.productId} className="single-item-list">
                                                        <div className="item-img">
                                                            <img src={product.imageUrl} alt="product" className="img-responsive" />
                                                            <div className="trending-sign" data-tips="Trending"><i className="fa fa-bolt" aria-hidden="true"></i></div>
                                                        </div>
                                                        <div className="item-content">
                                                            <div className="item-info">
                                                                <div className="item-title">
                                                                    <h3><Link to={"/singleproduct/" + product.productId}>{product.brandName}{" "} -{" "} {product.productTitle.substring(0, 40)}...</Link></h3>
                                                                    <span>{product.categoryName}</span>
                                                                    <p>
                                                                        {product.productDescription.substring(0, 70)}... </p>
                                                                </div>
                                                                <div className="item-sale-info">
                                                                    <span className='text-danger'><strike>₺{product.productPrice}</strike></span>
                                                                    <div className="price">₺{product.productDiscountPrice}</div>


                                                                </div>
                                                            </div>
                                                            <div className="item-profile">
                                                                <div className="profile-title">
                                                                    <div className="img-wrapper"><img src="asset/img/images\profiles.jpg" alt="profile" className="img-responsive img-circle" /></div>
                                                                    <span>{product.userName}</span>
                                                                </div>
                                                                <div className="profile-rating-info">
                                                                    <ul>
                                                                        <li>
                                                                            <ul className="profile-rating">
                                                                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                                                <li><i className="fa fa-star" aria-hidden="false"></i></li>
                                                                                <li>(<span> 05</span> )</li>
                                                                            </ul>
                                                                        </li>

                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                ))}


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
                            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 col-lg-pull-9 col-md-pull-8 col-sm-pull-8">
                                <div className="fox-sidebar">


                                    <div className="sidebar-item">
                                        <div className="sidebar-item-inner">
                                            <h3 className="sidebar-item-title">Tümünü Listele</h3>
                                            <ul className="sidebar-categories-list">
                                                <li><button className="btn" onClick={() => this.getAllProductForTable()}>Tümünü Listele<span></span></button></li>
                                            </ul>
                                        </div>

                                        <div className="sidebar-item-inner">
                                            <h3 className="sidebar-item-title">Kategoriler</h3>
                                            <ul className="sidebar-categories-list">
                                                {categories.map((category) => (

                                                    <li><button className="btn" onClick={() => this.setPageNo("categoryAll", category.categoryId)}>{category.categoryName}<span></span></button></li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="sidebar-item-inner">

                                            <h3 className="sidebar-item-title">Markalar</h3>
                                            <ul className="sidebar-categories-list">
                                                {brands.map((brand) => (

                                                    <li><button className="btn" onClick={() => this.setPageNo("brandAll", brand.brandId)}>{brand.brandName}<span></span></button></li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="sidebar-item-inner">
                                            <h3 className="sidebar-item-title">Renkler</h3>
                                            <ul className="sidebar-categories-list">
                                                {colors.map((color) => (

                                                    <li><button className="btn" onClick={() => this.setPageNo("colorAll", color.colorId)}>{color.colorName}<span></span></button></li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="sidebar-item-inner">
                                            <h3 className="sidebar-item-title">Bendenler</h3>
                                            <ul className="sidebar-categories-list">

                                                {sizes.map((size) => (

                                                    <li><button className="btn" onClick={() => { this.setPageNo("sizeAll", size.sizeId) }}>{size.sizeName}<span></span></button></li>
                                                ))}
                                            </ul>
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

export default productList;
