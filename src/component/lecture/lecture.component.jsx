import React, { useEffect, useState } from "react";
import { db } from "../data/firebase";
import { Link } from "@reach/router";
import ImageUploader from "../image-uploader/image-uploader.component";

const Lecture = ({ lectureId }) => {
  const [lecture, setLecture] = useState({});
  const lectureCollection = db.collection("lecture")

  useEffect(() => {
    const unsubscribe = lectureCollection
      .doc(lectureId)
      .onSnapshot(snap => {
        setLecture(snap.data());
      })
    return unsubscribe
  }, [lectureId]);

  const updateImagePath = imagePath => {
    lectureCollection
      .doc(lectureId)
      .set({ imagePath }, { merge: true })
  }

  const handlePublish = () => {
    lectureCollection
      .doc(lectureId)
      .set({ published: !lecture.published }, { merge: true })
  }

  return (
    <div>
      <h1>Lecture {lectureId}</h1>
      <button onClick={handlePublish}>
        {lecture.published ? 'Unp' : 'P'}ublish Lecture
      </button>
      <pre>{JSON.stringify(lecture, null, 2)}</pre>
      {lecture && lecture.course && (
        <>
          <p>
            Back to{" "}
            <Link to={`/course/${lecture.course.id}`}>
              {lecture.course.title}
            </Link>
          </p>
          <ImageUploader imagePath={lecture.imagePath} onSuccess={updateImagePath} />
        </>
      )}
    </div>
  );
};

export default Lecture;
