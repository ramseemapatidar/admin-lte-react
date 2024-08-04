import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUserProfile, updateUserProfile } from '../../service/authuser';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthentication } from '../../store/reducers/auth';

export const Profile = () => {
    const dispatch = useDispatch();
    const authentication = useSelector((state) => state.auth.authentication);
    const [formData, setFormData] = useState({
        name: authentication.userInfo.user.name || '',
        email: authentication.userInfo.user.email || '',
        file: null,
    });

    useEffect(() => {
        if (authentication?.user) {
            setFormData({
                name: authentication.userInfo.user.name,
                email: authentication.userInfo.user.email,
                file: null,
            });
        }
    }, [authentication]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        if (formData.file) {
            formDataToSend.append('image', formData.file);
        }

        try {
            await updateUserProfile(formDataToSend);
            
            const currentAuth = JSON.parse(localStorage.getItem('authentication'));
           
            if (currentAuth) {
               
                currentAuth.userInfo.user.name = formData.name;
               
                localStorage.setItem('authentication', JSON.stringify(currentAuth));

                // Update Redux state
                dispatch(setAuthentication(currentAuth));
                toast.success('Profile updated successfully!');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        }
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Profile</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter Name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    name="email"
                                    value={formData.email}
                                    disabled
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputFile">File input</label>
                                <div className="input-group">
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            id="exampleInputFile"
                                            onChange={handleFileChange}
                                        />
                                        <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                    </div>
                                    <div className="input-group-append">
                                        <span className="input-group-text">Upload</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

