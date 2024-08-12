import React, { Component } from 'react'

export const Authentication = React.createContext();

class AuthenticationContext extends Component {

    state = {
        isLoggedIn: false,
        userFirstName: undefined,
        userLastName: undefined,
        userName: undefined,
        userPassword: undefined,
        userMail: undefined,
        userCountry: undefined,
        userRegisterDate: undefined,
        userAbout: undefined,
        userSeller: undefined,
        coverImage_imageUrl: undefined,
        profileImage_imageUrl: undefined,
    }

    onLoginSuccess = authState => {

        console.log(authState)
        this.setState({
            userFirstName: authState.userFirstName,
            userLastName: authState.userLastName,
            userName: authState.userName,
            userPassword: authState.userPassword,
            userMail: authState.userMail,
            userCountry: authState.userCountry,
            userRegisterDate: authState.userRegisterDate,
            userAbout: authState.userAbout,
            userSeller: authState.userSeller,
            coverImage_imageUrl: authState.coverImage_imageUrl,
            profileImage_imageUrl: authState.profileImage_imageUrl,
            isLoggedIn: true
        })
    }
    onLogoutSuccess = () => {
        this.setState({
            isLoggedIn: false,
            userName: undefined
        })
    }
    render() {
        return (
            <Authentication.Provider value={{
                state: { ...this.state },
                onLoginSuccess: this.onLoginSuccess,
                onLogoutSuccess: this.onLogoutSuccess
            }}>
                {this.props.children}
            </Authentication.Provider>
        )
    }
}
export default AuthenticationContext
