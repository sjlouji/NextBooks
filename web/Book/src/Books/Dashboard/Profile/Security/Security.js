import React, { Component } from 'react'
import { Button } from 'antd'
import { logout, resetPassword } from '../../../../Store/Action/auth';
import { connect } from 'react-redux';

export class Security extends Component {

    //  Handle Logout
    handleLogout(){
        console.log('logging out')
        this.props.logout()
    }
    handlePasswordReset(){
        console.log(this.props.auth.user.email)
        // this.props.resetPassword(this.props.auth.user.email)
    }
    render() {
        return (
          <div>
            <h3>Security Settings</h3>
            These settings are helps you keep your account secure.
            <div className="row" style={{ marginTop: '60px' }}>
                <div className="col">
                    <h5>Change Password</h5>
                    <p style={{ color: '#8a8a8a' }}>Set a unique password to protect your account.</p>
                </div>
                <div className="col" style={{ textAlign: 'center' }}>
                    <Button type="primary" shape="round" onClick={()=>this.handlePasswordReset()}>Change Password</Button>
                </div>
            </div>
            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col">
                    <h5>Logout</h5>
                    <p style={{ color: '#8a8a8a' }}>This does not delete your account, but just end the session</p>
                </div>
                <div className="col" style={{ textAlign: 'center' }}>
                    <Button type="danger" shape="round" onClick={()=>this.handleLogout()}>Logout</Button>
                </div>
            </div>
            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col">
                    <h5>Delete Account</h5>
                    <p style={{ color: '#8a8a8a' }}>Data about this account will not be deleted from our server since your are deleting. </p>
                </div>
                <div className="col" style={{ textAlign: 'center' }}>
                    <Button type="danger" shape="round">Delete Account</Button>
                </div>
            </div>
          </div>
        )
    }
  
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    auth: state.auth.user
  });
  

export default connect(mapStateToProps,{logout,resetPassword})(Security);
