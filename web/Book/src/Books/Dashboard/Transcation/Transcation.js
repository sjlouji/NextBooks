import React, { Component } from 'react'
import { Row, Col, Button, message, Modal, Input, Checkbox, Select } from 'antd';
import { connect } from 'react-redux';
import { loadTranscation, addTranscation, deleteTranscation, updateTranscation } from '../../../Store/Action/transcation'
import { loadAccount } from '../../../Store/Action/account'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import  moment  from 'moment';

// Success Messge Box
const success = () => {
    message.success('This is a success message');
};
  
// Error Message Box
const error = (data) => {
    message.error(data);
};

export class Transcation extends Component {

    //  Holds all the State variables
    state = {
        transcations: [],
        visible: false,
        visibleEdit: false,
        description: '',
        category: '',
        transcation_type: '',
        amount: '',
        account_type: '',
        debit: false,
        id: ''
    }

    //  Gets excecuted once the component gets Mounted
    componentDidMount(){
        this.props.loadAccount()
        this.props.loadTranscation()
        this.setState({
            transcations: this.props.transcation
        })
    }

    //  Fired when the component recieves new props
    componentWillReceiveProps(nextProps){
        if(nextProps.error !== undefined){
            if(nextProps.error.message === 'Network Error'){
                error(nextProps.error.message)
                this.setState({ transcations: nextProps.transcation })
            }else{
                this.setState({ transcations: nextProps.transcation })
                error(nextProps.error.response.data.error)
            }
        }
        this.setState({ transcations: nextProps.transcation })
    }

    //  Handles the things that happen after clicking Add a new Transcation
    handleAddAccount(){
        if(this.state.description === ''){error('Description can not be Empty')}
        else if(this.state.category === ''){error('Category can not be Empty')}
        else if(this.state.transcation_type === ''){error('Transcation Type can not be Empty')}
        else if(this.state.amount === ''){error('Amount can not be Empty')}
        else if(this.state.account_type === ''){error('Account Type can not be Empty')}
        else{
            console.log(this.state.description, this.state.category, this.state.transcation_type, this.state.amount, this.state.account_type)
            this.props.addTranscation(this.state.description, this.state.transcation_type, this.state.amount, this.state.account_type, this.state.debit, this.state.category)
            this.setState({visible: false})
        }
    }

    //  Handles delete
    handleDelete(id){
        this.props.deleteTranscation(id)
    }

    //  Onchage for normal Input, CheckBox Input and Dropdown Input
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    onDropDownChange = (e) => this.setState({ account_type: e });
    onCheckBoxChange = (e) => this.setState({ [e.target.name]: e.target.checked });


    //  Handles the things that happen after clicking Edit Account
    handleEditTranscation(){
        if(this.state.description === ''){error('Description can not be Empty')}
        else if(this.state.category === ''){error('Category can not be Empty')}
        else if(this.state.transcation_type === ''){error('Transcation Type can not be Empty')}
        else if(this.state.amount === ''){error('Amount can not be Empty')}
        else{
            this.props.updateTranscation(this.state.id, this.state.debit, this.state.description, this.state.category, this.state.account_type, this.state.transcation_type, this.state.amount)
            this.setState({visibleEdit: false})
        }     
    }

