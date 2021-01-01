import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment'

export class Logs extends Component {
    render() {
        return (
          <div>
              <h3>Login Activity</h3>
              Here is your last 10 login activities log
              <div className="container" style={{ marginTop: '30px' }}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>User Agent</th>
                            <th>IP</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.auth?this.props.auth.logs.slice(0,10).reverse().map((data)=>{
                            return(
                                <tr key={data._id}>
                                    <td><p style={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{data.agent}</p></td>
                                    <td>{data.id?data.id:"Ip Address Not Found"}</td>
                                    <td>{moment(data.last_login).format('LLL')}</td>
                                </tr>
                            )
                        }):"No data"}
                    </tbody>
                </table>
              </div>
          </div>
        )
    }
  
}

const mapStateToProps = (state) => ({
    auth: state.auth.user.user
});

export default connect(mapStateToProps,)(Logs);
