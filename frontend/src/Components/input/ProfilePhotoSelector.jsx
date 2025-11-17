import React, { useState, useRef } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const inputRef = useRef(null);

  const triggerFileInput = () => inputRef.current.click();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const previewURL = URL.createObjectURL(file);
      setPreview && setPreview(previewURL);
      setPreviewUrl(previewURL);
    }
  };

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
        <div className="relative w-28 h-28 flex items-center justify-center bg-orange-50 rounded-full shadow-md cursor-pointer hover:bg-orange-100 transition-colors duration-300">
          <LuUser className="text-6xl text-orange-500" />
          <button
            type="button"
            onClick={triggerFileInput}
            aria-label="Upload profile photo"
            className="absolute -bottom-2 -right-2 flex items-center justify-center w-10 h-10 bg-orange-500 rounded-full shadow-md text-white hover:bg-orange-600 hover:scale-110 transition-transform duration-200"
          >
            <LuUpload size={22} />
          </button>
        </div>
      ) : (
        // Image preview
        <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-md ring-2 ring-orange-300 cursor-pointer hover:scale-105 transition-transform duration-300">
          <img
            src={preview || previewUrl}
            alt="Profile"
            className="w-full h-full object-cover"
            onClick={triggerFileInput}
            title="Click to change photo"
          />
          <button
            type="button"
            className="absolute -bottom-2 -right-2 w-10 h-10 flex items-center justify-center bg-gradient-to-r from-orange-500/90 to-orange-600 text-white rounded-full shadow-md hover:scale-110 transition-transform duration-200"
            aria-label="Remove photo"
            onClick={handleRemoveImage}
          >
            <LuTrash size={22} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
