import React, { Component } from 'react'
import { getAllCategory, createSize, getAllSize, updateSize, getBySizeId, deleteSize } from '../apiCall'

class SizeData extends Component {
    state = {
        sizeId: null,
        sizeName: null,
        categoryId: null,
        error: null,
        errors: [],
        sizes: [],
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
            sizeName: this.state.sizeName,
            categoryId: this.state.categoryId
        };

        try {
            const response = await createSize(body);
        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllSizeForTable();
        this.deleteForm();


    };
    //Burası Table Fonksiyonu için 

    componentDidMount() {
        this.getAllSizeForTable();
        this.getAllCategoriesForTable();
    };
    getAllCategoriesForTable() {
        getAllCategory().then(response => {
            this.setState({
                categories: response.data.data
            })
        })
    }

    getAllSizeForTable() {
        getAllSize().then(response => {
            this.setState({
                sizes: response.data.data

            });
        });
    }
    //Burası update Fonksiyonları 

    updateSize = async size => {
        const response = await getBySizeId(size.sizeId);
        this.setState({
            sizeId: size.sizeId,
            sizeName: size.sizeName,
            categoryId: response.data.data.categoryId
        })
    };

    onClickUpdate = async event => {
        event.preventDefault();
        const body = {
            sizeId: this.state.sizeId,
            sizeName: this.state.sizeName,
            categoryId: this.state.categoryId
        };

        this.setState({ error: null })
        try {
            const response = await updateSize(body);
        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllSizeForTable();
        this.deleteForm();
    };

    //Burası Delete Fonksiyonları 

    onClickDelete = async event => {
        try {
            const response = await deleteSize(event.sizeId);

        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllSizeForTable();
        this.deleteForm();


    };
    //form delete 
    deleteForm = event => {
        this.setState({
            sizeId: null,
            sizeName: null,
            categoryId: null,
            pendingCallApi: false
        })
        this.render();
    };

    render() {

        const { categories, sizes, sizeId, sizeName, categoryId, error, } = this.state;
        return (
            <>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Beden Adı</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={sizeName != null ? sizeName : ''} defaultValue={sizeName} name="sizeName" onChange={this.onChange} />
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
                        </select> </div>
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

                        {sizeId == null &&
                            <button onClick={this.onClickSave} className='update-btn'>Kayıt Et</button>
                        }
                        {sizeId != null &&
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
                                <th>Beden Adı</th>
                                <th>Kategori Adı</th>
                                <th>Düzenle</th>
                                <th>Sil</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sizes.map((size) => (
                                <tr key={size.sizeId}>
                                    <th>{size.sizeId}</th>
                                    <td>{size.sizeName}</td>
                                    <td>{size.categoryName}</td>
                                    <td><button onClick={() => this.updateSize(size)} className='apply-now-btn'><i className="fa fa-check"></i></button></td>
                                    <td><button onClick={() => this.onClickDelete(size)} className='apply-now-btn-color'><i className="fa fa-trash"></i></button></td>
                                </tr>
                            ))}

                        </tbody>
                    </table >

                </div>


            </>
        )
    }
}

export default SizeData;
