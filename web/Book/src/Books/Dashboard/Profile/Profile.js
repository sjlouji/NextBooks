import React, { Component } from 'react'
import { Card, Upload } from 'antd';
import { Image } from 'antd';
import { Divider } from 'antd';
import { connect } from 'react-redux';
import Security from './Security/Security'
import Information from './Information/Information'
import Logs from './Logs/Logs'
import { Button } from 'antd'
import { message } from 'antd'
import { storage } from "../../../firebase/firebase";
import { updateUser } from '../../../Store/Action/auth'
export class Profile extends Component {

    //  Holds the State
    state = {
        menu: 0,
        profile_img: 'https://firebasestorage.googleapis.com/v0/b/nextbooks-1a9f0.appspot.com/o/Profile%2Funnamed.jpg?alt=media&token=26aa8e12-b869-4a2f-afde-ced8ebe2bf0e',
        def_profile_img: 'https://firebasestorage.googleapis.com/v0/b/nextbooks-1a9f0.appspot.com/o/Profile%2Funnamed.jpg?alt=media&token=26aa8e12-b869-4a2f-afde-ced8ebe2bf0e'
    }

    //  Constructor
    constructor(props){
        super(props)
        this.handleUpload = this.handleUpload.bind(this)
    }

    //  Handles Menu Navigation
    handleNav(item){
        this.setState({
            menu: item,
        })
    }

    //  Uploads profile image to firebase storage
    handleUpload(e){
        const uploadTask = storage.ref(`/Profile/${this.props.auth?this.props.auth.user.email:""}`).put(e)
        uploadTask.on('state_changed', 
        (snapShot) => {

        }, (err) => {
          message(err)
        }, () => {
          storage.ref('Profile').child(this.props.auth?this.props.auth.user.email:"").getDownloadURL()
           .then(fireBaseUrl => {
            message.success(`Profile Image updated successfully.`);
            this.props.updateUser("",'','','',fireBaseUrl)
            this.setState({  
                profile_img: fireBaseUrl
            })
           })
        })
    }

    //  Fired when the component recieves new props
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
        let menu;
        if(this.state.menu === 0){
            menu = <Information />;
        }else if(this.state.menu === 1){
            menu = <Security />;
        }else if(this.state.menu === 2){
            menu = <Logs />;
        } 
        return (
          <div className="">
              {/* Breadcrumb */}
              <div class="row">
                  <div class="col-sm-12">
                      <div class="page-title-box">
                          <div class="row">
                              <div class="col">
                                  <h4 class="page-title">Profile</h4>
                                  <ol class="breadcrumb">
                                      <li class="breadcrumb-item"><a href="/books/profile">Profile</a></li>
                                      {this.props.location.pathname==='/books/profile'?<li class="breadcrumb-item active">Personal Information</li>:""}
                                      {this.props.location.pathname==='/books/profile/logs'?<li class="breadcrumb-item active">Logs</li>:""}
                                      {this.props.location.pathname==='/books/profile/security'?<li class="breadcrumb-item active">Account Security</li>:""}
                                  </ol>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              {/* Content */}
              <div className="row">
                <div className="col-4">
                  <Card>
                      <div style={{ width: '100%', float: 'right', textAlign: 'end' }}>
                        <Upload accept=".png, .jpg, .jpeg" multiple={false} beforeUpload={this.handleUpload} showUploadList={false} style={{ float: 'right' }}><Button type="primary">Update Profile Pic</Button></Upload>
                      </div>
                    <Image
                      width="40%"
                      style={{ borderRadius: '50%' }}
                      src={this.state.profile_img}
                    />
                    <h3 style={{ fontWeight: 'normal', marginTop: '15px' }}>{this.props.auth?this.props.auth.user.first_name + this.props.auth.user.last_name:""}</h3>
                    <h6 style={{ color: '#525252', fontSize: '13', fontWeight: 'lighter' }}>{this.props.auth?this.props.auth.user.email:""}</h6>
                    <div style={{ marginTop: '20px', textAlign: 'justify' }}>
                    {this.props.auth?this.props.auth.user.bio === ''?"Hey there. Please Update your profile":this.props.auth.user.bio:"Hey there. Please Update your profile"}
                        <div style={{ marginTop: '20px', textAlign: 'justify' }}>
                            <p>{this.props.auth?this.props.auth.user.mobile:""}</p>
                        </div>
                    </div>
                    <Divider />
                    <div className="menu-content h-100" data-simplebar>
                        <li className="menu-label">Profile Settings</li>
                        <ul className="metismenu left-sidenav-menu">
                            <li>
                                <a onClick={()=>this.handleNav(0)}> <i data-feather="home" className="align-self-center menu-icon"></i><span>Personal Infomation</span><span className="menu-arrow"><i className="mdi mdi-chevron-right" ></i></span></a>
                            </li>
                            <li>
                                <a  onClick={()=>this.handleNav(1)}> <i data-feather="home" className="align-self-center menu-icon"></i><span>Notification</span><span className="menu-arrow"><i className="mdi mdi-chevron-right"></i></span></a>
                            </li>
                            <li>
                                <a  onClick={()=>this.handleNav(2)}> <i data-feather="home" className="align-self-center menu-icon"></i><span>Profile Logs</span><span className="menu-arrow"><i className="mdi mdi-chevron-right"></i></span></a>
                            </li>
                            <li>
                                <a onClick={()=>this.handleNav(1)}> <i data-feather="home" className="align-self-center menu-icon"></i><span>Account Security</span><span className="menu-arrow"><i className="mdi mdi-chevron-right"></i></span></a>
                            </li>
                        </ul>
                    </div>
                  </Card>
                </div>
                <div className="col-8" style={{ paddingLeft: 0, paddingRight: 23 }}>
                    <Card style={{ width: '100%' }}>
                        {menu}
                    </Card>
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
  

export default connect(mapStateToProps,{updateUser})(Profile);
