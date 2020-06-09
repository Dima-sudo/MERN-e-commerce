import React, { Component } from "react";

import { Spring, Transition, animated } from "react-spring/renderprops";

import { Alert } from "antd";

import { connect } from "react-redux";

import { v4 as uuid } from "uuid";

import alertConfig from '../Redux/Actions/AlertActions';

/**
 * This component will display an alert on top of the page that is more noticeable than notifications.
 * This is used on larger events such as a Product creation.
 *
 * @param { Object } alert - Receives an object that contains the alert type (success / error / warning etc.) and the alert message to be displayed.
 */

class AutoAlert extends Component {

  constructor(props){
    super(props);
    this.state = {
      show: true
    }
  }

  componentWillReceiveProps(){
    this.forceUpdate();

    //#TODO fix show logic and everything should work
    setTimeout(() => {
      this.setState(prevState => {
        return {show: !prevState.show}
      });

    
      setTimeout(() => {
      const options = null;

      this.props.alertConfig(options);

      this.setState({ show: true });
      }, 2000);

    }, 4000);

    

  }

  renderAlert = () => {

    if (this.props.alert) {
      return (
        <Transition
          items={this.state.show}
          from={{ opacity: 0, transform: "translate3d(0,-200px,0)" }}
          enter={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          leave={{ opacity: 0, transform: "translate3d(0,-200px,0)" }}
          // key={uuid()}
        >
          {(show) => show && ((props) => <Alert
              message={this.props.alert.message}
              type={this.props.alert.type}
              closeText="Close"
              closable={true}
              showIcon
              className="alert-text__positioning"
              style={props}
              key={uuid()}
            />)}
        </Transition>

      );
    }

    return null;
  };

  render() {
    return this.renderAlert();
  }
}

const mapStateToProps = (store) => {
  return {
    alert: store.alertConfig,
  };
};

export default connect(mapStateToProps, { alertConfig })(AutoAlert);
