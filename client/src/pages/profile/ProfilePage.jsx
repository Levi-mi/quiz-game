import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../useManager/authContext';
import axios from 'axios';
import URLs from '../../constants/URLS';
import './ProfilePage.css';

const ProfilePage = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleDeleteRecord = async (recordId) => {
        try {
            console.log('Attempting to delete record:', recordId);
            const deleteUrl = `${URLs.getRecords}/delete/${recordId}`;
            const response = await axios.delete(deleteUrl, {
                withCredentials: true
            });
            console.log('Delete response:', response);
            
            if (response.status === 200) {
                setRecords(prevRecords => prevRecords.filter(record => record._id !== recordId));
                alert('Record deleted successfully!');
            } else {
                throw new Error('Failed to delete record');
            }
        } catch (error) {
            console.error('Error deleting record:', error.response || error);
            alert(`Failed to delete record: ${error.response?.data?.message || error.message}`);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchUserRecords = async () => {
            try {
                const response = await axios.get(URLs.getUserRecords(user._id), {
                    withCredentials: true
                });
                console.log('Response from server:', response.data);
                if (response.data && response.data.records) {
                    setRecords(response.data.records);
                } else {
                    console.log('Unexpected data structure:', response.data);
                    setRecords([]);
                }
            } catch (error) {
                console.error('Error fetching records:', error);
                setRecords([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUserRecords();
    }, [user, navigate]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h1>Profile Page</h1>
            <div className="records-container">
                <h3>Your Quiz History</h3>
                {records.length === 0 ? (
                    <p>No quiz history found. Try taking some quizzes!</p>
                ) : (
                    <div className="records-grid">
                        {records.map((record) => {
                            console.log('Record:', record); // Debug log
                            return (
                                <div key={record._id} className="record-card">
                                    <h4>{record.category.charAt(0).toUpperCase() + record.category.slice(1)} - {record.difficulty.charAt(0).toUpperCase() + record.difficulty.slice(1)}</h4>
                                    <p>Score: {record.score || record.totalScore || 0}</p>
                                    <p>Date: {new Date(record.createdAt || record.date).toLocaleDateString()}</p>
                                    <button 
                                        className="delete-record-btn"
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this record?')) {
                                                handleDeleteRecord(record._id);
                                            }
                                        }}
                                    >
                                        Delete Record
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
