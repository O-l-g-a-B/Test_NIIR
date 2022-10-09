import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const Profile = () => {
  const userName = useSelector((state) => state.auth.login);
  const lastLoginTime = useSelector((state) => state.auth.lastLoginTime);
  const auth = useSelector((state) => state.auth.isLogged);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  });

  return (
    <div>
      {auth && (
        <div>
          <h1>Profile</h1>
          Hello, {userName}! This is a page only for you!
          {lastLoginTime && (
            <Alert className="mx-auto w-50" variant="success">
              <Alert.Heading>Your last time Sign In</Alert.Heading>
              <hr />
              {lastLoginTime.toString()}
            </Alert>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
