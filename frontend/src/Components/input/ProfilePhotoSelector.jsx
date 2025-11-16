import React, { useState, useRef } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const inputRef = useRef(null);

  // Trigger file input click
  const triggerFileInput = () => inputRef.current.click();

  // Handle image file selection and generate preview URL
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const previewURL = URL.createObjectURL(file);
      setPreview && setPreview(previewURL);
      setPreviewUrl(previewURL);
    }
  };

  // Remove selected image and reset preview
  const handleRemoveImage = () => {
    setImage(null);
    setPreview && setPreview(null);
    setPreviewUrl(null);
  };

  return (
    <div className="flex justify-center mb-6">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* No image selected */}
      {!image ? (
        <div className="relative w-24 h-24 flex items-center justify-center bg-orange-50 rounded-full shadow-lg cursor-pointer hover:bg-orange-100 transition-colors duration-300">
          <LuUser className="text-5xl text-orange-500" />
          <button
            type="button"
            onClick={triggerFileInput}
            aria-label="Upload profile photo"
            className="absolute bottom-0 right-0 flex items-center justify-center w-9 h-9 bg-orange-500 rounded-full shadow-lg text-white hover:bg-orange-600 transition-colors duration-300"
          >
            <LuUpload size={20} />
          </button>
        </div>
      ) : (
        // Image preview
        <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg ring-2 ring-orange-300 cursor-pointer hover:scale-105 transition-transform duration-300">
          <img
            src={preview || previewUrl}
            alt="Profile"
            className="w-full h-full object-cover"
            onClick={triggerFileInput}
            title="Click to change photo"
          />
          <button
            type="button"
            className="absolute -bottom-1 -right-1 w-9 h-9 flex items-center justify-center bg-gradient-to-r from-orange-500/90 to-orange-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
            aria-label="Remove photo"
            onClick={handleRemoveImage}
          >
            <LuTrash size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
