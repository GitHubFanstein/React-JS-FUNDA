import React, { useState } from 'react';
import './ChangePasswordFormStyle.css';

let EmailForm = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    let handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    let handleClick = () => {
        sendEmailChangePassword(user);
    };

    return (
        <div className="form-container">
            <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={user.username}
                onChange={handleInputChange}
                className="form-input"
            />
            <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={handleInputChange}
                className="form-input"
            />
            <button className="bg-color" onClick={handleClick}>Send Email</button>

            <br></br>

            
        </div>
        
    );
};

let sendEmailChangePassword = (user) => {
    fetch('http://localhost:8080/api/account/password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user), // Convert the user object to JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        if (data.message) {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while sending the email.');
    });
}

export default EmailForm;
