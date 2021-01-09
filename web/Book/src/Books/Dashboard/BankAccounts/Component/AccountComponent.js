import React, { Component } from 'react'

export class AccountComponent extends Component {
    render() {
        return (
            <div className="card">                               
                <div className="card-body">                                                     
                    <div className="row">
                        <div className="col">
                            <div className="media">
                                <div className="media-body ml-3 align-self-center">
                                    <h5 className="mt-0 mb-1">Joan's Account</h5> 
                                    <p className="mb-0 text-muted">Indian Bank</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-auto align-self-center">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                    <a href="#" className="mr-1 contact-icon"><i className="mdi mdi-bank"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
  
}

export default  AccountComponent;