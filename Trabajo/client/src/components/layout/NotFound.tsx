import * as React from "react";
import { Link } from "react-router-dom";

// Interface for defining props for landing page
interface NotFoundProps {}

/* The NotFound page is a generic error page that is displayed
 * if the user puts in a URL that is not part of our application.
 */
export const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <div>
      <h1>Error 404: Page Not Found</h1>
      <Link style={{ color: "white" }} to="/">
        Return Home
      </Link>
    </div>
  );
};
