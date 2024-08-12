import React, { Component } from 'react'
import { createImage, getAllImage, updateImage, getByImageId, deleteImage } from '../apiCall'

class ImageData extends Component {
    state = {
        imageId: null,
        imageSubInfo: null,

        error: null,
        errors: [],
        images: [],
        file: null
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
    onClickSave = async event => {
        event.preventDefault();

        let file = this.state.file
        let body = new FormData()

        body.append('file', file)
        body.append('imageSubInfo', this.state.imageSubInfo)
        body.append('imageUrl', "imageUrl")




        try {
            const response = await createImage(body);
           
        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllImageForTable();
        this.deleteForm();


    };
    //Burası Table Fonksiyonu için 

    componentDidMount() {
        this.getAllImageForTable();
    };

    getAllImageForTable() {
        getAllImage().then(response => {
            this.setState({
                images: response.data.data

            });
        });
    }
    //Burası update Fonksiyonları 

    updateImage = async image => {
        const response = await getByImageId(image.imageId);

        this.setState({
            imageId: image.imageId,
            imageSubInfo: image.imageSubInfo


        })
    };

    onClickUpdate = async event => {
        event.preventDefault();

        let file = this.state.file
        let body = new FormData()

        body.append('imageId', this.state.imageId)
        body.append('file', file)
        body.append('imageSubInfo', this.state.imageSubInfo)
        body.append('imageUrl', "imageUrl")



        this.setState({ error: null })
        try {
            const response = await updateImage(body);
        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllImageForTable();
        this.deleteForm();
    };

    //Burası Delete Fonksiyonları 

    onClickDelete = async event => {
        try {
            const response = await deleteImage(event.imageId);

        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllImageForTable();
        this.deleteForm();


    };
    //form delete 
    deleteForm = event => {
        this.setState({
            imageId: null,
            imageSubInfo: null,

            file: null,
            pendingCallApi: false
        })
        this.render();
    };

    render() {

        const { file, images, imageId, imageSubInfo, error, errors } = this.state;
        return (
            <>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Resim Alt Bilgi</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={imageSubInfo != null ? imageSubInfo : ''} defaultValue={imageSubInfo} name="imageSubInfo" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Resim Seç</label>
                    <div className="col-sm-9">
                        <input type="file" className="form-control" name="file" onChange={(e) => this.handleFile(e)} />
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

                        {imageId == null &&
                            <button onClick={this.onClickSave} className='update-btn'>Kayıt Et</button>
                        }
                        {imageId != null &&
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
                                <th>Resim Alt bilgi</th>
                                <th>Resim Url</th>
                                <th>Düzenle</th>
                                <th>Sil</th>
                            </tr>
                        </thead>

                        <tbody>
                            {images.map((image) => (
                                <tr key={image.imageId}>
                                    <th>{image.imageId}</th>
                                    <td>{image.imageSubInfo}</td>
                                    <td> <img className="img-responsive h-50" src={image.imageUrl} alt={image.imageSubInfo} /></td>
                                    <td><button onClick={() => this.updateImage(image)} className='apply-now-btn'><i className="fa fa-check"></i></button></td>
                                    <td><button onClick={() => this.onClickDelete(image)} className='apply-now-btn-color'><i className="fa fa-trash"></i></button></td>
                                </tr>
                            ))}

                        </tbody>
                    </table >

                </div>


            </>
        )
    }
}

export default ImageData;
