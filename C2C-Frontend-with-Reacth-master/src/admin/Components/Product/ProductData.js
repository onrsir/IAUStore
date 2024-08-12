import React, { Component } from 'react'
import { createProduct, getAllProduct, updateProduct, getByProductId, deleteProduct, getAllBrand, getAllCategory, getAllColor, getAllImage, getAllSize, getAllUser } from '../apiCall'

class ProductData extends Component {
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
        userId: null,
        productImageId: null,
        error: null,
        errors: [],
        products: [],
        brands: [],
        sizes: [],
        categories: [],
        colors: [],
        users: [],
        images: []
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

            productTitle: this.state.productTitle,
            productDescription: this.state.productDescription,
            productPrice: this.state.productPrice,
            productDiscountPrice: this.state.productDiscountPrice,
            brandId: this.state.brandId,
            sizeId: this.state.sizeId,
            categoryId: this.state.categoryId,
            colorId: this.state.colorId,
            userId: this.state.userId,
            productImageId: this.state.productImageId
        };

        try {
            const response = await createProduct(body);
        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllProductForTable();
        this.deleteForm();


    };
    //Burası Table Fonksiyonu için 

    componentDidMount() {
        this.getAllProductForTable();
        this.getAllBrandsForTable();
        this.getAllCategoriesForTable();
        this.getAllColorsForTable();
        this.getAllImagesForTable();
        this.getAllSizesForTable();
        this.getAllUsersForTable();
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
    getAllUsersForTable() {
        getAllUser().then(response => {
            this.setState({
                users: response.data.data
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


    getAllProductForTable() {
        getAllProduct().then(response => {
            this.setState({
                products: response.data.data

            });
        });
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
            userId: response.data.data.userId,
            productImageId: response.data.data.productImageId

        })
    };

    onClickUpdate = async event => {
        event.preventDefault();
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
            userId: this.state.userId,
            productImageId: this.state.productImageId
        };

        this.setState({ error: null })
        try {
            const response = await updateProduct(body);
        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllProductForTable();
        this.deleteForm();
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
            userId: null,
            productImageId: null,
            pendingCallApi: false
        })
        this.render();
    };

    render() {

        const { users, brands, categories, colors, images, sizes, products, productId, productTitle, productDescription, productPrice, productDiscountPrice, brandId,
            sizeId, categoryId, colorId, userId, productImageId, error } = this.state;
        return (
            <>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Ürün Başlığı</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={productTitle != null ? productTitle : ''} defaultValue={productTitle} name="productTitle" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Ürün Açıklaması</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={productDescription != null ? productDescription : ''} defaultValue={productDescription} name="productDescription" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Ürün Fiyatı</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={productPrice != null ? productPrice : ''} defaultValue={productPrice} name="productPrice" onChange={this.onChange} type="number" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Ürün İndirili Fiyatı</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={productDiscountPrice != null ? productDiscountPrice : ''} defaultValue={productDiscountPrice} name="productDiscountPrice" onChange={this.onChange} type="number" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Marka </label>
                    <div className="col-sm-9">


                        <select className="form-control" value={brandId != null ? brandId : ''} defaultValue={brandId} name="brandId" onChange={this.onChange} >
                            <option value="0">Marka Seçilmedi</option>

                            {brands.map((brand) => (
                                <option value={brand.brandId}>{brand.brandId}{" "} -{" "}{brand.brandName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Beden </label>
                    <div className="col-sm-9">
                        <select className="form-control" value={sizeId != null ? sizeId : ''} defaultValue={sizeId} name="sizeId" onChange={this.onChange} >
                            <option value="0">Beden Seçilmedi</option>
                            {sizes.map((size) => (
                                <option value={size.sizeId}>{size.sizeId}{" "} -{" "}{size.sizeName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Kategori </label>
                    <div className="col-sm-9">

                        <select className="form-control" value={categoryId != null ? categoryId : ''} defaultValue={categoryId} name="categoryId" onChange={this.onChange} >
                            <option value="0">Kategori Seçilmedi</option>
                            {categories.map((category) => (
                                <option value={category.categoryId}>{category.categoryId}{" "} -{" "}{category.categoryName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Renk </label>
                    <div className="col-sm-9">
                        <select className="form-control" value={colorId != null ? colorId : ''} defaultValue={colorId} name="colorId" onChange={this.onChange} >
                            <option value="0">Renk Seçilmedi</option>
                            {colors.map((color) => (
                                <option value={color.colorId}>{color.colorId}{" "} -{" "}{color.colorName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Kullanıcı </label>
                    <div className="col-sm-9">
                        <select className="form-control" value={userId != null ? userId : ''} defaultValue={userId} name="userId" onChange={this.onChange} >
                            <option value="0">Kullanıcı Seçilmedi</option>
                            {users.map((user) => (
                                <option value={user.userId}>{user.userId}{" "} -{" "}{user.userName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Ürün Resmi </label>
                    <div className="col-sm-9">

                        <select className="form-control" value={productImageId != null ? productImageId : ''} defaultValue={productImageId} name="productImageId" onChange={this.onChange} >
                            <option value="0">Ürün Resmi Seçilmedi</option>
                            {images.map((image) => (
                                <option value={image.imageId}>{image.imageId}{" "} -{" "}{image.imageSubInfo}</option>
                            ))}

                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label"></label>
                    <div className="col-sm-9">
                        <label className="col-sm-9 text-danger">{error}</label>

                    </div>
                </div>

                <div className="form-group">
                    <label className="col-sm-3 control-label"></label>
                    <div className="col-sm-9">

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


            </>
        )
    }
}

export default ProductData;
