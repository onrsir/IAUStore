import React, { Component } from 'react'
import { createColor, getAllColor, updateColor, getByColorId, deleteColor } from '../apiCall'

class ColorData extends Component {
    state = {
        colorId: null,
        colorName: null,
        error: null,
        errors: [],
        colors: []
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
            colorName: this.state.colorName

        };

        try {
            await createColor(body);

        } catch (error) {
            this.setState({ errors: error.response.data.data })

            error.response.data.message !== "Validation Errors" && this.setState({ error: error.response.data.data })
        }
        this.getAllColorForTable();
        this.deleteForm();


    };
    //Burası Table Fonksiyonu için 

    componentDidMount() {
        this.getAllColorForTable();
    };

    getAllColorForTable() {
        getAllColor().then(response => {
            this.setState({
                colors: response.data.data

            });
        });
    }
    //Burası update Fonksiyonları 

    updateColor = async color => {
        await getByColorId(color.colorId);
        this.setState({
            colorId: color.colorId,
            colorName: color.colorName

        })
    };

    onClickUpdate = async event => {
        event.preventDefault();
        const body = {
            colorId: this.state.colorId,
            colorName: this.state.colorName
        };

        this.setState({ error: null })
        try {
            await updateColor(body);
        } catch (error) {
            this.setState({ errors: error.response.data.data })
            error.response.data.message !== "Validation Errors" && this.setState({ error: error.response.data.data })
        }
        this.getAllColorForTable();
        this.deleteForm();
    };

    //Burası Delete Fonksiyonları 

    onClickDelete = async event => {
        try {
            await deleteColor(event.colorId);

        } catch (error) {
            this.setState({ errors: error.response.data.data })
            error.response.data.message !== "Validation Errors" && this.setState({ error: error.response.data.data })
        }
        this.getAllColorForTable();
        this.deleteForm();


    };
    //form delete 
    deleteForm = event => {
        this.setState({
            colorId: null,
            colorName: null,
            pendingCallApi: false
        })
        this.render();
    };

    render() {

        const { colors, colorId, colorName, error } = this.state;
        return (
            <>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Renk Adı</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={colorName != null ? colorName : ''} defaultValue={colorName} name="colorName" onChange={this.onChange} />
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

                        {colorId == null &&
                            <button onClick={this.onClickSave} className='update-btn'>Kayıt Et</button>
                        }
                        {colorId != null &&
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

                                <th>Düzenle</th>
                                <th>Sil</th>
                            </tr>
                        </thead>

                        <tbody>
                            {colors.map((color) => (
                                <tr key={color.colorId}>
                                    <th>{color.colorId}</th>
                                    <td>{color.colorName}</td>

                                    <td><button onClick={() => this.updateColor(color)} className='apply-now-btn'><i className="fa fa-check"></i></button></td>
                                    <td><button onClick={() => this.onClickDelete(color)} className='apply-now-btn-color'><i className="fa fa-trash"></i></button></td>
                                </tr>
                            ))}

                        </tbody>
                    </table >

                </div>


            </>
        )
    }
}

export default ColorData;
