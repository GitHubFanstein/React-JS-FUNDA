import React, { useState, useEffect } from 'react';
import './FormChangePassword.css';

const ChangePasswordForm = () => {
    const [recentPass, setRecentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [guid, setGuid] = useState('');

    // Function to extract GUID from the URL
    useEffect(() => {
        const url = window.location.href;
        const extractedGuid = url.substring(url.lastIndexOf('/') + 1);
        setGuid(extractedGuid);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPass !== confirmPass) {
            setError('New password and confirmation do not match.');
            return;
        }

          // log cek recent pass, new pass dan guid 
            console.log('Request:', JSON.stringify({ recentPass, newPass }));
            console.log('GUID:', guid);

        fetch(`http://localhost:8080/api/account/password/change/${guid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'recentPass': recentPass,  // Add these as headers
                'newPass': newPass,        // Add these as headers
                'confirmPass': confirmPass // Add these as headers
            },
            body: JSON.stringify({ recentPass, newPass }),
            
        })
        .then(response => response.json().then(result => ({ result, response })))
        .then(({ result, response }) => {
            if (response.ok) {
                setSuccess('Password changed successfully.');
                setError('');
            } else {
                setError(result.message || 'Error changing password.');
                setSuccess('');
            }
        })
        .catch(() => {
            setError('Failed to change password. Please try again later.');
            setSuccess('');
        });
    };

    return (
        <div className="form-container">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="recentPass" className="form-label">Recent Password</label>
                    <input
                        type="password"
                        name="recentPass"
                        placeholder="Enter your recent password"
                        className="form-control"
                        id="recentPass"
                        value={recentPass}
                        onChange={(e) => setRecentPass(e.target.value)}
                        required
                    />
                    <div className="form-text">Please enter your current password.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="newPass" className="form-label">New Password</label>
                    <input
                        type="password"
                        name="newPass"
                        placeholder="Enter your new password"
                        className="form-control"
                        id="newPass"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        required
                    />
                    <div className="form-text">Please enter your new password.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPass" className="form-label">Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPass"
                        placeholder="Confirm your new password"
                        className="form-control"
                        id="confirmPass"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        required
                    />
                    <div className="form-text">Ensure this matches your new password.</div>
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-danger">
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordForm;
