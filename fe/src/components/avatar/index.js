import React from 'react'
import { useState, useRef, useEffect } from 'react';
import './style.css'
import PlaceholderAvatar from './placeholder.jpg'
export default function Avatar({ initialData }) {
    const fileInputRef = useRef(null);
    const [avatar, setAvatar] = useState(initialData.photo_url);
    const [background, setBackground] = useState(initialData.background_image_url);
    const [isButtonVisible, setButtonVisible] = useState(false);
    const [showFileAddField, setShowAddFileField] = useState(false);
    const [photoType, setPhotoType] = useState();
    const [isLocked, setLock] = useState(false);
    const handleMouseMove = (type) => {
        setButtonVisible(true);
        if (!isLocked) {
            setPhotoType(type);
        }
    };

    const handleMouseLeave = () => {
        setButtonVisible(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            const addFile = document.getElementById('add-file-field');
            if (event.target !== addFile && event.target.parentNode !== addFile) {
                setShowAddFileField(false);
                setLock(false);
            }
        };
        window.addEventListener('mouseup', handleOutsideClick);
    }, []);

    const handleChangeButtonClick = (type) => {
        setShowAddFileField(true);
        setPhotoType(type);
        setLock(true);
    };

    const handleAddFileClick = () => {
        fileInputRef.current.click();
    }

    const handleChange = (event) => {
        const uploadedPhoto = event.target.files[0];
        console.log(uploadedPhoto);
        if (uploadedPhoto.size > 3.1 * 1024 * 1024) {
            alert('File size exceeds the limit of 3.1MB');
            return;
        }
        if (uploadedPhoto) {
            const reader = new FileReader();
            if (photoType === "avatar") {
                reader.onload = () => {
                    setAvatar(reader.result);
                    initialData.photo_url = avatar;
                }
            } else if (photoType === "background") {
                reader.onload = () => {
                    setBackground(reader.result);
                    initialData.background_image_url = background;
                }
            };
            reader.readAsDataURL(uploadedPhoto);
            //Send data to BE here
        }
        setShowAddFileField(false);
        setLock(false);
    };
    return (
        <>
            <div className='photo-container'>
                {background &&
                    <img src={background} alt='User background' className='background-container' />
                }
                {avatar ? (
                    <img src={avatar} alt='User Avatar' className='avatar-container' />
                ) : (
                    <img src={PlaceholderAvatar} alt='User Avatar' className='avatar-container' />
                )}
                <div
                    className='background-container'
                    onMouseMove={() => handleMouseMove("background")}
                    onMouseLeave={handleMouseLeave}
                >
                    {isButtonVisible && photoType === "background" &&
                        <button className='background-transparent-layout' onClick={() => handleChangeButtonClick("background")} >
                            <div className='transparent-layout-center-content'>
                                <i className="fa fa-camera fa-lg" aria-hidden="true"></i>
                                Update background
                            </div>
                        </button>}
                </ div>
                <div
                    className='avatar-container'
                    onMouseMove={() => handleMouseMove("avatar")}
                    onMouseLeave={handleMouseLeave}
                >
                    {isButtonVisible && photoType === "avatar" &&
                        <button className='avatar-transparent-layout' onClick={() => handleChangeButtonClick("avatar")} >
                            <div className='transparent-layout-center-content'>
                                <i className="fa fa-camera fa-lg" aria-hidden="true"></i>
                                Update photo
                            </div>
                        </button>}
                </ div>
            </div>
            {showFileAddField && (
                <div className='add-file-field' id='add-file-field'>
                    <button className='add-file-button' onClick={handleAddFileClick}>
                        <input type='file' accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={(e) => handleChange(e)} />
                        <i class="fa fa-cloud-upload" aria-hidden="true" style={{
                            width: '40px',
                            height: '40px',
                            color: '#919EAB'
                        }}></i>
                        <label>Upload file</label>
                    </button>
                    <div className='note'>
                        <span>Allowed *.jpeg, *.jpg, *.png, *.gif</span>
                        <span>Max size of 3.1 MB</span>
                    </div>
                </div>
            )
            }
        </>
    );
}