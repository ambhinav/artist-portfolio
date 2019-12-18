import React, { useEffect } from "react";
import { AuthUserContext } from './index'
import { withFirebase } from "../Firebase";

const withAuthentication = Component => {
  const WithAuthentication = props => {

    const [authUser, setAuthUser] = React.useState(null);

    /* A small problem here, user needs to enter credentials twice before he is pushed to the dashboard! */

    // keep checking if user log in status changes
    useEffect(() => {
      const checkAuthStatus = () => { 
        props.firebase.auth.onAuthStateChanged(authUser => {
          authUser ? setAuthUser(authUser) : setAuthUser(null);
        });
      }

      checkAuthStatus();
    }, [props.firebase.auth]);

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };
  return withFirebase(WithAuthentication);
};

export default withAuthentication;
