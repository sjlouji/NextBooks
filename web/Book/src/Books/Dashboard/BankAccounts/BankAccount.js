import React, { Component } from 'react'
import AccountComponent from './Component/AccountComponent'
import { Row, Col, Modal, Input, Button, Select } from 'antd';

export class BankAccount extends Component {

    state = {
        visible: false
    }

    render() {
        return (
          <div className="container-fluid">
              {/* BreadCrumps */}
             <div className="row">
                <div className="col-lg-6">
                    <div className="page-title-box">
                        <div className="row">
                            <div className="col">
                                <h4 className="page-title">Accounts</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <Button type="primary" style={{ float: 'right' , marginRight: '100px'}} onClick={()=>this.setState({visible: true})}>Add a Account</Button>
                </div>
              </div>
              <div>
                <Row>
                    <Col span={5} style={{ padding: '10px' }}>
                        <AccountComponent />                    
                    </Col>
                    <Col span={5} style={{ padding: '10px' }}>
                        <AccountComponent />                    
                    </Col>
                    <Col span={5} style={{ padding: '10px' }}>
                        <AccountComponent />                    
                    </Col>
                    <Col span={5} style={{ padding: '10px' }}>
                        <AccountComponent />                    
                    </Col>
                    <Col span={5} style={{ padding: '10px' }}>
                        <AccountComponent />                    
                    </Col>
                    <Col span={5} style={{ padding: '10px' }}>
                        <AccountComponent />                    
                    </Col>
                    <Col span={5} style={{ padding: '10px' }}>
                        <AccountComponent />                    
                    </Col>
                    <Col span={5} style={{ padding: '10px' }}>
                        <AccountComponent />                    
                    </Col>
                </Row>
                <Modal
                    title="Add a New Account"
                    centered
                    visible={this.state.visible}
                    okText="Add Account"
                    onOk={() => this.setState({visible: false})}
                    onCancel={() => this.setState({visible: false})}
                    width={500}
                >
                    <Input placeholder="Account Name" name="account_name" style={{ margin: '10px' }}></Input>
                    <Select style={{ width: '100%',margin: '10px' }} placeholder="Account Type">
                        <Select.Option value="cash_account">Cash Account</Select.Option>
                        <Select.Option value="bank_account">Bank Account</Select.Option>
                        <Select.Option value="wallet_account">Wallet Account</Select.Option>
                    </Select>                    
                    <Input placeholder="Initial Balance" name="account_name" type="number" prefix={<i className="mdi mdi-cash" style={{ color: 'grey' }}></i>} style={{ margin: '10px' }}></Input>
                    <Input placeholder="Provider eg. Indian Bank, Paytm" name="account_name" style={{ margin: '10px' }}></Input>
                </Modal>
              </div>
          </div>
        )
    }
  
}

export default  BankAccount;