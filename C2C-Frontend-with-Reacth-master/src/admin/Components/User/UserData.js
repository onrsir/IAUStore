import React, { Component } from 'react'
import { createUser, getAllUser, updateUser, getByUserId, deleteUser, getAllImage } from '../apiCall'

class UserData extends Component {
    state = {
        userId: null,
        userFirstName: null,
        userLastName: null,
        userName: null,
        userPassword: null,
        userMail: null,
        userCountry: null,
        userRegisterDate: null,
        userAbout: null,
        userSeller: null,
        coverImageId: null,
        profileImageId: null,
        error: null,
        errors: [],
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
            userFirstName: this.state.userFirstName,
            userLastName: this.state.userLastName,
            userName: this.state.userName,
            userPassword: this.state.userPassword,
            userMail: this.state.userMail,
            userCountry: this.state.userCountry,
            userRegisterDate: new Date(),
            userAbout: this.state.userAbout,
            userSeller: this.state.userSeller,
            coverImageId: this.state.coverImageId,
            profileImageId: this.state.profileImageId,
        };

        console.log(body.userSeller)

        try {
            const response = await createUser(body);
        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllUserForTable();
        this.deleteForm();


    };
    //Burası Table Fonksiyonu için 

    componentDidMount() {
        this.getAllUserForTable();
        this.getAllImagesForTable();
    };
    getAllImagesForTable() {
        getAllImage().then(response => {
            this.setState({
                images: response.data.data
            })
        })
    }

    getAllUserForTable() {
        getAllUser().then(response => {
            this.setState({
                users: response.data.data

            });
        });
    }
    //Burası update Fonksiyonları 

    updateUser = async user => {
        const response = await getByUserId(user.userId);
        this.setState({
            userId: user.userId,
            userFirstName: user.userFirstName,
            userLastName: user.userLastName,
            userName: user.userName,
            userPassword: user.userPassword,
            userMail: user.userMail,
            userCountry: user.userCountry,
            userRegisterDate: user.userRegisterDate,
            userAbout: user.userAbout,
            userSeller: user.userSeller,
            coverImageId: response.data.data.coverImageId,
            profileImageId: response.data.data.profileImageId,
        })
    };

    onClickUpdate = async event => {
        event.preventDefault();
        const body = {
            userId: this.state.userId,
            userFirstName: this.state.userFirstName,
            userLastName: this.state.userLastName,
            userName: this.state.userName,
            userPassword: this.state.userPassword,
            userMail: this.state.userMail,
            userCountry: this.state.userCountry,
            userRegisterDate: this.state.userRegisterDate,
            userAbout: this.state.userAbout,
            userSeller: this.state.userSeller,
            coverImageId: this.state.coverImageId,
            profileImageId: this.state.profileImageId,
        };

        this.setState({ error: null })
        try {
            const response = await updateUser(body);
        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllUserForTable();
        this.deleteForm();
    };

    //Burası Delete Fonksiyonları 

    onClickDelete = async event => {
        try {
            const response = await deleteUser(event.userId);

        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllUserForTable();
        this.deleteForm();


    };
    //form delete 
    deleteForm = event => {
        this.setState({
            userId: null,
            userFirstName: null,
            userLastName: null,
            userName: null,
            userPassword: null,
            userMail: null,
            userCountry: null,
            userRegisterDate: null,
            userAbout: null,
            userSeller: null,
            coverImageId: null,
            profileImageId: null,
        })
        this.render();
    };

    render() {

        const { images, users, userFirstName, userLastName, userId, userName, userPassword, userMail, userCountry, userRegisterDate, userAbout, userSeller, coverImageId, profileImageId, error, errors } = this.state;
        return (
            <>
                { }
                <div className="form-group">
                    <label className="col-sm-3 control-label">Ad </label>
                    <div className="col-sm-9">
                        <input className="form-control" value={userFirstName != null ? userFirstName : ''} defaultValue={userFirstName} name="userFirstName" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Soyad</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={userLastName != null ? userLastName : ''} defaultValue={userLastName} name="userLastName" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Kullanıcı Adı</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={userName != null ? userName : ''} defaultValue={userName} name="userName" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Password</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={userPassword != null ? userPassword : ''} defaultValue={userPassword} name="userPassword" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Mail Adresi</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={userMail != null ? userMail : ''} defaultValue={userMail} name="userMail" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Şehir</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={userCountry != null ? userCountry : ''} defaultValue={userCountry} name="userCountry" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Hakkınızda</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={userAbout != null ? userAbout : ''} defaultValue={userAbout} name="userAbout" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Kullanıcı Satıcı Mı ?</label>
                    <div className="col-sm-9">
                        <select className="form-control" value={userSeller != null ? userSeller : ''} defaultValue={userSeller} name="userSeller" onChange={this.onChange}>
                            <option value="">Seçilmedi</option>
                            <option value="Satıcı">Satıcı</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-sm-3 control-label">Kullanıcı Kapak resmi </label>
                    <div className="col-sm-9">
                        <select className="form-control" value={coverImageId != null ? coverImageId : ''} defaultValue={coverImageId} name="coverImageId" onChange={this.onChange}>
                            <option value="0">Kullanıcı kapak Resmi Seçilmedi</option>

                            {images.map((image) => (
                                <option value={image.imageId}>{image.imageId}{" "} -{" "}{image.imageSubInfo}</option>
                            ))}


                        </select>

                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Kullanıcı Profil resmi</label>
                    <div className="col-sm-9">
                        <select className="form-control" value={profileImageId != null ? profileImageId : ''} defaultValue={profileImageId} name="profileImageId" onChange={this.onChange} >

                            <option value="0">Kullanıcı Profil resmi Seçilmedi</option>

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

                        {userId == null &&
                            <button onClick={this.onClickSave} className='update-btn'>Kayıt Et</button>
                        }
                        {userId != null &&
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
                                <th>Profil Resmi</th>
                                <th>Ad Soyad</th>
                                <th>Kullanıcı Adı</th>
                                <th>Mail Adresi</th>
                                <th>Şehir</th>
                                <th>Satıcımı</th>
                                <th>Düzenle</th>
                                <th>Sil</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user.userId}>
                                    <th>{user.userId}</th>
                                    <td><img className="img-responsive h-50" src={user.profileImage_imageUrl} /></td>
                                    <td>{user.userFirstName}{" "}{user.userLastName}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.userMail}</td>
                                    <td>{user.userCountry}</td>
                                    <td>{user.userSeller}</td>
                                    <td><button onClick={() => this.updateUser(user)} className='apply-now-btn'><i className="fa fa-check"></i></button></td>
                                    <td><button onClick={() => this.onClickDelete(user)} className='apply-now-btn-color'><i className="fa fa-trash"></i></button></td>
                                </tr>
                            ))}

                        </tbody>
                    </table >

                </div>


            </>
        )
    }
}

export default UserData;
