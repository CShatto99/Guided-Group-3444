import * as React from "react";
import { Link } from "react-router-dom";
import "./layoutStyles.css";

/* Interface for defining props for landing page
 */
interface NotFoundProps {}

/* Interface for defining state for landing page
 */
interface NotFoundState {}

export class NotFound extends React.Component<NotFoundProps, NotFoundState> {
  render() {
    return (
      <div>
          <h1>Error 404: Page Not Found</h1>
          <Link style={{ color: "white" }} to="/">
            Return Home
          </Link>
      </div>
    );
  }
}
