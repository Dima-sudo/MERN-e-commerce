import React from 'react';

import { Modal, message } from 'antd';

import { connect } from 'react-redux';

import SetModal from '../Redux/Actions/ModalActions';

class CustomModal extends React.Component {

  showModal = () => {
    this.props.SetModal(
        {...this.props.Modal, visible: true}
    );
  };

  handleOk = async () => {
      this.props.SetModal({...this.props.Modal, text: 'Working on it, this might take a moment...', loading: true});
    
      // Async request that should be passed on component creation
      const res  = await this.props.action();

      // Message to go along with the request completion
      if(res.data.status === 'success'){
          message.success('Action completed successfully', 4);
      }
      else if(res.data.status === 'failure'){
          message.warning('Couldn\'t complete the requested action', 4);
      }

      this.props.SetModal({...this.props.Modal, visible: false, loading: false});
  };

  handleCancel = () => {
    this.props.SetModal({...this.props.Modal, visible: false, loading: false});
  };

  render() {
    const { visible, loading, text } = this.props.Modal;
    return (
        <Modal
          title={this.props.Modal.title}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={loading}
          onCancel={this.handleCancel}
        >
          <p>{text}</p>
        </Modal>
    );
  }
}

const mapStateToProps = (store) => {
    return {
        Modal: store.Modal, isLoggedIn: store.isLoggedIn
    }
}

export default connect(mapStateToProps, { SetModal })(CustomModal);