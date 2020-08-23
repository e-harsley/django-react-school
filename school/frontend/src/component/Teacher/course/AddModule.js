import React, { Component } from "react";
import { connect } from "react-redux";
import { addModule } from "../../../actions/course";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import { Link } from "react-router-dom";

export class AddModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      desc: "",
    };
    this.containText = this.containText;
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { title, content } = this.state;
    const module = { title, content };
    e.preventDefault();
    let id = this.props.match.params.id;
    this.props.addModule(id, module);
    this.setState({
      title: "",
      content: "",
      desc:
        "Please use the form to add more modules or click nevermind to go Back",
    });
  };

  render() {
    const { title, content, desc } = this.state;

    return (
      <div>
        {desc == "" ? (
          <h1 className="uk-text-lead">Use the form below to add module</h1>
        ) : (
          <h5 className="uk-text-lead">{desc}</h5>
        )}
        <form
          className="uk-form uk-form-stacked uk-width-2-3@s uk-width-1-1"
          onSubmit={this.onSubmit}
        >
          <div className="uk-margin">
            <label
              className="uk-form-label"
              required
              style={{ fontSize: " 1.2rem" }}
            >
              Name
            </label>
            <div className="uk-form-controls">
              <input
                required
                className="uk-input uk-border-rounded"
                name="location"
                type="text"
                name="title"
                value={title}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label" style={{ fontSize: " 1.2rem" }}>
              Overview
            </label>
            <div>
              {/* <textarea
                className="uk-textarea uk-border-rounded"
                rows="5"
                name="content"
                value={content}
                onChange={this.onChange}
              /> */}
              <CKEditor
                required
                style={{ height: "500px" }}
                editor={ClassicEditor}
                data={content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.setState({ content: data });
                }}
              />
            </div>
          </div>
          <button className="uk-button uk-button-secondary uk-button-small uk-text-capitalize uk-border-rounded uk-margin-right">
            Add Modules
          </button>
          <Link
            to={`/teacher/course/detail/${this.props.match.params.id}`}
            className="uk-button uk-button-default uk-button-small uk-text-capitalize uk-border-rounded"
          >
            Nevermind
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  if (state.course.courses.length > 0) {
    return {
      course: state.course.courses.find((course) => course.id == id),
      modules: state.course.modules,
    };
  } else {
    return {
      course: state.course.courses.find((course) => course.id == id),
    };
  }
};

export default connect(mapStateToProps, { addModule })(AddModule);
