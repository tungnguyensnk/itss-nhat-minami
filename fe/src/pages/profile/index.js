import React from 'react';
import './style.css';
import Header from '../../components/header';
import Form from '../../components/userForm';
import Avatar from '../../components/avatar';
import Contacts from '../../components/contacts';
const initialData = {
    user_id: 6,
    photo_url: '',
    background_image_url: '',
    name: 'Pham Duc Huy',
    gender: '男性',
    address: '1 Dai Co Viet',
    latitude: 21.007174501197543,
    longitude: 105.84309276692177,
    lang_teach: 'Vietnamese',
    date_of_birth: '01/01/2001',
    country_of_birth: 'Viet Nam',
    price: 5000,
    hours: 3,
    description: '',
    certificates: [
        {
            id: 1,
            language_code: 'IELTS',
            level: '9',
            teacher_id: 1,
            // salary: '5000',
            // minPerLesson: '45'
        },
        {
            id: 2,
            language_code: 'JLPT',
            level: 'N2',
            teacher_id: 1,
            // salary: '5000',
            // minPerLesson: '45'
        },
    ],
    phone_number: '0123456789',
    gmail: '',
    resume_url: '',
    linkedin_url: '',
    twitter_url: '',
    facebook_url: '',
    instagram_url: '',
}

const Profile = () => {
    return (
        <div className='profile-container'>
            <Header />
            <div className='page-label'>
                教師になる！
            </div>
            <div className='left-side'>
                <Avatar initialData={initialData} />
                <Contacts initialData={initialData} />
            </div>
            <Form initialData={initialData} />
        </div>
    );
};

export default Profile;
