import React from 'react';

const UsersRender = ({ users })=> {
    return (
        <div>
            {users.map(user => {
                return (
                    <div>
                        <h2>{user.data.name}</h2>
                        <p>{user.data.email}</p>
                    </div>
                )
            })}
        </div>
    )
};

export default UsersRender;