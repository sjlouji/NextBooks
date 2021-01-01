import React, { Component } from 'react'
import { connect } from 'react-redux';

export class Home extends Component {
    render() {
      console.log(window.location.href)
        return (
          <div>
            Home
          </div>
        )
    }
  
}

export default  Home;