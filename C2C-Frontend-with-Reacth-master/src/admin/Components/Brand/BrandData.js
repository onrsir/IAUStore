import React, { Component } from 'react'
import { createBrand, getAllBrand, updateBrand, getByBrandId, deleteBrand } from '../apiCall'

class BrandData extends Component {
    state = {
        brandId: null,
        brandName: null,
        error: null,
        errors: [],
        categories: []
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
            brandName: this.state.brandName,
            parent_BrandId: this.state.brandParentId
        };

        try {
            const response = await createBrand(body);
        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllBrandForTable();
        this.deleteForm();


    };
    //Burası Table Fonksiyonu için 

    componentDidMount() {
        this.getAllBrandForTable();
    };

    getAllBrandForTable() {
        getAllBrand().then(response => {
            this.setState({
                categories: response.data.data

            });
        });
    }
    //Burası update Fonksiyonları 

    updateBrand = async brand => {
        const response = await getByBrandId(brand.brandId);
        this.setState({
            brandId: brand.brandId,
            brandName: brand.brandName
        })
    };

    onClickUpdate = async event => {
        event.preventDefault();
        const body = {
            brandId: this.state.brandId,
            brandName: this.state.brandName
        };

        this.setState({ error: null })
        try {
            const response = await updateBrand(body);
        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllBrandForTable();
        this.deleteForm();
    };

    //Burası Delete Fonksiyonları 

    onClickDelete = async event => {
        try {
            const response = await deleteBrand(event.brandId);

        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllBrandForTable();
        this.deleteForm();


    };
    //form delete 
    deleteForm = event => {
        this.setState({
            brandId: null,
            brandName: null,
            pendingCallApi: false
        })
        this.render();
    };

    render() {

        const { categories, brandId, brandName, error } = this.state;
        return (
            <>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Marka Adı</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={brandName != null ? brandName : ''} defaultValue={brandName} name="brandName" onChange={this.onChange} />
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

                        {brandId == null &&
                            <button onClick={this.onClickSave} className='update-btn'>Kayıt Et</button>
                        }
                        {brandId != null &&
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
                                <th>Marka Adı</th>
                                <th>Düzenle</th>
                                <th>Sil</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.map((brand) => (
                                <tr key={brand.brandId}>
                                    <th>{brand.brandId}</th>
                                    <td>{brand.brandName}</td>
                                    <td><button onClick={() => this.updateBrand(brand)} className='apply-now-btn'><i className="fa fa-check"></i></button></td>
                                    <td><button onClick={() => this.onClickDelete(brand)} className='apply-now-btn-color'><i className="fa fa-trash"></i></button></td>
                                </tr>
                            ))}

                        </tbody>
                    </table >

                </div>


            </>
        )
    }
}

export default BrandData;
