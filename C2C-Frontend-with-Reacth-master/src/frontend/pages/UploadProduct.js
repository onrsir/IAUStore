import React, { Component } from 'react'
import { getByProductId, updateProduct, deleteProduct, getAllPagedProductByPageNoAndPageSizeByUserId, createImage, createProduct, getAllBrand, getAllCategory, getAllColor, getAllImage, getAllSize, } from '../../admin/Components/apiCall'
import { connect } from 'react-redux'
class UploadProduct extends Component {

    state = {
        productId: null,
        productTitle: null,
        productDescription: null,
        productPrice: null,
        productDiscountPrice: null,
        brandId: null,
        sizeId: null,
        categoryId: null,
        colorId: null,

        productImageId: null,
        error: null,
        errors: [],
        brands: [],
        sizes: [],
        categories: [],
        colors: [],
        images: [],
        file: null,
        products: []
    };

    onChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };
    handleFile(e) {
        let file = e.target.files[0]
        this.setState({ file: file })
    }

    getProductByUserIdForTable() {
        getAllPagedProductByPageNoAndPageSizeByUserId(1, 100, "productTitle", true, this.props.userId).then(response => {
            this.setState({
                products: response.data.data

            });
        });
    }

    onClickSave = async event => {
        event.preventDefault();


        let file = this.state.file
        let imageBody = new FormData()

        imageBody.append('file', file)
        imageBody.append('imageSubInfo', this.state.productTitle)
        imageBody.append('imageUrl', "imageUrl")
        let control = true;
        let imageResponse = null
        try {
            imageResponse = await createImage(imageBody);

        } catch (error) {
            control = false;
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }

        const body = {

            productTitle: this.state.productTitle,
            productDescription: this.state.productDescription,
            productPrice: this.state.productPrice,
            productDiscountPrice: this.state.productDiscountPrice,
            brandId: this.state.brandId,
            sizeId: this.state.sizeId,
            categoryId: this.state.categoryId,
            colorId: this.state.colorId,
            userId: this.props.userId,
            productImageId: imageResponse.data.id
        };


        try {
            const response = await createProduct(body);
        } catch (error) {
            control = false;
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        control && this.deleteForm();
        control && this.componentDidMount();


    };
    //Burası Table Fonksiyonu için 

    componentDidMount() {

        this.getAllBrandsForTable();
        this.getAllCategoriesForTable();
        this.getAllColorsForTable();
        this.getAllImagesForTable();
        this.getAllSizesForTable();
        this.getProductByUserIdForTable();

    };

    getAllBrandsForTable() {
        getAllBrand().then(response => {
            this.setState({
                brands: response.data.data
            })
        })
    }
    getAllSizesForTable() {
        getAllSize().then(response => {
            this.setState({
                sizes: response.data.data
            })
        })
    }
    getAllColorsForTable() {
        getAllColor().then(response => {
            this.setState({
                colors: response.data.data
            })
        })
    }
    getAllCategoriesForTable() {
        getAllCategory().then(response => {
            this.setState({
                categories: response.data.data
            })
        })
    }

    getAllImagesForTable() {
        getAllImage().then(response => {
            this.setState({
                images: response.data.data
            })
        })
    }



    //Burası update Fonksiyonları 
    updateProduct = async product => {
        const response = await getByProductId(product.productId);


        this.setState({
            productId: product.productId,
            productTitle: product.productTitle,
            productDescription: product.productDescription,
            productPrice: product.productPrice,
            productDiscountPrice: product.productDiscountPrice,

            brandId: response.data.data.brandId,
            sizeId: response.data.data.sizeId,
            categoryId: response.data.data.categoryId,
            colorId: response.data.data.colorId,
            userId: this.props.userId,
            productImageId: response.data.data.productImageId

        })
    };

    onClickUpdate = async event => {
        event.preventDefault();

        let control = true;

        let image = this.state.productImageId;

        let file = this.state.file
        let imageBody = new FormData()

        imageBody.append('file', file)
        imageBody.append('imageSubInfo', this.state.productTitle)
        imageBody.append('imageUrl', "imageUrl")

        let imageResponse = null
        if (file != null) {
            try {
                imageResponse = await createImage(imageBody);

            } catch (error) {
                control = false;
                this.setState({ errors: error.response.data.data })
                { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
            }
            image = imageResponse.data.id
        }



        const body = {
            productId: this.state.productId,
            productTitle: this.state.productTitle,
            productDescription: this.state.productDescription,
            productPrice: this.state.productPrice,
            productDiscountPrice: this.state.productDiscountPrice,
            brandId: this.state.brandId,
            sizeId: this.state.sizeId,
            categoryId: this.state.categoryId,
            colorId: this.state.colorId,
            userId: this.props.userId,
            productImageId: image
        };
        console.log(body)

        this.setState({ error: null })
        try {
            const response = await updateProduct(body);
        } catch (error) {
            control = false;
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        control && this.componentDidMount();
        control && this.deleteForm();



    };

    //Burası Delete Fonksiyonları 

    onClickDelete = async event => {
        try {
            const response = await deleteProduct(event.productId);

        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllProductForTable();
        this.deleteForm();


    };

    //form delete 
    deleteForm = event => {
        this.setState({
            productId: null,
            productTitle: null,
            productDescription: null,
            productPrice: null,
            productDiscountPrice: null,
            brandId: null,
            sizeId: null,
            categoryId: null,
            colorId: null,
            productImageId: null,
            file: null
        })
        this.render();
    };

    render() {

        const { productId, products, brands, categories, colors, sizes, productTitle, productDescription, productPrice, productDiscountPrice, brandId,
            sizeId, categoryId, colorId, error, errors } = this.state;
        const { userName, userId } = this.props;
        return (
            <div>
                <div className="pagination-area bg-secondary">
                    <div className="container">
                        <div className="pagination-wrapper">
                            <ul>
                                <li><a href="/">Anasayfa</a><span> -</span></li>
                                <li>Ürün Girişi</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="product-upload-page-area bg-secondary section-space-bottom">
                    <div className="container">
                        <h3 className="title-section">Ürün Girişi</h3>
                        <form id="personal-info-form">
                            <div className="product-upload-wrapper inner-page-padding">
                                <div className="form-group upload-info-item">
                                    <div className="upload-info-title">
                                        <h4>Ürün Resmi Yükle<span>*</span></h4>
                                    </div>
                                    <div className="upload-info-field">

                                        <input type="file" className="form-control" name="file" onChange={(e) => this.handleFile(e)} />


                                    </div>
                                </div>



                                <div className="form-group upload-info-item">
                                    <div className="upload-info-title">
                                        <h4>Ürün Başlığı<span>*</span></h4>
                                    </div>
                                    <div className="upload-info-field">
                                        <input className="form-control" value={productTitle != null ? productTitle : ''} defaultValue={productTitle} name="productTitle" onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className="form-group upload-info-item">
                                    <div className="upload-info-title">
                                        <h4>Ürün Açıklaması<span>*</span></h4>
                                    </div>
                                    <div className="upload-info-field">
                                        <textarea className="form-control" value={productDescription != null ? productDescription : ''} defaultValue={productDescription} name="productDescription" onChange={this.onChange} />
                                    </div>
                                </div>

                                <div className="form-group upload-info-item" >
                                    <div className="upload-info-title">
                                        <h4>Kategori Seç<span>*</span></h4>
                                    </div>
                                    <div className="upload-info-field">
                                        <div className="custom-select">
                                            <select className="form-control" value={categoryId != null ? categoryId : ''} defaultValue={categoryId} name="categoryId" onChange={this.onChange} >
                                                <option value="0">Kategori Seçilmedi</option>
                                                {categories.map((category) => (
                                                    <option value={category.categoryId}>{category.categoryId}{" "} -{" "}{category.categoryName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group upload-info-item" >
                                    <div className="upload-info-title">
                                        <h4>Marka Seç<span>*</span></h4>
                                    </div>
                                    <div className="upload-info-field">
                                        <div className="custom-select">

                                            <select className="form-control" value={brandId != null ? brandId : ''} defaultValue={brandId} name="brandId" onChange={this.onChange} >
                                                <option value="0">Marka Seçilmedi</option>

                                                {brands.map((brand) => (
                                                    <option value={brand.brandId}>{brand.brandId}{" "} -{" "}{brand.brandName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group upload-info-item" >
                                    <div className="upload-info-title">
                                        <h4>Beden Seç<span>*</span></h4>
                                    </div>
                                    <div className="upload-info-field">
                                        <div className="custom-select">
                                            <select className="form-control" value={sizeId != null ? sizeId : ''} defaultValue={sizeId} name="sizeId" onChange={this.onChange} >
                                                <option value="0">Beden Seçilmedi</option>
                                                {sizes.map((size) => (
                                                    <option value={size.sizeId}>{size.sizeId}{" "} -{" "}{size.sizeName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group upload-info-item" >
                                    <div className="upload-info-title">
                                        <h4>Renk Seç<span>*</span></h4>
                                    </div>
                                    <div className="upload-info-field">
                                        <div className="custom-select">
                                            <select className="form-control" value={colorId != null ? colorId : ''} defaultValue={colorId} name="colorId" onChange={this.onChange} >
                                                <option value="0">Renk Seçilmedi</option>
                                                {colors.map((color) => (
                                                    <option value={color.colorId}>{color.colorId}{" "} -{" "}{color.colorName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>


                                <div className="price-set">Ürünün Fiyatını ayarla (TL₺)</div>
                            </div>
                            <div className="product-upload-wrapper inner-page-padding">
                                <div className="form-group upload-info-item">
                                    <div className="upload-info-title">
                                        <h4>Normal Fiyatı<span>*</span></h4>
                                    </div>
                                    <div className="upload-info-field">
                                        <input className="form-control" value={productPrice != null ? productPrice : ''} defaultValue={productPrice} name="productPrice" onChange={this.onChange} type="number" />
                                    </div>
                                </div>
                                <div className="form-group upload-info-item">
                                    <div className="upload-info-title">
                                        <h4>İndirimli Fiyatı<span>*</span></h4>
                                    </div>
                                    <div className="upload-info-field">
                                        <input className="form-control" value={productDiscountPrice != null ? productDiscountPrice : ''} defaultValue={productDiscountPrice} name="productDiscountPrice" onChange={this.onChange} type="number" />
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label"></label>
                                            <div className="col-sm-9">
                                                <label className="col-sm-9 text-danger">{error && error}</label>
                                                <label className="col-sm-9 text-danger">{errors && errors.NotNull}</label>

                                            </div>
                                        </div>

                                        {productId == null &&
                                            <button onClick={this.onClickSave} className='update-btn'>Kayıt Et</button>
                                        }
                                        {productId != null &&
                                            <>
                                                <button onClick={this.onClickUpdate} className='update-btn'>Güncelle</button>

                                                <button onClick={this.deleteForm} className='delete-btn'> Sil</button>
                                            </>
                                        }


                                    </div>
                                </div>


                            </div>
                        </form>

                        <div className="table-responsive">

                            <table className="table table-striped">

                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Ürün Resmi</th>
                                        <th>Ürün Başlığı</th>
                                        <th>Ürün Fiyatı</th>
                                        <th>Marka</th>
                                        <th>Kategori</th>
                                        <th>Kullanıcı</th>


                                        <th>Düzenle</th>
                                        <th>Sil</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.productId}>
                                            <th>{product.productId}</th>
                                            <td><img className="img-responsive h-50" src={product.imageUrl} /></td>
                                            <td>{product.productTitle}</td>
                                            <td>{product.productDiscountPrice}</td>
                                            <td>{product.brandName}</td>
                                            <td>{product.categoryName}</td>
                                            <td>{product.userName}</td>
                                            <td><button onClick={() => this.updateProduct(product)} className='apply-now-btn'><i className="fa fa-check"></i></button></td>
                                            <td><button onClick={() => this.onClickDelete(product)} className='apply-now-btn-color'><i className="fa fa-trash"></i></button></td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table >

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
        userId: store.userId,
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



export default connect(mapStateToProps)(UploadProduct);
