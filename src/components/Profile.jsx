import React from "react";
import {useAuth0} from "../react-auth0-wrapper";

const Profile = () => {
    const {loading, user} = useAuth0();

    if (loading || !user) {
        return "Loading...";
    }

    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text">{user.name}</p>
                <p className="card-text">{user.email}</p>
                <code>{JSON.stringify(user, null, 2)}</code>
            </div>
        </div>
    );
};

export default Profile;