import React, { Component,Suspense } from 'react';
import Logo from '../../Assets/logo.svg';
import { renderRoutes } from 'react-router-config';
import { GiHamburgerMenu } from "react-icons/gi";
import { connect } from 'react-redux';
import { logout, loadUser } from '../../Store/Action/auth';
import { HomeFilled } from '@ant-design/icons';

export class Dashboard extends Component {

    //  Holds the State
    state={
        toogle: true,
        profile_img: ''
    }

    //  Constructor
    constructor(props) {
        super(props);
    }

    // Toogle
    handleChange(){
        this.setState({
            toogle: !this.state.toogle
        })
    }

    //  Handle Logout
    handleLogout(){
        this.props.logout()
    }

    //  Fired when New Props are recieved
    componentWillReceiveProps(nextProps){
        this.setState({ 
            profile_img: nextProps.auth?nextProps.auth.user.profile_img:"https://firebasestorage.googleapis.com/v0/b/nextbooks-1a9f0.appspot.com/o/Profile%2Funnamed.jpg?alt=media&token=26aa8e12-b869-4a2f-afde-ced8ebe2bf0e",
         })
    }

    //  Fired when the component mounts
    componentDidMount(){
        this.setState({ 
            profile_img: this.props.auth?this.props.auth.user.profile_img:"https://firebasestorage.googleapis.com/v0/b/nextbooks-1a9f0.appspot.com/o/Profile%2Funnamed.jpg?alt=media&token=26aa8e12-b869-4a2f-afde-ced8ebe2bf0e",
         })
    }

    render() {
        if(!this.props.isAuthenticated){
            this.props.history.push('/auth/login')
        }
        return (
          <div className={`${this.state.toogle?"":"enlarge-menu"}`} >
            {/* Sidebar */}
            <div className="left-sidenav" style={{ width: '60px' }}>
                <div className="brand">
                    <a href="/books/dashboard" className="logo">
                        <div className="row" style={{ textAlign: 'center' }}>
                            <div className="col-1" style={{ margin: '0 auto' }}>
                                <span>
                                    <img src={Logo} className="logo-dark" alt="logo-large" style={{ width: '25px', height: '25px' }}/>
                                </span>                                
                            </div>
                        </div>
                    </a>
                </div>
                <div className="menu-content h-100" data-simplebar>
                    <ul className="metismenu left-sidenav-menu">
                        <li className="menu-label mt-0">Main</li>
                        <li>
                            <a href="/books/dashboard"> <HomeFilled style={{ fontSize: '23px' }}/></a>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Appbar */}
            <div className="page-wrapper">
                <div className="topbar"> 
                    <nav className="navbar-custom">    
                        <ul className="list-unstyled topbar-nav float-right mb-0">  
                            <li className="dropdown">
                                <a className="nav-link dropdown-toggle waves-effect waves-light nav-user" data-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="false" aria-expanded="false">
                                    <img src={this.state.profile_img} alt="profile-user" className="rounded-circle thumb-xs" />                                 
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="/books/profile"><i data-feather="user" className="align-self-center icon-xs icon-dual mr-1"></i> Profile</a>
                                    <div className="dropdown-divider mb-0"></div>
                                    <a className="dropdown-item" onClick={(e)=>{
                                        e.preventDefault()
                                        this.handleLogout()
                                        }}><i data-feather="power" className="align-self-center icon-xs icon-dual mr-1"></i> Logout</a>
                                </div>
                            </li>
                        </ul>            
                        <ul className="list-unstyled topbar-nav mb-0">                        
                            <li className="creat-btn">
                                <button class="nav-link button-menu-mobile" onClick={()=>this.handleChange()}>
                                    {this.state.toogle?<GiHamburgerMenu  style={{ fontSize: '20', fontWeight: 'bold' }}/> :<GiHamburgerMenu  style={{ fontSize: '20', fontWeight: 'bold' }}/> }
                                </button>
                            </li> 
                            <li className="creat-btn">
                                <div className="nav-link">
                                    <a className=" btn btn-sm btn-soft-primary" href="#" role="button"><i className="fas fa-plus mr-2"></i>New Expense</a>
                                </div>                                
                            </li>                           
                        </ul>
                    </nav>
                </div>
                {/* Content */}
                <div class="page-content" style={{ margin: '20px' }}>
                    <div class="container-fluid">
                            <Suspense fallback={<div>Loading..</div>} >
                                {renderRoutes(this.props.route.routes)}
                            </Suspense>
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
    auth: state.auth.user
  });
  

export default connect(mapStateToProps,{logout,loadUser})(Dashboard);
