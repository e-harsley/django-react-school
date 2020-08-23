import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getModules, editModule, deleteModule } from "../../../actions/course";
import parse from "html-react-parser";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";

export class CModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mod: [],
      edit: false,
      title: "",
      content: "",
    };
    this.selectModule = this.selectModule;
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  selectModule(module) {
    this.setState({
      mod: module,
      edit: false,
    });
  }

  edit = (e) => {
    e.preventDefault();
    this.setState({
      edit: true,
      title: this.state.mod.title,
      content: this.state.mod.content,
    });
  };

  dedit = (e) => {
    e.preventDefault();
    this.setState({
      edit: false,
    });
  };

  reModule = (e) => {
    e.preventDefault();
    this.setState({
      mod: [],
    });
  };

  onSubmit = (e) => {
    const { title, content } = this.state;
    const module = { title, content };
    e.preventDefault();
    let id = this.props.match.params.id;
    let module_id = this.state.mod.id;
    this.props.editModule(id, module_id, module);
    this.setState({
      edit: false,
      mod: module,
    });
  };

  delete = (e) => {
    e.preventDefault();
    let id = this.props.match.params.id;
    let module_id = this.state.mod.id;
    this.props.deleteModule(id, module_id);
    console.log(this.props.module);
    this.setState({
      mod: [],
    });
    console.log(this.props.modules);
  };

  static propTypes = {
    getModules: PropTypes.func,
    modules: PropTypes.array,
    deleteModule: PropTypes.func.isRequired,
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getModules(id);
  }
  render() {
    if (this.props.course === undefined) {
      return <h1>Loading</h1>;
    } else {
      const { id, title, overview } = this.props.course;
      const { content } = this.state;
      return (
        <div>
          <div
            className="uk-flex uk-flex-between uk-flex-middle uk-border-rounded"
            style={{ backgroundColor: "rgb(252, 252, 252)", padding: "0 10px" }}
          >
            <h1
              className="uk-heading-bullet uk-text-lead uk-text-capitalize"
              style={{ marginTop: "10px", fontSize: "1.2rem" }}
            >
              {title}{" "}
            </h1>
            <Link
              to={`/teacher/course/edit/course/${this.props.course.id}`}
              className="uk-float-right uk-button uk-button-secondary uk-button-small uk-text-capitalize uk-border-rounded"
            >
              Edit Course
            </Link>
          </div>
          <div
            className="uk-grid-small uk-margin-remove uk-padding-remove"
            data-uk-grid
            style={{ marginLeft: "0px" }}
          >
            <div className="uk-hidden@s">
              <span
                style={{ marginTop: "20px" }}
                data-uk-icon="grid"
                data-uk-toggle="target: #offcanvas-push"
              >
                Module{" "}
              </span>
              <div
                id="offcanvas-push"
                data-uk-offcanvas="mode:push; overlay:true; esc-close:true"
              >
                <div
                  className="uk-offcanvas-bar uk-background-default"
                  style={{ color: "#000" }}
                >
                  <button
                    style={{ color: "#000" }}
                    className="uk-offcanvas-close"
                    type="button"
                    data-uk-close
                  ></button>
                  <div>
                    <h1
                      className="uk-text-lead uk-margin-large-top"
                      style={{
                        cursor: "pointer",
                        fontWeight: "bold",
                        color: "#000",
                        marginBottom: "0",
                      }}
                      onClick={this.reModule}
                    >
                      Modules
                    </h1>
                    <hr
                      style={{
                        margin: "0",
                        backgroundColor: "#000",
                      }}
                    />
                    {this.props.modules.length > 0 ? (
                      this.props.modules.map((module, i) => (
                        <dl
                          onClick={this.selectModule.bind(this, module)}
                          key={module.id}
                          style={{ cursor: "pointer" }}
                          className="uk-description-list uk-description-list-divider uk-margin-bottom"
                        >
                          <dt style={{ fontWeight: "bolder" }}>
                            Module {i + 1}
                          </dt>
                          <dd key={module.id} style={{ fontWeight: "normal" }}>
                            {module.title}
                          </dd>
                          <hr
                            style={{
                              backgroundColor: "#000",
                            }}
                          />
                        </dl>
                      ))
                    ) : (
                      <dl>
                        You don't have any module Yet. Please click add module
                        to add module to this topic
                      </dl>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-width-1-3 uk-visible@s uk-background-muted">
              <h1
                className="uk-text-lead uk-margin-top"
                style={{ cursor: "pointer" }}
                onClick={this.reModule}
              >
                Modules
              </h1>
              <hr style={{ margin: "0" }} />
              {this.props.modules.length > 0 ? (
                this.props.modules.map((module, i) => (
                  <dl
                    onClick={this.selectModule.bind(this, module)}
                    key={module.id}
                    style={{ cursor: "pointer" }}
                    className="uk-description-list uk-description-list-divider uk-margin-bottom"
                  >
                    <dt style={{ fontWeight: "bolder" }}>Module {i + 1}</dt>
                    <dd key={module.id} style={{ fontWeight: "normal" }}>
                      {module.title}
                    </dd>
                    <hr
                      style={{
                        backgroundColor: "#000",
                      }}
                    />
                  </dl>
                ))
              ) : (
                <dl>
                  You don't have any module Yet. Please click add module to add
                  module to this topic
                </dl>
              )}
            </div>
            <div className="uk-width-1-1 uk-width-2-3@s uk-padding-small">
              {this.state.mod.length == 0 ? (
                <div>
                  <div className="uk-margin-small-top">
                    <div className="uk-backgroud-muted">
                      <h1
                        className="uk-heading-bullet uk-text-lead uk-backgroud-muted uk-text-capitalize"
                        style={{ marginTop: "10px", fontSize: "1.2rem" }}
                      >
                        Course Title
                      </h1>
                    </div>
                    <h1
                      className="uk-text-lead uk-margin-remove"
                      style={{ margin: "0", fontSize: "1.3rem" }}
                    >
                      {title}
                    </h1>
                    <div className="uk-backgroud-muted">
                      <h1
                        className="uk-heading-bullet uk-text-lead uk-backgroud-muted uk-text-capitalize"
                        style={{ marginTop: "10px", fontSize: "1.2rem" }}
                      >
                        Course Overview
                      </h1>
                    </div>
                    <h1
                      className="uk-text-meta uk-margin-remove"
                      style={{ margin: "0px", fontSize: "1.2rem" }}
                    >
                      {overview}
                    </h1>
                  </div>
                  <div className="uk-flex uk-flex-right uk-margin-medium-top">
                    <Link
                      to={`/teacher/course/detail/${id}/module/add/`}
                      className="uk-button uk-button-primary uk-button-small uk-text-capitalize uk-border-rounded"
                    >
                      Add new module
                    </Link>
                  </div>
                </div>
              ) : this.state.edit == false ? (
                <div>
                  <div style={{ display: "block" }}>
                    <button
                      onClick={this.delete}
                      className="uk-float-right uk-button uk-button-danger uk-button-small uk-text-capitalize uk-border-rounded"
                    >
                      Delete Module
                    </button>
                    <button
                      onClick={this.edit}
                      className="uk-button uk-button-primary uk-button-small uk-text-capitalize uk-border-rounded"
                    >
                      Edit Module
                    </button>
                  </div>
                  <div style={{ display: "block", marginTop: "30px" }}>
                    <div className="uk-backgroud-muted">
                      <h1
                        className="uk-heading-bullet uk-text-lead uk-backgroud-muted uk-text-capitalize"
                        style={{ marginTop: "10px", fontSize: "1.2rem" }}
                      >
                        Module Title
                      </h1>
                    </div>
                    <h1
                      className="uk-text-lead uk-margin-remove"
                      style={{ fontSize: "1.3rem", margin: "0px" }}
                    >
                      {this.state.mod.title}
                    </h1>

                    <div className="uk-backgroud-muted">
                      <h1
                        className="uk-heading-bullet uk-text-lead uk-backgroud-muted uk-text-capitalize"
                        style={{ marginTop: "10px", fontSize: "1.2rem" }}
                      >
                        Module Content
                      </h1>
                    </div>
                    {parse(this.state.mod.content)}
                  </div>
                </div>
              ) : (
                <form
                  className="uk-form uk-form-stacked uk-width-1-1"
                  onSubmit={this.onSubmit}
                >
                  <div className="uk-margin">
                    <label
                      className="uk-form-label"
                      style={{ fontSize: " 1.2rem" }}
                    >
                      Name
                    </label>
                    <div className="uk-form-controls">
                      <input
                        className="uk-input uk-border-rounded"
                        name="location"
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="uk-margin">
                    <label
                      className="uk-form-label"
                      style={{ fontSize: " 1.2rem" }}
                    >
                      Overview
                    </label>
                    <div>
                      <CKEditor
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
                    Edit Module
                  </button>
                  <button
                    onClick={this.dedit}
                    className="uk-button uk-button-default uk-button-small uk-text-capitalize uk-border-rounded"
                  >
                    Nevermind
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      );
    }
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
      modules: state.course.modules,
    };
  }
};

export default connect(mapStateToProps, {
  editModule,
  getModules,
  deleteModule,
})(CModule);
