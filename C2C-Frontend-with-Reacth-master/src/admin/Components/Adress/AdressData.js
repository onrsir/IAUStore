import React, { Component } from 'react'
import { getAllUser, createAdress, getAllAdress, updateAdress, getByAdressId, deleteAdress } from '../apiCall'

class AdressData extends Component {
    state = {
        addressId: null,
        addressTitle: null,
        addressFirstName: null,
        addressLastName: null,
        addressMail: null,
        addressPhoneNumber: null,
        addressProvince: null,
        addressCounty: null,
        addressDistrict: null,
        addressPostCode: null,
        addressFullAdress: null,
        userId: null,
        error: null,
        errors: [],
        adresss: [],
        users: []
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


            addressTitle: this.state.addressTitle,
            addressFirstName: this.state.addressFirstName,
            addressLastName: this.state.addressLastName,
            addressMail: this.state.addressMail,
            addressPhoneNumber: this.state.addressPhoneNumber,
            addressProvince: this.state.addressProvince,
            addressCounty: this.state.addressCounty,
            addressDistrict: this.state.addressDistrict,
            addressPostCode: this.state.addressPostCode,
            addressFullAdress: this.state.addressFullAdress,
            userId: this.state.userId,

        };

        try {
            const response = await createAdress(body);
        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllAdressForTable();
        this.deleteForm();


    };
    //Burası Table Fonksiyonu için 

    componentDidMount() {
        this.getAllAdressForTable();
        this.getAllUsersForTable();
    };
    getAllUsersForTable() {
        getAllUser().then(response => {
            this.setState({
                users: response.data.data
            })
        })
    }

    getAllAdressForTable() {
        getAllAdress().then(response => {
            this.setState({
                adresss: response.data.data

            });
        });
    }
    //Burası update Fonksiyonları 

    updateAdress = async adress => {
        const response = await getByAdressId(adress.addressId);
        this.setState({
            addressId: adress.addressId,
            addressTitle: adress.addressTitle,
            addressFirstName: adress.addressFirstName,
            addressLastName: adress.addressLastName,
            addressMail: adress.addressMail,
            addressPhoneNumber: adress.addressPhoneNumber,
            addressProvince: adress.addressProvince,
            addressCounty: adress.addressCounty,
            addressDistrict: adress.addressDistrict,
            addressPostCode: adress.addressPostCode,
            addressFullAdress: adress.addressFullAdress,
            userId: response.data.data.userId,
        })
    };

    onClickUpdate = async event => {
        event.preventDefault();
        const body = {
            addressId: this.state.addressId,
            addressTitle: this.state.addressTitle,
            addressFirstName: this.state.addressFirstName,
            addressLastName: this.state.addressLastName,
            addressMail: this.state.addressMail,
            addressPhoneNumber: this.state.addressPhoneNumber,
            addressProvince: this.state.addressProvince,
            addressCounty: this.state.addressCounty,
            addressDistrict: this.state.addressDistrict,
            addressPostCode: this.state.addressPostCode,
            addressFullAdress: this.state.addressFullAdress,
            userId: this.state.userId,
        };

        this.setState({ error: null })
        try {
            const response = await updateAdress(body);
        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllAdressForTable();
        this.deleteForm();
    };

    //Burası Delete Fonksiyonları 

    onClickDelete = async event => {
        try {
            const response = await deleteAdress(event.addressId);

        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllAdressForTable();
        this.deleteForm();


    };
    //form delete 
    deleteForm = event => {
        this.setState({
            addressId: null,
            addressTitle: null,
            addressFirstName: null,
            addressLastName: null,
            addressMail: null,
            addressPhoneNumber: null,
            addressProvince: null,
            addressCounty: null,
            addressDistrict: null,
            addressPostCode: null,
            addressFullAdress: null,
            userId: null,
        })
        this.render();
    };

    render() {

        const { users, adresss, addressId, addressTitle, addressFirstName, addressLastName, addressMail, addressPhoneNumber, addressProvince, addressCounty, addressDistrict,
            addressPostCode, addressFullAdress, userId, error } = this.state;
        return (
            <>
                { }
                <div className="form-group">
                    <label className="col-sm-3 control-label">Adres Başlığı </label>
                    <div className="col-sm-9">
                        <input className="form-control" value={addressTitle != null ? addressTitle : ''} defaultValue={addressTitle} name="addressTitle" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Ad</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={addressFirstName != null ? addressFirstName : ''} defaultValue={addressFirstName} name="addressFirstName" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Soyad</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={addressLastName != null ? addressLastName : ''} defaultValue={addressLastName} name="addressLastName" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Mail Adresi</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={addressMail != null ? addressMail : ''} defaultValue={addressMail} name="addressMail" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Telefon Numarası</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={addressPhoneNumber != null ? addressPhoneNumber : ''} defaultValue={addressPhoneNumber} name="addressPhoneNumber" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">İl</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={addressProvince != null ? addressProvince : ''} defaultValue={addressProvince} name="addressProvince" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">İlçe</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={addressCounty != null ? addressCounty : ''} defaultValue={addressCounty} name="addressCounty" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Mahalle/Köy </label>
                    <div className="col-sm-9">
                        <input className="form-control" value={addressDistrict != null ? addressDistrict : ''} defaultValue={addressDistrict} name="addressDistrict" onChange={this.onChange} />
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-sm-3 control-label">Posta Kodu</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={addressPostCode != null ? addressPostCode : ''} defaultValue={addressPostCode} name="addressPostCode" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Açık Adress</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={addressFullAdress != null ? addressFullAdress : ''} defaultValue={addressFullAdress} name="addressFullAdress" onChange={this.onChange} />
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
                    <label className="col-sm-3 control-label"></label>
                    <div className="col-sm-9">
                        <label className="col-sm-9 text-danger">{error}</label>

                    </div>
                </div>

                <div className="form-group">
                    <label className="col-sm-3 control-label"></label>
                    <div className="col-sm-9">

                        {addressId == null &&
                            <button onClick={this.onClickSave} className='update-btn'>Kayıt Et</button>
                        }
                        {addressId != null &&
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
                                <th>Adres Başlığı</th>
                                <th>Ad Soyad</th>

                                <th>İl</th>
                                <th>İlçe</th>
                                <th>Kullanıcı Adı</th>
                                <th>Düzenle</th>
                                <th>Sil</th>
                            </tr>
                        </thead>


                        <tbody>
                            {adresss.map((adress) => (

                                <tr key={adress.addressId}>
                                    <th>{adress.addressId}</th>
                                    <td>{adress.addressTitle}</td>
                                    <td>{adress.addressFirstName}{" "}{adress.addressLastName}</td>

                                    <td>{adress.addressProvince}</td>
                                    <td>{adress.addressCounty}</td>
                                    <td>{adress.userName}</td>
                                    <td><button onClick={() => this.updateAdress(adress)} className='apply-now-btn'><i className="fa fa-check"></i></button></td>
                                    <td><button onClick={() => this.onClickDelete(adress)} className='apply-now-btn-color'><i className="fa fa-trash"></i></button></td>
                                </tr>
                            ))}

                        </tbody>
                    </table >

                </div>


            </>
        )
    }
}

export default AdressData;
