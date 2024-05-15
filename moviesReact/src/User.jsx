import React, { useState, useEffect } from "react";
import { LuPencil } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function UserInfoPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: "", nombre: "", tel: "", email: ""});
    const [editingUsername, setEditingUsername] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [editingPhone, setEditingPhone] = useState(false);
    const [error, setError] = useState("");

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
    
    // Get the current user information
    useEffect(() => {
        // Fetch user information from http://apps/users/me with session cookie
        fetch('http://127.0.0.1:8000/apps/users/me/', {
            method: 'GET',
            credentials: 'include', // This will include the session cookie in the request
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setUser(data);
            // Set other state variables if needed
        })
        .catch(error => console.error('Error:', error));
    }, []);

    const handleUsernameEdit = () => {
        setEditingUsername(true);
    };

    const handleEmailEdit = () => {
        setEditingEmail(true);
    };

    const handleNameEdit = () => {
        setEditingName(true);
    };

    const handlePhoneEdit = () => {
        setEditingPhone(true);
    };

    const updateUserData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/apps/users/me/', {
                method: 'PATCH',
                credentials: 'include', // This will include the session cookie in the request
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: user.username,
                    email: user.email,
                    nombre: user.nombre,
                    tel: user.tel
                })
            });
    
            if (!response.ok) {
                const data = await response.json();
                setError(data.message);
            }
    
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const handleUpdateUsername = (e) => {
        e.preventDefault();
        setEditingUsername(false);
        updateUserData();
    };
    
    const handleUpdateEmail = (e) => {
        e.preventDefault();
        setEditingEmail(false);
        updateUserData();
    };
    
    const handleUpdateName = (e) => {
        e.preventDefault();
        setEditingName(false);
        updateUserData();
    };

    const handleUpdatePhone = (e) => {
        e.preventDefault();
        setEditingPhone(false);
        updateUserData();
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
        setShowDeleteConfirmationModal(true);
        setShowChangePasswordModal(false);
    };

    const handleChangePasswordSubmit = async (e) => {
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
        try {
            const response = await fetch('http://127.0.0.1:8000/apps/users/me/', {
                method: 'PATCH',
                credentials: 'include', // This will include the session cookie in the request
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: passwordValues.newPassword
                })
            });
    
            if (!response.ok) {
                const data = await response.json();
                setPasswordError(data.message);
                return;
            }
    
            const data = await response.json();
            console.log(data);
        }
        catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteUserAccount = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/apps/users/me/', {
                method: 'DELETE',
                credentials: 'include', // This will include the session cookie in the request
            });
    
            if (!response.ok) {
                throw new Error('HTTP status ' + response.status);
            }
    
            // Handle what should happen after the account is deleted
            // For example, redirect the user to the login page
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const handleDeleteAccountConfirm = () => {
        setDeleteConfirmationError("");
        if (deleteConfirmationPassword !== "Delete") {
            setDeleteConfirmationError("Incorrect confirmation text");
            return;
        }
        deleteUserAccount();
        setShowDeleteConfirmationModal(false);
        navigate("/login");
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
            {error && <span className="span-error form-error">{error}</span>}
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
            <div className="user-info-name-wrapper">
                {editingName ? (
                    <form onSubmit={handleUpdateName}>
                        <input
                            type="text"
                            value={user.nombre}
                            onChange={(e) => setUser({ ...user, nombre: e.target.value })}
                        />
                        <button type="submit">Save</button>
                    </form>
                ) : (
                    <p>
                        {user.nombre}
                        <span className="span-button" 
                        style={{ cursor: "pointer" }}
                        onClick={handleNameEdit}><LuPencil /></span>
                    </p>
                )}
            </div>
            <div className="user-info-phone-wrapper">
                {editingPhone ? (
                    <form onSubmit={handleUpdatePhone}>
                        <input
                            type="text"
                            value={user.tel}
                            onChange={(e) => setUser({ ...user, tel: e.target.value })}
                        />
                        <button type="submit">Save</button>
                    </form>
                ) : (
                    <p>
                        {user.tel}
                        <span className="span-button" 
                        style={{ cursor: "pointer" }}
                        onClick={handlePhoneEdit}><LuPencil /></span>
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
        <form className="form change-pass-form" onSubmit={handleChangePasswordSubmit}>
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
            {showPasswordError && <span className="span-error form-error">{passwordError}</span>}
            <button className="form-field" type="submit">Change Password</button>
        </form>
    )});
}

function DeleteConfirmationModal({ handleDeleteAccountConfirm, deleteConfirmationPassword, setDeleteConfirmationPassword, deleteConfirmationError, show, setShow}) {
    return Modal({ show, setShow, children: (
        <form className="form delete-account-form" onSubmit={handleDeleteAccountConfirm}>
            <p>Are you sure you want to delete your account?</p>
            <p>Type "Delete" to confirm</p>
            <input
                className="form-field"
                type="text"
                value={deleteConfirmationPassword}
                name="password"
                onChange={(e) => setDeleteConfirmationPassword(e.target.value)}
                placeholder=""
            />
            {deleteConfirmationError != "" && <span className="span-error form-error">{deleteConfirmationError}</span>}
            <button className="form-field" type="submit">Delete Account</button>
        </form>
    )});
}