    render() {
        return (
          <div className="container-fluid">
            <Row>
                <Col span={12}>
                    {/* BreadCrumps */}
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="page-title-box">
                                <div className="row">
                                    <div className="col">
                                        <h4 className="page-title">Transcations</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="nav-link" style={{ float: 'right', marginRight: '100px',cursor: 'pointer' }} onClick={()=>this.setState({visible: true})}>
                        <a className=" btn btn-sm btn-soft-primary" style={{ width: '130px', height: '30px' }} role="button"><i className="fas fa-plus mr-2"></i>New Expense</a>
                    </div>    
                </Col>
            </Row>
            <div style={{ padding: '50px' }}>
                <TableContainer>
                    <Table  aria-label="simple table">
                        <TableHead style={{ backgroundColor: '#f4f8ff' }}>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="center">Debit</TableCell>
                                <TableCell align="center">Amount</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Transcation Type</TableCell>
                                <TableCell align="center">From Account</TableCell>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        {this.state.transcations ?this.state.transcations.length === 0?
                                    <div style={{ display: 'flex', position: 'absolute', right: '0', left: '0' }}>
                                            <img  src="https://firebasestorage.googleapis.com/v0/b/nextbooks-1a9f0.appspot.com/o/images%2FNo%20data-pana.png?alt=media&token=cb5cea24-210c-48cd-bc65-8875b00fb5b8" style={{ width: '30%', height: '50%', margin: 'auto' }} alt="user_photo"></img>
                                    </div>
                                :
                                <TableBody>
                                    {this.state.transcations?this.state.transcations.map((row) => (
                                        <TableRow key={row._id}>
                                        <TableCell component="th" scope="row">{moment(row.createdAt).format('LLL')}</TableCell>
                                        <TableCell align="center">{row.debit?"Debit":"Credit"}</TableCell>
                                        <TableCell align="center">{row.amount}</TableCell>
                                        <TableCell align="center">{row.description}</TableCell>
                                        <TableCell align="center">{row.category}</TableCell>
                                        <TableCell align="center">{row.transcation_type}</TableCell>
                                        <TableCell align="center">{row.account.account_name}</TableCell>
                                        <TableCell align="center">{row.category}</TableCell>
                                        <TableCell align="center"><Button type="primary" style={{margin: '10px'}} onClick={()=>this.setState({visibleEdit: true, description: row.description, category: row.category, transcation_type: row.transcation_type, debit: row.debit, amount: row.amount, id: row._id, account_type: row.account.account_id})}>Update</Button><Button type="danger" style={{margin: '10px'}}  onClick={()=>this.handleDelete(row._id)}>Delete</Button></TableCell>
                                        </TableRow>
                                    )):"Loading"}
                                </TableBody>                                
                            :""}
                    </Table>
                </TableContainer>
            </div>
                <Modal
                    title="Update Transcation"
                    centered
                    visible={this.state.visibleEdit}
                    okText="Update Transcation"
                    onOk={() => this.handleEditTranscation()}
                    onCancel={() => this.setState({visibleEdit: false})}
                    width={500}
                >
                    <Input placeholder="Description" name="description" type="text" placeholder={this.state.description} onChange={this.onChange} style={{ margin: '10px' }}></Input>
                    <Input placeholder="Category" name="category" type="text" placeholder={this.state.category} onChange={this.onChange} style={{ margin: '10px' }}></Input>
                    <Input placeholder="Transcation Type" name="transcation_type" type="text" placeholder={this.state.transcation_type} onChange={this.onChange} style={{ margin: '10px' }}></Input>
                    <Input placeholder="Amount" name="amount" type="text" onChange={this.onChange} style={{ margin: '10px' }} placeholder={this.state.amount}></Input>
                    <Checkbox name="debit" checked={this.state.debit} onChange={(e)=>this.onCheckBoxChange(e)}  style={{ margin: '10px' }} name="debit">Debit</Checkbox>
                    <Select defaultValue={this.state.account_type} name="account" style={{ width: '100%',margin: '10px' }} value={this.state.account_type} placeholder="Account" onSelect={(val,eve)=>this.onDropDownChange(val)}>
                        {this.props.account?this.props.account.map((data)=>{
                            return (
                                <Select.Option name="account_type"  value={data.account_id}>{data.account_name}</Select.Option>
                            )
                        }):""}
                    </Select> 
                </Modal>
                <Modal
                    title="Add a New Transcation"
                    centered
                    visible={this.state.visible}
                    okText="Add Transcation"
                    onOk={() => this.handleAddAccount()}
                    onCancel={() => this.setState({visible: false})}
                    width={500}
                >   
                    <Input placeholder="Description" name="description" type="text" onChange={this.onChange} style={{ margin: '10px' }}></Input>
                    <Input placeholder="Category" name="category" type="text" onChange={this.onChange} style={{ margin: '10px' }}></Input>
                    <Input placeholder="Transcation Type" name="transcation_type" type="text" onChange={this.onChange} style={{ margin: '10px' }}></Input>
                    <Input placeholder="Amount" name="amount" type="text" onChange={this.onChange} style={{ margin: '10px' }}></Input>
                    <Checkbox name="debit" checked={this.state.debit} onChange={(e)=>this.onCheckBoxChange(e)}  style={{ margin: '10px' }} name="debit">Debit</Checkbox>
                    <Select name="account" style={{ width: '100%',margin: '10px' }} value={this.state.account_type} placeholder="Account" onSelect={(val,eve)=>this.onDropDownChange(val)}>
                        {this.props.account?this.props.account.map((data)=>{
                            console.log(data)
                            return (
                                <Select.Option name="account_type" value={data.account_id}>{data.account_name}</Select.Option>
                            )
                        }):""}
                    </Select> 
                </Modal>
          </div>
        )
    }
  
}

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    transcation: state.transcation.transcation,
    account: state.account.account,
    error: state.transcation.error
  });
  

export default connect(mapStateToProps,{loadTranscation, loadAccount, addTranscation, deleteTranscation, updateTranscation})(Transcation);
