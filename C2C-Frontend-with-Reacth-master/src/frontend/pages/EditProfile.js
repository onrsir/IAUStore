import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createImage, updateUser } from '../../admin/Components/apiCall'

class EditProfile extends Component {

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
        profileFile: null,
        bannerFile: null
    };

    handleProfileFile(e) {
        let profileFile = e.target.files[0]
        this.setState({ profileFile: profileFile })
    }
    handleBannerFile(e) {
        let bannerFile = e.target.files[0]
        this.setState({ bannerFile: bannerFile })
    }

    onChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };


    componentDidMount() {
        this.setState({
            ...this.props
        })
    }



    imageUpload = async => {

    }



    onClickSave = async event => {
        event.preventDefault();
        let control = true;
        let coverImageId2 = this.state.coverImageId;
        let profileImageId2 = this.state.profileImageId;




        let profileFile = this.state.profileFile
        let profileImageBody = new FormData()

        profileImageBody.append('file', profileFile)
        profileImageBody.append('imageSubInfo', this.state.userFirstName + this.state + " Profile Photo")
        profileImageBody.append('imageUrl', "imageUrl")

        let profileImageResponse = null

        

        if (profileFile != null) {
            try {
                profileImageResponse = await createImage(profileImageBody);


            } catch (error) {
                control = false;
                this.setState({ errors: error.response.data.data })
                { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
            }

            profileImageId2 = profileImageResponse.data.id;
        }






        let bannerFile = this.state.bannerFile
        let bannerImageBody = new FormData()

        bannerImageBody.append('file', bannerFile)
        bannerImageBody.append('imageSubInfo', this.state.userFirstName + this.state + " Banner Photo")
        bannerImageBody.append('imageUrl', "imageUrl")

        let bannerImageResponse = null

        if (bannerFile != null) {
            try {
                bannerImageResponse = await createImage(bannerImageBody);

            } catch (error) {
                control = false;
                this.setState({ errors: error.response.data.data })
                { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
            }

            console.log(bannerImageResponse)
            coverImageId2 = bannerImageResponse.data.id;
        }



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
            coverImageId: coverImageId2,
            profileImageId: profileImageId2,
        };

        console.log(body)


        this.setState({ error: null })
        try {
            const response = await updateUser(body);
        } catch (error) {
            control = false;
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }

        this.render();


    };




    render() {

        const { userFirstName, userLastName, userId, userName, userPassword, userMail, userCountry, userAbout, userSeller, error, errors } = this.state;
        const { coverImage_imageUrl, profileImage_imageUrl } = this.props;
        return (
            <div>
                <div class="pagination-area bg-secondary">
                    <div class="container">
                        <div class="pagination-wrapper">
                            <ul>
                                <li><a href="index.htm">Home</a><span> -</span></li>
                                <li>Settings</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="settings-page-area bg-secondary section-space-bottom">
                    <div class="container">
                        <div class="row settings-wrapper">

                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-12">
                                <form class="form-horizontal" id="personal-info-form">
                                    <div class="settings-details tab-content">
                                        <div class="tab-pane fade active in" id="Personal">
                                            <h2 class="title-section">Kullanıcı Bilgileri</h2>

                                            <div class="personal-info inner-page-padding">


                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label">Profil Resmi</label>
                                                    <div className="col-sm-9">
                                                        <div class="file-title">Yeni Profil Fotografı Yükle:</div>
                                                        <input type="file" className="form-control" name="profileFile" onChange={(e) => this.handleProfileFile(e)} />
                                                        <div class="file-size">JPEG 80x80px</div>
                                                    </div>
                                                </div>



                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label">Banner Resmi</label>
                                                    <div className="col-sm-9">
                                                        <div class="file-title">Yeni Banner Fotografı Yükle:</div>
                                                        <input type="file" className="form-control" name="bannerFile" onChange={(e) => this.handleBannerFile(e)} />
                                                        <div class="file-size">JPEG 590x242</div>
                                                    </div>
                                                </div>



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
                                                        <textarea style={{ height: 150 }} className="form-control" value={userAbout != null ? userAbout : ''} defaultValue={userAbout} name="userAbout" onChange={this.onChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label">Kullanıcı Satıcı Mı ?</label>
                                                    <div className="col-sm-9">
                                                        <select className="form-control" value={userSeller != null ? userSeller : ''} defaultValue={userSeller} name="userSeller" onChange={this.onChange}>
                                                            <option value="">Seçilmedi</option>
                                                            <option value="Satıcı">Satıcı</option>
                                                            <option value="Kullanıcı">Kullanıcı</option>
                                                        </select>
                                                    </div>
                                                </div>




                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label"></label>
                                                    <div className="col-sm-9">
                                                        <label className="col-sm-9 text-danger">{error && error}</label>
                                                        <label className="col-sm-9 text-danger">{errors && errors.NotNull}</label>

                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label"></label>
                                                    <div className="col-sm-9">


                                                        <button onClick={this.onClickSave} className='update-btn'>Güncelle</button>


                                                    </div>
                                                </div>


                                            </div>
                                        </div>


                                    </div>

                                </form>
                            </div>
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
        userName: store.userName,
        userId: store.userId,
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
        coverImageId: store.coverImageId,
        profileImageId: store.profileImageId

    }
}



export default connect(mapStateToProps)(EditProfile);
