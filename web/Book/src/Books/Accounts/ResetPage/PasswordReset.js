import React, { Component } from 'react'
import Logo from '../../../Assets/logo.svg'
import { changePassword } from '../../../Store/Action/auth';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { message } from 'antd';

// Success Messge Box
const success = (data) => {
    message.success(data);
};
  
// Error Message Box
const error = (data) => {
    message.error(data);
};

export class PasswordReset extends Component {

    //  Holds the State
    state = {
        password: '',
    }

    //  Handles error and changes the password
    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.password === '') {error('Password Field is required')}
        else{this.props.changePassword(this.state.password, this.props.match.params.token);}
    };

    //  Recieves new props. Primarily used for Error Handling
    componentWillReceiveProps(nextProps){
        if(nextProps.error !== undefined){
            if(nextProps.error.message === 'Network Error'){
                error(nextProps.error.message)
            } 
            else{
                error(nextProps.error.response.data.error)
            }
        }
        else if(nextProps.reset !== undefined){
            success(nextProps.reset.msg)
        }
    }
    
    //  Update State
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <div className="container">
                <div className="row vh-100 d-flex justify-content-center">
                    <div className="col-12 align-self-center">
                        <div className="row">
                            <div className="col-lg-5 mx-auto">
                                <div style={{  boxShadow: '0px 5px 80px 0px #e4e8f0', background: '#fff', width: '400px'}}>
                                    <div className="card-body p-0 auth-header-box" style={{ backgroundColor: '#ffffff' }}>
                                        <div className="text-center p-3">
                                            <a href="index.html" className="logo logo-admin">
                                                <img src={Logo} height="50" alt="logo" className="auth-logo"/>
                                            </a>
                                            <h4 className="mt-3 mb-1 font-weight-semibold font-18" style={{ color: '#303e67' }}>Reset Password</h4>   
                                            <p className="text-muted  mb-0" style={{ color: '#303e67' }}>Enter your new password! </p>  
                                        </div>
                                    </div>
                                    <div className="card-body p-0">
                                        <div className="tab-content">
                                            <div className="tab-pane active p-3" id="LogIn_Tab" role="tabpanel">                                        
                                                <form className="form-horizontal auth-form" onSubmit={this.onSubmit}>
                                                    <div className="form-group mb-2 my-3">
                                                        <div className="input-group">                                                                                         
                                                            <input type="password" className="form-control" name="password" id="password" placeholder="Change Password" value={this.state.email} onChange={this.onChange}/>
                                                        </div>                                    
                                                    </div>
                                                    <div className="form-group mb-0 my-3 row">
                                                        <div className="col-12">
                                                            <button className="btn btn-primary btn-block waves-effect waves-light"  type="submit">Reset Password</button>
                                                        </div>
                                                    </div> 
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body bg-light-alt text-center">
                                        <span className="text-muted d-none d-sm-inline-block">Joan Louji © 2020</span>                                            
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
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    reset: state.auth.reset,
  });
  
export default connect(mapStateToProps, {changePassword})(withRouter(PasswordReset));