import React, { Component } from 'react'
import Logo from '../../../Assets/logo.svg'
import { resetPassword } from '../../../Store/Action/auth';
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { message } from 'antd';


// Success Messge Box
const success = (data) => {
    message.success(data);
};
  
// Error Message Box
const error = (data) => {
    message.error(data);
};

// Const to validate email format
const email_regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;


export class ResetPage extends Component {

    //  Holds the State
    state = {
        email: '',
    }

    //  Handles error and sends reset link
    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.email === '') {error('Email Field is required')}
        else if(!email_regex.test(this.state.email)) {error('Invalid Email Format')}
        else{this.props.resetPassword(this.state.email);}
    };

    //  Recieves new props. Primarily used for Error Handling
    componentWillReceiveProps(nextProps){
        console.log(nextProps.reset)
        if(nextProps.error !== undefined){
            if(nextProps.error.message === 'Network Error'){
                error(nextProps.error.message)
            } 
            else{
                error(nextProps.error.response.data.error);
            }
        }
        else if(nextProps.reset !== undefined){
            success(nextProps.reset.msg)
        }
    }
    
    //  Update State
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        if(this.props.isAuthenticated){
            return <Redirect to="/"/>
        }
        return (
            <div className="container">
                <div className="row vh-100 d-flex justify-content-center">
                    <div className="col-12 align-self-center">
                        <div className="row">
                            <div className="col-lg-5 mx-auto">
                                <div style={{  boxShadow: '0px 5px 80px 0px #e4e8f0', background: '#fff', width: '400px'}}>
                                    <div className="card-body p-0 auth-header-box" style={{ backgroundColor: 'white' }}>
                                        <div className="text-center p-3">
                                            <a href="index.html" className="logo logo-admin">
                                                <img src={Logo} height="50" alt="logo" className="auth-logo"/>
                                            </a>
                                            <h4 className="mt-3 mb-1 font-weight-semibold font-18" style={{ color: 'black' }}>Reset Password</h4>   
                                            <p className="text-muted  mb-0">Enter your Email and instructions will be sent to you! </p>  
                                        </div>
                                    </div>
                                    <div className="card-body p-0">
                                        <div className="tab-content">
                                            <div className="tab-pane active p-3" id="LogIn_Tab" role="tabpanel">                                        
                                                <form className="form-horizontal auth-form" onSubmit={this.onSubmit}>
                                                    <div className="form-group mb-2 my-3">
                                                        <div className="input-group">                                                                                         
                                                            <input type="email" className="form-control" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.onChange}/>
                                                        </div>                                    
                                                    </div>
                                                    <div className="form-group mb-0 my-3 row">
                                                        <div className="col-12">
                                                            <button className="btn btn-primary btn-block waves-effect waves-light"  type="submit">Reset </button>
                                                        </div>
                                                    </div> 
                                                </form>
                                                <div className="m-3 text-center text-muted">
                                                    <p className="mb-0">Know your password ?  <a href="/auth/login" className="text-primary ml-2">SignIn</a></p>
                                                </div>
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
    reset: state.auth.reset
  });
  
export default connect(mapStateToProps, {resetPassword})(withRouter(ResetPage));