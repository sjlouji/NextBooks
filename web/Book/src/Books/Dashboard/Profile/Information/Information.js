import React, { Component } from 'react'
import { Button, Input } from 'antd';
import { connect } from 'react-redux';
const { Search } = Input;
const { TextArea } = Input;

export class Information extends Component {
    render() {
        return (
          <div>
            <h3>Personal Information</h3>
            Basic info, like your name and mobile, that you use on NextBooks Platform
            <div className="container">
                <div className="row" style={{ marginLeft: '200px', marginRight: '200px' }}>
                    <Search
                        placeholder="Id"
                        allowClear
                        disabled
                        value={this.props.auth?this.props.auth.user._id:""}
                        style={{  marginTop: '40px' }}
                        enterButton="Update"
                        size="medium"
                    />
                </div>
                <div className="row" style={{ marginLeft: '200px', marginRight: '200px' }}>
                    <Search
                        placeholder="First Name"
                        allowClear
                        value={this.props.auth?this.props.auth.user.first_name:""}
                        style={{  marginTop: '20px' }}
                        enterButton="Update"
                        size="medium"
                    />
                </div>
                <div className="row" style={{ marginLeft: '200px', marginRight: '200px' }}>
                    <Search
                        placeholder="Last Name"
                        allowClear
                        value={this.props.auth?this.props.auth.user.last_name:""}
                        style={{  marginTop: '20px' }}
                        enterButton="Update"
                        size="medium"
                    />
                </div>
                <div className="row" style={{ marginLeft: '200px', marginRight: '200px' }}>
                    <Search
                        placeholder="Mobile"
                        allowClear
                        value={this.props.auth?this.props.auth.user.mobile:""}
                        style={{ marginTop: '20px' }}
                        enterButton="Update"
                        size="medium"
                    />
                </div>
                <div className="row" style={{ marginLeft: '200px', marginRight: '200px' }}>
                    <Search
                        placeholder="Email"
                        disabled
                        allowClear
                        value={this.props.auth?this.props.auth.user.email:""}
                        style={{ marginTop: '20px' }}
                        enterButton="Update"
                        size="medium"
                    />
                </div>
                <div className="row" style={{ marginLeft: '200px', marginRight: '200px' }}>
                    <TextArea autoSize={{ minRows: 10, maxRows: 15 }} autoSize style={{ marginTop: '20px' }} value={this.props.auth?this.props.auth.user.bio === ''?"Hey there. Please Update your profile":this.props.auth.user.bio:"Hey there. Please Update your profile"}></TextArea>
                    <div style={{ width: '100%' }}>
                        <Button style={{ float: 'right', width: '20%', marginTop: '15px' }} type="primary">Update Bio</Button>
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
  

export default connect(mapStateToProps,)(Information);
