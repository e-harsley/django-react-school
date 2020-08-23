import React, { Component } from "react";
import { connect } from "react-redux";
import { getSubjects } from "../../actions/teacher";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class Home extends Component {
  static propTypes = {
    subjects: PropTypes.array.isRequired,
    getSubjects: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <h1>Find Teachers</h1>
        <div
          className="uk-grid-small uk-border-pill uk-margin-remove uk-child-width-1-2 uk-child-width-1-2@s
           uk-child-width-1-4@m uk-child-width-1-4@l uk-child-width-1-4@xl"
          style={{ padding: "10px 0 10px 0" }}
          data-uk-grid
        >
          {this.props.subjects.map((subject) => (
            <Link
              key={subject.id}
              style={{ textDecoration: "none" }}
              to={`${this.props.match.path}/subject/teachers/${subject.id}/${subject.name}`}
            >
              <div
                className="uk-box-shadow-hover-large uk-box-shadow-smalln uk-padding-remove"

                // style={{ marginRight: "10px" }}
              >
                <img
                  src={subject.cover_art}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <h1
                  className="uk-text-lead uk-text-center"
                  style={{ padding: "10px 0 20px 0", margin: "0" }}
                >
                  {subject.name}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  subjects: state.teacher.subjects,
});

export default connect(mapStateToProps, { getSubjects })(Home);
