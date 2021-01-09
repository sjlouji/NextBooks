import React, { Component } from 'react'
import { Tooltip, Select, Input, Modal, message } from 'antd';
import { connect } from 'react-redux';
import { updateAccount } from '../../../../Store/Action/account'

// Error Message Box
const error = (data) => {
    message.error(data);
};
export class AccountComponent extends Component {

    //  Holds all the State Variables
    state = {
        deleteHover: false,
        editHover: false,
        visible: false,
        account_name: '',
        account_type: 'cash_account',
        initialBalance: '',
        account_provider: '',
        account_id: '',
        id: ''
    }

    //  Get AccountType
    getAccountName(data){
        if(data === 'cash_account'){
            return 'Cash Account'
        }else if(data === 'bank_account'){
            return 'Bank Account'
        }else if(data === 'wallet_account'){
            return 'Wallet'
        }else{
            return 'NA'
        }
    }

    //  Get Account Icon according to the Account Type
    getAccountIcon(data){
        if(data === 'cash_account'){
            return "mdi mdi-cash"
        }else if(data === 'bank_account'){
            return "mdi mdi-bank"
        }else if(data === 'wallet_account'){
            return "mdi mdi-wallet"
        }else{
            return "mdi mdi-bank"
        }
    }

    //  Fired when the component gets loaded
    componentDidMount(){
        this.setState({
            account_name: this.props.account.account_name,
            account_type: this.props.account.account_type,
            initialBalance: this.props.account.initialBalance,
            account_provider: this.props.account.account_provider,
            account_id: this.props.account.account_id,
            id: this.props.account._id
        })
    }

    //  Handles the things that happen after clicking Edit Account
    handleEditAccount(){
        if(this.state.account_id === ''){error('Account Number can not be Empty')}
        else if(this.state.account_name === ''){error('Account Name can not be Empty')}
        else if(this.state.initialBalance === ''){error('Initial balance can not be Empty')}
        else if(this.state.account_provider === ''){error('Account Provider can not be Empty')}
        else{
            this.props.updateAccount(this.state.id , this.state.account_name, this.state.account_type, this.state.account_provider)
            this.setState({visible: false})
        }        
    }

    //  Onchage for normal Input and Dropdown Input
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    onDropDownChange = (e) => this.setState({ account_type: e });


    render() {
        return (
            <div className="card">                               
                <div className="card-body">                                                     
                    <div className="row">
                        <div className="col">
                            <div className="media">
                                <div className="media-body ml-3 align-self-center">
                                    <h5 className="mt-0 mb-1">{this.props.account?this.props.account.account_name:""}</h5> 
                                    <p className="mb-0 text-muted">{this.getAccountName(this.props.account?this.props.account.account_type:"")}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-auto align-self-center">
                            <ul className="list-inline mb-0">
                                <Tooltip title={this.getAccountName(this.props.account?this.props.account.account_type:"")}>
                                    <li className="list-inline-item">
                                        <a href="#" className="mr-1 contact-icon"><i className={this.getAccountIcon(this.props.account?this.props.account.account_type:"")}></i></a>
                                    </li>
                                </Tooltip>
                                <Tooltip title="Edit Account">
                                    <li className="list-inline-item" onClick={()=>this.setState({visible: true})} onMouseEnter={()=>this.setState({editHover: true})} onMouseLeave={()=>this.setState({editHover: false})}> 
                                        <a href="#" className={this.state.editHover?'mr-1 contact-icon_edit_hover':'mr-1 contact-icon'}><i className="mdi mdi-circle-edit-outline" style={this.state.editHover?{ color: 'blue' }:{color: ''}}></i></a>
                                    </li>
                                </Tooltip>
                                <Tooltip title="Delete Account">
                                    <li className="list-inline-item" onClick={()=>{this.props.deleteAccount(this.props.account._id)}} onMouseEnter={()=>this.setState({deleteHover: true})} onMouseLeave={()=>this.setState({deleteHover: false})}>
                                        <a href="#" className={this.state.deleteHover?'mr-1 contact-icon_hover':'mr-1 contact-icon'}><i className="mdi mdi-trash-can-outline" style={this.state.deleteHover?{ color: 'red' }:{color: ''}}></i></a>
                                    </li>
                                </Tooltip>
                            </ul>
                        </div>
                    </div>
                    <Modal
                        title="Update Account"
                        centered
                        visible={this.state.visible}
                        okText="Update Account"
                        onOk={() => this.handleEditAccount()}
                        onCancel={() => this.setState({visible: false})}
                        width={500}
                    >
                        <Input placeholder="Account Number" disabled name="account_id" style={{ margin: '10px' }} value={this.state.account_id} onChange={this.onChange}></Input>
                        <Input placeholder="Account Name" name="account_name" style={{ margin: '10px' }} value={this.state.account_name} onChange={this.onChange}></Input>
                        <Select name="account_type" style={{ width: '100%',margin: '10px' }} value={this.state.account_type} placeholder="Account Type" onSelect={(val,eve)=>this.onDropDownChange(val)}>
                            <Select.Option name="account_type" value="cash_account">Cash Account</Select.Option>
                            <Select.Option name="account_type" value="bank_account">Bank Account</Select.Option>
                            <Select.Option  name="account_type" value="wallet_account">Wallet Account</Select.Option>
                        </Select>                    
                        <Input placeholder="Provider eg. Indian Bank, Paytm" value={this.state.account_provider} name="account_provider" onChange={this.onChange} style={{ margin: '10px' }}></Input>
                    </Modal>
                </div>
            </div>
        )
    }
  
}

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    _account: state.account.account
  });
  

export default connect(mapStateToProps,{updateAccount})(AccountComponent);
