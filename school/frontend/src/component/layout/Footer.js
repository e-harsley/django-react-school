import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Footer extends Component {
  render() {
    return (
      <footer className="uk-margin-small">
        <a className="uk-link-muted">© Ekhorutomwen Harsley</a> /{" "}
        <a
          className="uk-link-muted"
          href="https://www.linkedin.com/in/ekhorutomwen-harsley-867144164"
        >
          Linked Page
        </a>{" "}
        /{" "}
        <a
          className="uk-link-muted"
          href="https://github.com/e-harsley/django-react-school"
        >
          Github
        </a>
      </footer>
    );
  }
}

export default Footer;
