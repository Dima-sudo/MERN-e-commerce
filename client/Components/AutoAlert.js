import React, { Component } from "react";

import { Spring } from "react-spring/renderprops";


import { Alert } from "antd";

import { connect } from 'react-redux';

import {v4 as uuid} from 'uuid';

class AutoAlert extends Component {

    componentWillReceiveProps(){
        this.forceUpdate()
    }

  renderAlert = () => {
      if(this.props.alert){
        return (
            <Spring
              from={{ opacity: 0, transform: "translate3d(0,-200px,0)" }}
              to={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              key={uuid()}
            >
              {(props) => (
                <Alert
                  message={this.props.alert.message}
                  type={this.props.alert.type}
                  closeText="Close"
                  closable={true}
                  showIcon
                  className="alert-text__positioning"
                  style={props}
                  key={uuid()}
                />
              )}
            </Spring>
          );
      }
      
      return null;
  }

  render() {
    return this.renderAlert();
  }
}

const mapStateToProps = (store) => {
    return {
        alert: store.alertConfig
    }
}
    

export default connect(mapStateToProps)(AutoAlert);
