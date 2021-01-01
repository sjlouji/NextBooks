import React, { Component } from 'react'

export class NoAccess extends Component {
    render() {
        return (
            <div className="container">
                <div class="row  justify-content-center">
                    <div class="col-12 align-self-center">
                        <div className="container">
                        <div class="row">
                            <div class="col-lg-5 mx-auto">
                                    <div class="card-body">
                                        <div class="ex-page-content text-center">
                                            <img src="assets/images/error.svg" alt="0" class="" height="170"/>
                                            <h1 class="mt-5 mb-4">401!</h1>  
                                            <h5 class="font-16 text-muted mb-5">Somthing went wrong</h5>                                    
                                        </div>          
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

export default  NoAccess;