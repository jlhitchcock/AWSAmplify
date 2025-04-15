import React, { useState, useEffect } from 'react';

const Banner = ({ eventDetails, onImageChange, editing}) => {
    
    let image = null;
    if(!editing) {
        image = eventDetails.image || ''; // Get the image from eventDetails

    }


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 512 * 1024; // 512KB

        // Check file type
        if (!validTypes.includes(file.type)) {
            alert("Only JPG, PNG, or GIF files are allowed.");
            return;
        }

        // Check file size
        if (file.size > maxSize) {
            alert("File size must be under 512KB.");
            return;
        }

        // Check image dimensions
        const reader = new FileReader();
        reader.onloadend = () => {
            const img = new Image();
            img.onload = () => {
                if (img.width !== 1200 || img.height !== 400) {
                    alert("Image must be exactly 1200x400 pixels.");
                    return;
                }
                onImageChange(reader.result); // Pass valid image to parent
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    };


    return (
        <div className="host-event-banner">
            <div className="host-event-headings">
                <h1 className="event-title">{eventDetails.title || "Event Title"}</h1>
                <h2 className="event-location">{eventDetails.location || "Location"}</h2>
                <h3 className="event-time">{eventDetails.startDate} {eventDetails.startTime} - {eventDetails.endTime}</h3>
            </div>

            <div className="events-grid">
                <form>
                    <div className="form-group">
                        <div className="input-container">
                            <label htmlFor="banner-upload">Upload Banner Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    {image && (
                        <div className="form-group">
                            <div className="input-container">
                                <h3>Preview:</h3>
                                <img src={image} alt="Banner Preview" style={{width: '100%', maxHeight: '200px'}}/>
                            </div>
                        </div>
                    )}

                    <p>Feature Image must be  1200 pixels wide by 400 pixels high.</p>
                    <p>Valid file formats: JPG, GIF, PNG.</p>
                    <p>Max Size must be less than 512KB</p>

                </form>
            </div>
        </div>
    );
};

export default Banner;
