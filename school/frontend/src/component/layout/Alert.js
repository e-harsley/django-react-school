import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alert extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    // message: PropTypes.object.isRequired,
  };
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.username)
        alert.error(`Username: ${error.msg.username.join()}`);
      if (error.msg.content) alert.error(`Content is required`);
      if (error.msg.password)
        alert.error(`Password: ${error.msg.password.join()}`);
      if (error.msg.subject) alert.error(`Please select a subject`);
      if (error.msg.message)
        alert.error(`Message: ${error.msg.message.join()}`);
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
      // if (error.msg.username) alert.error(error.msg.username.join());
      // if (error.msg.subject) alert.error(error.msg.subject.join());
    }
    if (message !== prevProps.message) {
      if (message.studentRegister) alert.success(message.studentRegister);
      if (message.editModule) alert.success(message.editModule);
      if (message.deleteModule) alert.success(message.deleteModule);
      if (message.deleteCourse) alert.success(message.deleteCourse);
      if (message.addCourse) alert.success(message.addCourse);
      if (message.editCourse) alert.success(message.editCourse);
      if (message.addModule) alert.success(message.addModule);
      if (message.editProfile) alert.success(message.editProfile);
      if (message.teacherRegister) alert.success(message.teacherRegister);
      if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alert));
