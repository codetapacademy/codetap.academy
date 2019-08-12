import React, { useState } from 'react'
import { storage } from '../data/firebase';
import { StyledImageUploader, StyledProgressBar } from './image-uploader.style';

const ImageUploader = ({ onSuccess, imagePath, lectureId }) => {
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState(imagePath || 'http://via.placeholder.com/600x300');
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  const handleImageChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageURL(URL.createObjectURL(e.target.files[0]));
    } else {
      setImage("");
    }
  };

  const handleImageUpload = () => {
    storage
      .ref(`lecture-picture/${lectureId}`)
      .put(image)
      .on(
        "state_changed",
        snapshot => {
          setImageUploadProgress(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        error => {
          console.log(`Woops! ${error.message} while uploading ${lectureId}`);
        },
        () => {
          storage
            .ref("lecture-picture")
            .child(lectureId)
            .getDownloadURL()
            .then(url => {
              setImageURL(url)
              onSuccess(url)
            });
        }
      );
  };

  return (
    <StyledImageUploader imagePath={imageURL}>
      <StyledProgressBar value={imageUploadProgress} max="100" />
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
    </StyledImageUploader>
  )
}

export default ImageUploader
