import React, { Component } from 'react'

import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import { loginHandler, loginSuccess } from '../frontend/redux/authActions'

class login extends Component {

    state = {
        username: null,
        password: null,
        error: null
    };


    onChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value,
            error: null
        });
    };
    onClickLogin = async event => {
        event.preventDefault();
        const { username, password } = this.state;

        const creds = {
            username,
            password
        };

        const { history, dispatch } = this.props;
        const { push } = history;

        this.setState({
            error: null
        })

        try {

            await dispatch(loginHandler(creds));


            push("/");


        } catch (apiError) {
            this.setState({
                error: apiError.response.data.message
            })
        }


    }


    render() {
        const { username, password, error } = this.state;

        const buttonEneabled = username && password;
        return (
            <div>

                <div class="pagination-area bg-secondary">
                    <div class="container">
                        <div class="pagination-wrapper">
                            <ul>
                                <li><a href="index.htm">Anasayfa</a><span> -</span></li>
                                <li>Giriş</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="login-form" >

                    <h2>sisteme Giriş</h2>
                    <form>

                        <input className="form-control" type="text" name="username" onChange={this.onChange} placeholder="Kullanıcı Adını giriniz" />
                        <input className="form-control" type="password" name="password" onChange={this.onChange} placeholder="Şifreyi giriniz" />
                        {error && <div className="alert alert-danger" >
                            {error}
                        </div>}
                        <button className="btn-login" disabled={!buttonEneabled} onClick={this.onClickLogin} >Giriş</button>
                        <Link className="btn-login" to="/register">Kayıt Ol</Link>



                    </form>
                </div>

            </div>
        )
    }
}



export default connect()(login)
