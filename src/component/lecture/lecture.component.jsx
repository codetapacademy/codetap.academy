import React, { useEffect, useState } from 'react';
import { db } from '../data/firebase';
import { Link } from '@reach/router';
import ImageUploader from '../image-uploader/image-uploader.component';
import lectureSchema from './lecture.schema';
import DynamicForm from '../_dumb/dynamic-form';
import { async } from 'q';

const Lecture = ({ lectureId }) => {
  const [lecture, setLecture] = useState({});
  const lectureDocument = db.collection('lecture').doc(lectureId);

  useEffect(() => {
    (async () => {
      const l = await lectureDocument.get();
      if (!Object.keys(lecture).length) {
        setLecture(l.data());
      }
    })();
  }, [lecture]);

  const updateImagePath = imagePath => {
    lectureDocument.set({ imagePath }, { merge: true });
  };

  const handlePublish = () => {
    lectureDocument.set({ published: !lecture.published }, { merge: true });
  };

  return (
    <div>
      <h1>Lecture {lectureId}</h1>
      <DynamicForm schema={lectureSchema} data={lecture} dbItem={lectureDocument} />
      <button onClick={handlePublish}>{lecture.published ? 'Unp' : 'P'}ublish Lecture</button>
      {lecture && lecture.course && (
        <>
          <p>
            Back to <Link to={`/course/${lecture.course.id}`}>{lecture.course.title}</Link>
          </p>
          <ImageUploader
            lectureId={lectureId}
            imagePath={lecture.imagePath}
            onSuccess={updateImagePath}
          />
        </>
      )}
    </div>
  );
};

export default Lecture;
