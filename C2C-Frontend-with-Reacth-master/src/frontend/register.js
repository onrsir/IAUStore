import React, { Component } from 'react'
import { createUser } from '../admin/Components/apiCall'
class register extends Component {
    state = {
        errors: [],
        userFirstName: null,
        userLastName: null,
        userName: null,
        userPassword: null,
        userMail: null,
        userCountry: null,
        userAbout: null,
        error: null,
        success: null


    };


    onChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value,
            error: null,
            errors: [],
            success: null
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
            userSeller: "Satıcı",
            coverImageId: 30,
            profileImageId: 29,

        };
        let control = true;


        try {
            const response = await createUser(body);
        } catch (error) {
            control = false;
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
            console.log(error.response.data.data)
        }
        control && this.deleteForm();
        control && this.setState({
            success: "Kullanıcı Kaydı Başarılı Login Olabilirsiniz.."
        })


    };
    deleteForm = event => {
        this.setState({
            userFirstName: null,
            userLastName: null,
            userName: null,
            userPassword: null,
            userMail: null,
            userCountry: null,
            userAbout: null,
        })
        this.render();
    };


    render() {

        const { success, userFirstName, userLastName, userName, userPassword, userMail, userCountry, userAbout, error, errors } = this.state;

        return (
            <div>

                <div class="pagination-area bg-secondary">
                    <div class="container">
                        <div class="pagination-wrapper">
                            <ul>
                                <li><a href="/">Home</a><span> -</span></li>
                                <li>Kayıt ol</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="registration-page-area bg-secondary section-space-bottom">
                    <div class="container">
                        <h2 class="title-section">Kullanıcı Kaydı</h2>
                        <div class="registration-details-area inner-page-padding">





                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label class="control-label" for="first-name">Ad *</label>
                                        <input className="form-control" value={userFirstName != null ? userFirstName : ''} defaultValue={userFirstName} name="userFirstName" onChange={this.onChange} />
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label class="control-label" for="last-name">Soyad *</label>
                                        <input className="form-control" value={userLastName != null ? userLastName : ''} defaultValue={userLastName} name="userLastName" onChange={this.onChange} />

                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label class="control-label" for="company-name">Kullanıcı Adı</label>
                                        <input className="form-control" value={userName != null ? userName : ''} defaultValue={userName} name="userName" onChange={this.onChange} />
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label class="control-label" for="email">E-mail Adresi *</label>
                                        <input className="form-control" value={userMail != null ? userMail : ''} defaultValue={userMail} name="userMail" onChange={this.onChange} />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label class="control-label" for="phone">Şifre *</label>
                                        <input className="form-control" type="password" value={userPassword != null ? userPassword : ''} defaultValue={userPassword} name="userPassword" onChange={this.onChange} />
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label class="control-label" for="phone">Şehir *</label>
                                        <input className="form-control" value={userCountry != null ? userCountry : ''} defaultValue={userCountry} name="userCountry" onChange={this.onChange} />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label class="control-label" for="phone">Hakkınızda *</label>
                                        <input className="form-control" value={userAbout != null ? userAbout : ''} defaultValue={userAbout} name="userAbout" onChange={this.onChange} />
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-3 control-label"></label>
                                        <div className="col-sm-9">
                                            <label className="col-sm-9 text-danger">{error && error}</label>
                                            <label className="col-sm-9 text-danger">{errors && errors.NotNull} {errors && errors.Email}</label>
                                            <label className="col-sm-9 text-success">{success && success}</label>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="pLace-order">
                                        <button class="update-btn disabled" onClick={this.onClickSave}  >Kayıt Ol</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
export default register
