import React from "react";

const UserList = props => {
  console.log(props);
  return (
    <div className="Userlist">
      {props.list.map(user => {
          return (
            <div className="UserInfo" key={user.id}>
              <h4>name: {user.name}</h4>
              <p>email: {user.email}</p>
              <p>password: {user.password}</p>
            </div>
          );
      })}
    </div>
  );
};

export default UserList;
