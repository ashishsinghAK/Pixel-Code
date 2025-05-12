import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import Spinner from "../Common/Spinner";

function VideoSection() {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef();

  const {
    courseSectionData,
    courseEntireData
  } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    if (!courseSectionData || courseSectionData.length === 0) return;
    if (!courseId || !sectionId || !subSectionId) {
      navigate("/dashboard/enrolled-courses");
      return;
    }

    const section = courseSectionData.find(
      (s) => String(s._id).trim() === String(sectionId).trim()
    );

    if (!section) return;

    const subSection = section.subSection.find(
      (s) => String(s._id).trim() === String(subSectionId).trim()
    );

    if (subSection) {
      setVideoData(subSection);
    }
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-900 p-4">
      {courseSectionData.length === 0 ? (
        <Spinner />
      ) : !videoData ? (
        <div className="text-white text-xl">No Lecture Found</div>
      ) : (
        <div className="w-full max-w-5xl aspect-video rounded overflow-hidden shadow-lg border border-gray-700">
          <Player
            ref={playerRef}
            playsInline
            fluid={true}
            src={videoData.videoUrl}
            className="w-full h-full"
          />
        </div>
      )}
    </div>
  );
}

export default VideoSection;
