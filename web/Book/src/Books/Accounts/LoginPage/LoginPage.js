import React, { Component } from 'react'
import Logo from '../../../Assets/logo.svg'
import { login } from '../../../Store/Action/auth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { message } from 'antd';


// Success Messge Box
const success = () => {
    message.success('This is a success message');
};
  
// Error Message Box
const error = (data) => {
    message.error(data);
};

// Const to validate email format
const email_regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;


export class LoginPage extends Component {

    //  Holds the State
    state = {
        email: '',
        password: ''
    }

    //  Handles the errors and  that hapens after Login
    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.email === '') {error('Email Field is required')}
        else if(!email_regex.test(this.state.email)) {error('Invalid Email Format')}
        else if(this.state.password === '') {error('Password Field is required')}
        else{this.props.login(this.state.email, this.state.password);}
    };

    //  Recieves new props. Primarily used for Error Handling
    componentWillReceiveProps(nextProps){
        if(nextProps.error !== undefined){
            if(nextProps.error.message === 'Network Error'){
                error(nextProps.error.message)
            }else{
                error(nextProps.error.response.data.error)
            }
        }
    }
    
    //  Update State
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });


    render() {
        if(this.props.isAuthenticated){
            this.props.history.goBack()
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
                                            <h4 className="mt-3 mb-1 font-weight-semibold font-18" style={{ color: 'black' }}>Let's Get Started</h4>   
                                            <p className="text-muted  mb-0">Sign in to continue to NextBooks.</p>  
                                        </div>
                                    </div>
                                    <div className="card-body p-0">
                                        <ul className="nav-border nav nav-pills" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active font-weight-semibold" data-toggle="tab" href="#LogIn_Tab" role="tab">Log In</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            <div className="tab-pane active p-3" id="LogIn_Tab" role="tabpanel">                                        
                                                <form className="form-horizontal auth-form" onSubmit={this.onSubmit}>
                                                    <div className="form-group mb-2 my-3">
                                                        <div className="input-group">                                                                                         
                                                            <input type="email" className="form-control" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.onChange}/>
                                                        </div>                                    
                                                    </div>
                                                    <div className="form-group mb-2 my-3">
                                                        <div className="input-group">                                  
                                                            <input type="password" className="form-control" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
                                                        </div>                               
                                                    </div>
                                                    <div className="form-group form-group mb-0 row my-3">
                                                        <div className="col-6">

                                                        </div>
                                                        <div className="col-sm-6 text-right" >
                                                            <p className="mb-0">Forgot Password ?  <a href="/auth/reset" className="text-primary ml-2">Reset</a></p>
                                                        </div>
                                                    </div>
                                                    <div className="form-group mb-0 row">
                                                        <div className="col-12">
                                                            <button className="btn btn-primary btn-block waves-effect waves-light"  type="submit">Log In </button>
                                                        </div>
                                                    </div> 
                                                </form>
                                                <div className="m-3 text-center text-muted">
                                                    <p className="mb-0">Don't have an account ?  <a href="/auth/signup" className="text-primary ml-2">Resister</a></p>
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
    error: state.auth.error
  });
  

export default connect(mapStateToProps, {login})(withRouter(LoginPage));