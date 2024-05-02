import React, { useState, useEffect } from "react";
import { LuPencil } from "react-icons/lu";

export default function UserInfoPage() {
    const [user, setUser] = useState({ username: "Asteris", email: "asteris@example.com" });
    const [editingUsername, setEditingUsername] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);

    // For changing password
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [passwordValues, setPasswordValues] = useState({
        password: "",
        newPassword: "",
        newPassword2: "",
    });
    const [passwordError, setPasswordError] = useState("");
    const [showPasswordError, setShowPasswordError] = useState(false);

    // For deleting account
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [deleteConfirmationPassword, setDeleteConfirmationPassword] = useState("");
    const [deleteConfirmationError, setDeleteConfirmationError] = useState("");
    const [showDeleteConfirmationError, setShowDeleteConfirmationError] = useState(false);

    const handleUsernameEdit = () => {
        setEditingUsername(true);
    };

    const handleEmailEdit = () => {
        setEditingEmail(true);
    };

    const handleUpdateUsername = (e) => {
        e.preventDefault();
        setEditingUsername(false);
        // Update username in database or state management system
    };

    const handleUpdateEmail = (e) => {
        e.preventDefault();
        setEditingEmail(false);
        // Update email in database or state management system
    };

    const handlePasswordInputchange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setPasswordValues((passwordValues) => ({
            ...passwordValues,
            [name]: value,
        }));
    };

    const handleChangePassword = () => {
        // Reset password values
        setPasswordValues({
            password: "",
            newPassword: "",
            newPassword2: "",
        });
        setPasswordError("");
        setShowPasswordError(false);
        setShowChangePasswordModal(true);
        setShowDeleteConfirmationModal(false);
    };
    const handleDeleteAccount = () => {
        // Reset delete confirmation password
        setDeleteConfirmationPassword("");
        setDeleteConfirmationError("");
        setShowDeleteConfirmationError(false);
        setShowDeleteConfirmationModal(true);
        setShowChangePasswordModal(false);
    };

    const handleChangePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordValues.newPassword !== passwordValues.newPassword2) {
            setPasswordError("Passwords do not match");
            setShowPasswordError(true);
            return;
        }
        setPasswordError("");
        setShowPasswordError(false);
        setShowChangePasswordModal(false);
        // Handle password change logic
    };

    const handleDeleteAccountConfirm = () => {
        // Handle account deletion logic
        setShowDeleteConfirmationModal(false);
    };

    return (
        <main className="user-info">
            <div className="user-info-header">
                {editingUsername ? (
                    <form onSubmit={handleUpdateUsername}>
                        <input
                            type="text"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />
                        <button type="submit">Save</button>
                    </form>
                ) : (
                    <h1>
                        {user.username}
                        <span className="span-button" 
                        style={{ cursor: "pointer" }}
                        onClick={handleUsernameEdit}><LuPencil /></span>
                    </h1>
                )}
            </div>
            <div className="user-info-email-wrapper">
                {editingEmail ? (
                    <form onSubmit={handleUpdateEmail}>
                        <input
                            type="text"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                        <button type="submit">Save</button>
                    </form>
                ) : (
                    <p>
                        {user.email}
                        <span className="span-button" 
                        style={{ cursor: "pointer" }}
                        onClick={handleEmailEdit}><LuPencil /></span>
                    </p>
                )}
            </div>

            <button onClick={handleChangePassword}>Change Password</button>

            <button onClick={handleDeleteAccount}>Delete Account</button>

            <ChangePasswordModal 
                show={showChangePasswordModal}
                setShow={setShowChangePasswordModal}
                handleChangePasswordSubmit={handleChangePasswordSubmit}
                handlePasswordInputchange={handlePasswordInputchange}
                passwordValues={passwordValues}
                showPasswordError={showPasswordError}
                passwordError={passwordError}
            />

            <DeleteConfirmationModal
                show={showDeleteConfirmationModal}
                setShow={setShowDeleteConfirmationModal}
                handleDeleteAccountConfirm={handleDeleteAccountConfirm}
                deleteConfirmationPassword={deleteConfirmationPassword}
                setDeleteConfirmationPassword={setDeleteConfirmationPassword}
                showDeleteConfirmationError={showDeleteConfirmationError}
                deleteConfirmationError={deleteConfirmationError}
            />
        </main>
    );
}

function Modal({ show, setShow, children }) {
    const closeModal = (e) => {
        if (e.target.className === 'modal') {
            setShow(false);
        }
    }

    const closeSpan = () => {
        setShow(false);
    }

    useEffect(() => {
        const handleWindowClick = (event) => {
            if (event.target.className === 'modal') {
                setShow(false);
            }
        }

        window.addEventListener('click', handleWindowClick);

        return () => {
            window.removeEventListener('click', handleWindowClick);
        }
    }, [setShow]);

    return show ? (
        <div className="modal" onClick={closeModal}>
            <div className="modal-content">
                <span className="close" onClick={closeSpan}>&times;</span>
                {children}
            </div>
        </div>
    ) : null;
}

function ChangePasswordModal({ handleChangePasswordSubmit, handlePasswordInputchange, passwordValues, showPasswordError, passwordError, show, setShow}) {
    return Modal({ show, setShow, children: (
        <form className="change-pass-form" onSubmit={handleChangePasswordSubmit}>
            <input
                className="form-field"
                type="password"
                value={passwordValues.password}
                name="password"
                placeholder="Current password"
                onChange={handlePasswordInputchange}
            />
            <input
                className="form-field"
                type="password"
                value={passwordValues.newPassword}
                name="newPassword"
                placeholder="New password"
                onChange={handlePasswordInputchange}
            />
            <input
                className="form-field"
                type="password"
                value={passwordValues.newPassword2}
                name="newPassword2"
                placeholder="Repeat new password"
                onChange={handlePasswordInputchange}
            />
            {showPasswordError && <span className="form-error">{passwordError}</span>}
            <button className="form-field" type="submit">Change Password</button>
        </form>
    )});
}

function DeleteConfirmationModal({ handleDeleteAccountConfirm, deleteConfirmationPassword, setDeleteConfirmationPassword, showDeleteConfirmationError, deleteConfirmationError, show, setShow}) {
    return Modal({ show, setShow, children: (
        <form className="delete-account-form" onSubmit={handleDeleteAccountConfirm}>
            <p>Are you sure you want to delete your account?</p>
            <input
                className="form-field"
                type="password"
                value={deleteConfirmationPassword}
                name="password"
                onChange={(e) => setDeleteConfirmationPassword(e.target.value)}
                placeholder="Enter your password to confirm"
            />
            {showDeleteConfirmationError && <span className="form-error">{deleteConfirmationError}</span>}
            <button className="form-field" type="submit">Delete Account</button>
        </form>
    )});
}
