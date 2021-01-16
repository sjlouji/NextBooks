import React, { Component } from 'react'
import AccountComponent from './Component/AccountComponent'
import { Row, Col, Modal, Input, Button, Select, message } from 'antd';
import { connect } from 'react-redux';
import { loadAccount, addAccount } from '../../../Store/Action/account'

// Success Messge Box
const success = () => {
    message.success('This is a success message');
};
  
// Error Message Box
const error = (data) => {
    message.error(data);
};
export class BankAccount extends Component {

    //  Holds all the State varialbles
    state = {
        visible: false,
        account_name: '',
        account_type: 'cash_account',
        initialBalance: '',
        account_provider: '',
        account_id: '',
        account: []
    }

    //  Constructor
    constructor(props){
        super(props)
    }

    //  Fired when the component gets loaded
    componentDidMount(){
        this.props.loadAccount()
        this.setState({ account: this.props.account })
    }

    //  Fired when the component recieves new props
    componentWillReceiveProps(nextProps){
        if(nextProps.error !== undefined){
            if(nextProps.error.message === 'Network Error'){
                error(nextProps.error.message)
                this.setState({ account: nextProps.account })
            }else{
                this.setState({ account: nextProps.account })
                error(nextProps.error.response.data.error)
            }
        }
        this.setState({ account: nextProps.account })
    }

    //  Handles the things that happen after clicking Add a new Account
    handleAddAccount(){
        if(this.state.account_id === ''){error('Account Number can not be Empty')}
        else if(this.state.account_name === ''){error('Account Name can not be Empty')}
        else if(this.state.initialBalance === ''){error('Initial balance can not be Empty')}
        else if(this.state.account_provider === ''){error('Account Provider can not be Empty')}
        else{
            this.props.addAccount(this.state.account_id, this.state.account_name, this.state.account_type, this.state.initialBalance, this.state.account_provider)
            this.setState({visible: false})
        }
    }

    //  Onchage for normal Input and Dropdown Input
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    onDropDownChange = (e) => this.setState({ account_type: e });

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
              {/* Content */}
              <div>
                <Row>
                    {this.state.account ? this.state.account.length === 0?
                        <div style={{ display: 'flex', position: 'absolute', right: '0', left: '0' }}>
                            <img  src="https://firebasestorage.googleapis.com/v0/b/nextbooks-1a9f0.appspot.com/o/images%2FNo%20data-pana.png?alt=media&token=cb5cea24-210c-48cd-bc65-8875b00fb5b8" style={{ width: '30%', height: '50%', margin: 'auto' }} alt="user_photo"></img>
                        </div>
                    :
                        this.state.account?this.state.account.map((data,i)=>{
                            return(
                                <Col span={5} style={{ padding: '10px' }}>
                                    <AccountComponent key={data._id} account={data}/>                    
                                </Col>
                            )
                        }):"No data"
                    :""}
                </Row>
                <Modal
                    title="Add a New Account"
                    centered
                    visible={this.state.visible}
                    okText="Add Account"
                    onOk={() => this.handleAddAccount()}
                    onCancel={() => this.setState({visible: false})}
                    width={500}
                >
                    <Input placeholder="Account Number" name="account_id" style={{ margin: '10px' }} value={this.state.account_id} onChange={this.onChange}></Input>
                    <Input placeholder="Account Name" name="account_name" style={{ margin: '10px' }} value={this.state.account_name} onChange={this.onChange}></Input>
                    <Select name="account_type" style={{ width: '100%',margin: '10px' }} value={this.state.account_type} placeholder="Account Type" onSelect={(val,eve)=>this.onDropDownChange(val)}>
                        <Select.Option name="account_type" value="cash_account">Cash Account</Select.Option>
                        <Select.Option name="account_type" value="bank_account">Bank Account</Select.Option>
                        <Select.Option  name="account_type" value="wallet_account">Wallet Account</Select.Option>
                    </Select>                    
                    <Input placeholder="Initial Balance" value={this.state.initialBalance} name="initialBalance" type="number" onChange={this.onChange} prefix={<i className="mdi mdi-cash" style={{ color: 'grey' }}></i>} style={{ margin: '10px' }}></Input>
                    <Input placeholder="Provider eg. Indian Bank, Paytm" value={this.state.account_provider} name="account_provider" onChange={this.onChange} style={{ margin: '10px' }}></Input>
                </Modal>
              </div>
          </div>
        )
    }
  
}

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    account: state.account.account,
    error: state.account.error
  });
  

export default connect(mapStateToProps,{loadAccount,addAccount})(BankAccount);
