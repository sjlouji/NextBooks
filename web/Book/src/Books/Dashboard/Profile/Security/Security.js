import React, { Component } from 'react'
import { Button, Modal, Input, message } from 'antd'
import { logout, deactivateUser,passwordChangeUI} from '../../../../Store/Action/auth';
import { connect } from 'react-redux';

export class Security extends Component {

    //  Holds the state variables
    state = {
        visible: false,
        password: ''
    }

    //  Constructor
    constructor(props){
        super(props)
        this.deactivateAccount = this.deactivateAccount.bind(this)
        this.openPasswordReset = this.openPasswordReset.bind(this)
    }

    //  Handle Logout
    handleLogout(){
        this.props.logout()
    }

    //  Fired when decativate button is clicked
    deactivateAccount(){
        this.props.deactivateUser()
    }

    //  Makes password reset dialog visible
    openPasswordReset(){
        this.setState({visible: true})
    }
    
    //  Hits the reset password API 
    handlePasswordReset(){
        this.props.passwordChangeUI(this.state.password)
    }

    //  Update State
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });


    //  Fired when the component recieves new props
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.msg === 'Successfull'){
            message.success('Password Changed Successfully')
            this.setState({visible: false})
        }
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
                    <Button type="primary" shape="round" onClick={this.openPasswordReset}>Change Password</Button>
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
                    <h5>Deactivate Account</h5>
                    <p style={{ color: '#8a8a8a' }}>Data about this account will not be deleted from our server since your are deactivating. </p>
                </div>
                <div className="col" style={{ textAlign: 'center' }}>
                    <Button type="danger" shape="round" onClick={this.deactivateAccount}>Deactivate Account</Button>
                </div>
            </div>
            <Modal
                title="Password Change"
                centered
                visible={this.state.visible}
                okText="Change Password"
                onOk={() => this.handlePasswordReset()}
                onCancel={() => this.setState({visible: false})}
                width={500}
            >
                <Input placeholder="New Password" value={this.state.password} name="password" onChange={this.onChange}></Input>
            </Modal>
          </div>
        )
    }
  
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    auth: state.auth.user
  });
  

export default connect(mapStateToProps,{logout,deactivateUser,passwordChangeUI})(Security);
