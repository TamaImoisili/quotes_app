import React, { useState } from 'react';
import '../Styles/DeleteAccPage.css'

const DeleteAccPage = ({ demoMode, setError, updateDeletePage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleDelete = async () => {
        if (demoMode) {
            setError(1, "Cannot delete demo mode account, please sign out.")
        } else {

        }
        updateDeletePage(false);
    }
    const cancelDelete = () =>{
        updateDeletePage(false);
    }
    return (
        <div className='DeletePage'>
            <div className="delete-input-fields">
                <input
                    type="text"
                    placeholder="Email"
                    className="delete-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="delete-password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="ConfirmAndCancel">
                <button className="confirm-delete" onClick={handleDelete}>
                    Confirm
                </button>
                <button className="cancel-delete" onClick={cancelDelete}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteAccPage;
