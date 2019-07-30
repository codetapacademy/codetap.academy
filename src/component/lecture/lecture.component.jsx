import React, { useEffect, useState } from "react";
import { db } from "../data/firebase";
import { Link } from "@reach/router";
import { storage } from "firebase";

const Lecture = ({ lectureId }) => {
  const [lecture, setLecture] = useState();
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  useEffect(() => {
    (async () => {
      const lectureSnapshot = await db
        .collection("lecture")
        .doc(lectureId)
        .get();

      setLecture(lectureSnapshot.data());
    })();
  }, [lectureId]);

  const handleImageChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const handleImageUpload = () => {
    storage()
      .ref(`lecture-pictures/${image.name}`)
      .put(image)
      .on(
        "state_changed",
        snapshot => {
          setImageUploadProgress(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        error => {
          console.log(`Woops! ${error.message} while uploading ${image.name}`);
        },
        () => {
          storage()
            .ref("lecture-pictures")
            .child(image.name)
            .getDownloadURL()
            .then(url => setImageURL(url));
        }
      );
  };

  return (
    <div>
      <h1>Lecture {lectureId}</h1>
      {lecture && lecture.course && (
        <p>
          Back to{" "}
          <Link to={`/course/${lecture.course.id}`}>
            {lecture.course.title}
          </Link>
        </p>
      )}
      <progress value={imageUploadProgress} max="100" />
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      <img
        src={imageURL || "http://via.placeholder.com/600x300"}
        alt={image.name}
        height="300"
        width="600"
      />
    </div>
  );
};

export default Lecture;
