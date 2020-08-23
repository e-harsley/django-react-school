import React, { Component } from "react";
import AvatarGenerator from "react-avatar-generator";
import { Link } from "react-router-dom";
import ProfileForm from "./ProfileForm";

export class Edit extends Component {
  render() {
    return (
      <div>
        <div className=" uk-background-default uk-border-rounded">
          <div className="uk-grid-small" data-uk-grid>
            <div className="uk-width-1-4@s uk-visible@s">
              <AvatarGenerator
                sizing="9"
                colors={["#1c3f6e", "#2e67a0", "blue"]}
                height="150"
                width="150"
                shape="square"
                backgroundColor="#eee"
              />
            </div>
            <div className="uk-width-3-4@s uk-width-1-1 uk-padding-small-left">
              <ProfileForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
