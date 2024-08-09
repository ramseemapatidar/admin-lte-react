import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../../store/reducers/auth';

export const Profile = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.auth.user);
    const [formData, setFormData] = useState({
        name: userInfo.name || '',
        email: userInfo.email || '',
        file: null,
    });

    // useEffect(() => {
    //     dispatch(getProfile());
    // }, [dispatch]);

    useEffect(() => {
        if (userInfo) {
            setFormData({
                name: userInfo.name,
                email: userInfo.email,
                file: null,
            });
        }
    }, [userInfo]);

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

        dispatch(updateProfile(formDataToSend));
        toast.success('Profile updated successfully!');

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
