import React, { Component } from 'react'
import { createCategory, getAllCategory, updateCategory, getByCategoryId, deleteCategory } from '../apiCall'

class CategoryDataTable extends Component {
    state = {
        categoryId: null,
        categoryName: null,
        categoryParentId: null,
        categoryParentName: null,
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
            categoryName: this.state.categoryName,
            parent_CategoryId: this.state.categoryParentId
        };

        try {
            const response = await createCategory(body);
        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllCategoryForTable();
        this.deleteForm();


    };
    //Burası Table Fonksiyonu için 

    componentDidMount() {
        this.getAllCategoryForTable();
    };

    getAllCategoryForTable() {
        getAllCategory().then(response => {
            this.setState({
                categories: response.data.data

            });
        });
    }
    //Burası update Fonksiyonları 

    updateCategory = async category => {
        const response = await getByCategoryId(category.categoryId);
        this.setState({
            categoryId: category.categoryId,
            categoryName: category.categoryName,
            categoryParentId: response.data.data.parent_categoryId
        })
    };

    onClickUpdate = async event => {
        event.preventDefault();
        const body = {
            categoryId: this.state.categoryId,
            categoryName: this.state.categoryName,
            parent_CategoryId: this.state.categoryParentId
        };

        this.setState({ error: null })
        try {
            const response = await updateCategory(body);
        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllCategoryForTable();
        this.deleteForm();
    };

    //Burası Delete Fonksiyonları 

    onClickDelete = async event => {
        try {
            const response = await deleteCategory(event.categoryId);

        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllCategoryForTable();
        this.deleteForm();


    };
    //form delete 
    deleteForm = event => {
        this.setState({
            categoryId: null,
            categoryName: null,
            categoryParentId: null,
            categoryParentName: null,
            pendingCallApi: false
        })
        this.render();
    };

    render() {

        const { categories, categoryId, categoryName, categoryParentId, error, errors } = this.state;
        return (
            <>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Kategori Adı</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={categoryName != null ? categoryName : ''} defaultValue={categoryName} name="categoryName" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Üst Kategori </label>
                    <div className="col-sm-9">

                        <select value={categoryParentId != null ? categoryParentId : ''} defaultValue={categoryParentId} name="categoryParentId" onChange={this.onChange} className="form-control text-success">
                            <option value="0">Kategori Seçilmedi</option>

                            {categories.map((category) => (
                                <option value={category.categoryId}>{category.categoryName}</option>
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

                        {categoryId == null &&
                            <button onClick={this.onClickSave} className='update-btn'>Kayıt Et</button>
                        }
                        {categoryId != null &&
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
                                <th>Kategori Adı</th>
                                <th>Üst Kategori Adı</th>
                                <th>Düzenle</th>
                                <th>Sil</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.categoryId}>
                                    <th>{category.categoryId}</th>
                                    <td>{category.categoryName}</td>
                                    <td>{category.parent_categoryName}</td>
                                    <td><button onClick={() => this.updateCategory(category)} className='apply-now-btn'><i className="fa fa-check"></i></button></td>
                                    <td><button onClick={() => this.onClickDelete(category)} className='apply-now-btn-color'><i className="fa fa-trash"></i></button></td>
                                </tr>
                            ))}

                        </tbody>
                    </table >

                </div>


            </>
        )
    }
}

export default CategoryDataTable;
