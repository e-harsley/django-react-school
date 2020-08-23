import React, { Component } from "react";
import { connect } from "react-redux";
import parse from "html-react-parser";
import { getTeacher } from "../../../actions/teacher";

export class TeacherModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mod: [],
    };
    this.selectModule = this.selectModule;
  }

  componentDidMount() {
    let id = this.props.match.params.interest_id;
    let teacher_id = this.props.match.params.id;
    this.props.getTeacher(id, teacher_id);
  }

  selectModule(module) {
    this.setState({
      mod: module,
    });
  }

  reModule = (e) => {
    e.preventDefault();
    this.setState({
      mod: [],
    });
  };

  render() {
    if (this.props.course === undefined) {
      return (
        <div
          className="uk-margin-large"
          data-uk-spinner="ratio: 3"
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        ></div>
      );
    } else {
      return (
        <div>
          <div>
            <h1
              className="uk-heading-bullet uk-text-lead uk-text-capitalize"
              style={{ marginTop: "10px", fontSize: "1.2rem" }}
            >
              "{this.props.course.title}" by {this.props.teacherName.username}
            </h1>
          </div>
          <div className="uk-hidden@s">
            <button
              className="uk-button uk-button-default"
              data-uk-toggle="target: #offcanvas-push"
            >
              <span data-uk-icon="grid"></span> Module
            </button>
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
                  {this.props.course.modules.length > 0 ? (
                    this.props.course.modules.map((module, i) => (
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
                    <dl>This topic currently have no modules yet</dl>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className="uk-grid-small uk-margin-remove uk-padding-remove"
            data-uk-grid
            style={{ marginLeft: "0px" }}
          >
            <div className="uk-width-1-3 uk-visible@s uk-background-muted">
              <h1
                className="uk-text-lead uk-margin-top"
                style={{ cursor: "pointer" }}
                onClick={this.reModule}
              >
                Modules
              </h1>
              <hr style={{ margin: "0" }} />
              {this.props.course.modules.length > 0 ? (
                this.props.course.modules.map((module, i) => (
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
                <dl>This topic currently have no modules yet</dl>
              )}
            </div>
            <div className="uk-width-1-1 uk-width-2-3@s uk-padding-small">
              {this.state.mod.length == 0 ? (
                <div className="uk-margin-small-top">
                  <div className="uk-backgroud-muted">
                    <h1
                      className="uk-heading-bullet uk-text-lead uk-backgroud-muted uk-text-capitalize"
                      style={{ marginTop: "10px", fontSize: "1.2rem" }}
                    >
                      Topic Title
                    </h1>
                  </div>
                  <h1
                    className="uk-text-meta uk-margin-remove"
                    style={{ margin: "0", fontSize: "1.2rem" }}
                  >
                    {this.props.course.title}
                  </h1>
                  <div className="uk-backgroud-muted">
                    <h1
                      className="uk-heading-bullet uk-text-lead uk-backgroud-muted uk-text-capitalize"
                      style={{ marginTop: "10px", fontSize: "1.2rem" }}
                    >
                      Topic Overview
                    </h1>
                  </div>
                  <h1
                    className="uk-text-meta uk-margin-remove"
                    style={{ margin: "0px", fontSize: "1.2rem" }}
                  >
                    {this.props.course.overview}
                  </h1>
                </div>
              ) : (
                <div>
                  <div className="uk-backgroud-muted">
                    <h1
                      className="uk-heading-bullet uk-text-lead uk-backgroud-muted uk-text-capitalize"
                      style={{ marginTop: "10px", fontSize: "1.2rem" }}
                    >
                      Module Title
                    </h1>
                  </div>
                  <h1
                    className="uk-text-meta uk-margin-remove"
                    style={{ margin: "0", fontSize: "1.2rem" }}
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
                  <h1 className="uk-text-lead uk-text-center"></h1>
                  {parse(this.state.mod.content)}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.course_id;
  if (state.teacher.teach.course) {
    return {
      course: state.teacher.teach.course.find((course) => course.id == id),
      teacherName: state.teacher.teach.user,
    };
  } else {
    return {
      course: state.teacher.teach.course,
    };
  }
};

export default connect(mapStateToProps, { getTeacher })(TeacherModule);

// let id = ownProps.match.params.course_id;
// if (state.teacher.teacher.course.length > 0) {
//   return {
//     course: state.teacher.teacher.course.find((course) => course.id == id),
//     teacherName: state.teacher.teacher.user,
//   };
// } else {
//   return {
//     course: state.teacher.teacher.course,
//   };
// }
