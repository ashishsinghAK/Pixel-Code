import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
// import { updateCompletedLectures } from '../../Reducer/slice/viewCourseSlice'
// import { markLectureAsComplete } from "../../Service/profileAPI"
import { Player } from "video-react"
// import '~video-react/dist/video-react.css';
import { FaPlay } from "react-icons/fa";
import Spinner from "../Common/Spinner"

function VideoSection() {

  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoLectures
  } = useSelector((state) => state.viewCourse);
  const {token} = useSelector((state) => state.auth);

  const [videoData, setVideoData] = useState([])
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const videoSpecificData = () => {
      if (!courseSectionData || courseSectionData.length == 0) {
        return;
      }
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses")
        return
      }
      else {
        // console.log('course section data',courseSectionData)
        // console.log('section id',sectionId)
        // console.log('sub sectionId',subSectionId)

        const filteredData =
          courseSectionData.filter((section) => String(section._id).trim() === String(sectionId).trim())
        // console.log('filtered data',filteredData)
        if (!filteredData || filteredData.length === 0) {
          return;
        }

        const filteredVideoData =
          filteredData?.[0].subSection?.filter((data) => String(data._id).trim() === String(subSectionId).trim());
        if (!filteredVideoData || filteredVideoData.length === 0) {
          return;
        }
        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      }
    }
    videoSpecificData();
  }, [courseSectionData, courseEntireData, location.pathname])



  // const handleLectureCompletion = async () => {
  //   setLoading(true)
  //   const res = await markLectureAsComplete({ courseId: courseId.trim(), subSectionId: subSectionId.trim() }, token);
  //   // update the state in redux store
  //   if (res) {
  //     if(!completedLectures.includes(subSectionId.trim())){
  //       dispatch(updateCompletedLectures(subSectionId.trim()))
  //     }
  //   }
  //   setLoading(false);
  // }

  return (
    <div className="text-white h-[100vh] overflow-hidden w-[80vw] border object-fill p-4">
      {
        courseSectionData.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <Spinner />
          </div>
        ) : (
          !videoData ? (
            <div>No Lecture Found</div>
          ) : (
            <div className="h-full relative overflow-hidden rounded-md">
              <Player
                ref={playerRef}
                aspectRatio="16/9"
                playsInline
                // onEnded={() => {
                //   handleLectureCompletion()
                // }}
                src={videoData?.videoUrl}
                className="w-full h-full"
              >
                <FaPlay />
                {/* {
                  videoEnded && (
                    <div className="absolute bottom-4 left-4 text-white z-50 p-2 rounded">
                      {
                        Array.isArray(completedLectures) &&
                        !completedLectures.includes(subSectionId) && (
                          <button
                            disabled={loading}
                            onClick={() => handleLectureCompletion()}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                          >
                            Mark as Completed
                          </button>
                        )
                      }
                    </div>
                  )
                } */}
              </Player>
            </div>
          )
        )
      }
    </div>
  )
}

export default VideoSection