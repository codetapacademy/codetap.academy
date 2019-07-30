import React, { useEffect, useState } from "react";
import { db } from "../data/firebase";
import { Link } from "@reach/router";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

const Lecture = ({ lectureId }) => {
  const [lecture, setLecture] = useState();

  useEffect(() => {
    (async () => {
      const lectureSnapshot = await db
        .collection("lecture")
        .doc(lectureId)
        .get();

      setLecture(lectureSnapshot.data());
    })();
  }, [lectureId]);

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
      <FileUploader
        accept="image/*"
        name="image"
        storageRef={firebase.storage().ref("lecture-pictures")}
      />
    </div>
  );
};

export default Lecture;
