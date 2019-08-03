import React, { useEffect, useState } from "react";
import { db } from "../data/firebase";
import { Link } from "@reach/router";
import ImageUploader from "../image-uploader/image-uploader.component";

const Lecture = ({ lectureId }) => {
  const [lecture, setLecture] = useState();
  const lectureCollection = db.collection("lecture")

  useEffect(() => {
    (async () => {
      const lectureSnapshot = await lectureCollection
        .doc(lectureId)
        .get();

      setLecture(lectureSnapshot.data());
    })();
  }, [lectureId]);

  const updateImagePath = imagePath => {
    lectureCollection
      .doc(lectureId)
      .set({ imagePath }, { merge: true })
  }

  return (
    <div>
      <h1>Lecture {lectureId}</h1>
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
