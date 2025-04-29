import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { PiVideoDuotone } from "react-icons/pi";
// import { markLectureAsComplete } from "../../Service/profileAPI";

function CourseSideBar() {
  const navigate = useNavigate();
  const [videoBarActive, setVideoBarActive] = useState("");
  const [expandedSections, setExpandedSections] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { sectionId, subSectionId,courseId } = useParams();
  // const [completedVideo,setCompletedVideo] = useState(0);
  // const {token} = useSelector((state) => state.auth)
  const location = useLocation();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    const setActiveFlag = async() => {
      if (!courseSectionData.length) {
        return;
      }
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndex =
        courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
          (data) => data._id === subSectionId
        );
      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

      setVideoBarActive(activeSubSectionId);
    };
    setActiveFlag();
  }, [courseSectionData, courseEntireData, location.pathname]);

  // useEffect(() => {
  //  const  videoCompletion = async() => {
  //     if(!courseId || !subSectionId){
  //       return;
  //     }
  //     else {
  //       const res = await markLectureAsComplete({courseId: courseId.trim(), subSectionId: subSectionId.trim()},token);
  //       if(res){
  //         setCompletedVideo(res);
  //       }
  //     }
  //   }
  //   videoCompletion();
  // },[completedLectures])

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId) // Close the section
        : [...prev, sectionId] // Open the section
    );
  };

  return (
    <div className="relative">
      {/* Toggle Button for Sidebar */}
      <button
        onClick={() => setIsSidebarVisible((prev) => !prev)}
        className="block md:hidden text-yellow-500 p-3 absolute top-2 left-2 z-50"
      >
        {isSidebarVisible ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarVisible ? "block" : "hidden"
        } md:block text-white h-screen p-4 bg-slate-900 w-[75vw] md:w-[20vw] fixed md:relative z-40 overflow-y-auto`}
      >
        <div>
          {/* <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex items-center gap-2 border-2 p-2 text-yellow-500 font-semibold rounded-lg hover:bg-yellow-500 hover:text-slate-900 transition"
          >
            <IoChevronBackCircleSharp size={20} />
            <span>Back</span>
          </button> */}

          <div className="mt-4">
            <h1 className="text-xl font-bold">{courseEntireData?.courseName}</h1>
            {/* <p className="text-sm text-gray-400">
              {completedVideo || 0}/{totalNoLectures} completed
            </p> */}
          </div>

          <div className="mt-6 space-y-4">
            {courseSectionData &&
              courseSectionData.map((section, index) => (
                <div key={index}>
                  <div
                    onClick={() => toggleSection(section?._id)}
                    className="flex items-center justify-between p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition"
                  >
                    <span className="font-semibold">{section?.sectionName}</span>
                    <IoIosArrowDropupCircle
                      size={20}
                      className={`transition-transform ${
                        expandedSections.includes(section?._id)
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </div>

                  {expandedSections.includes(section?._id) && (
                    <div className="mt-2 space-y-2 pl-4">
                      {section?.subSection &&
                        section?.subSection.map((subSection, subIndex) => (
                          <div
                            key={subIndex}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                              videoBarActive === subSection?._id
                                ? "bg-slate-600 font-semibold"
                                : "bg-slate-900 hover:bg-slate-800"
                            } transition`}
                            onClick={() => {
                              navigate(
                                `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subSection?._id}`
                              );
                              setVideoBarActive(subSection?._id);
                            }}
                          >
                            {/* <input
                              type="checkbox"
                              checked={
                                Array.isArray(completedLectures) &&
                                completedLectures.includes(subSection?._id)
                              }
                              onChange={() => {}}
                            /> */}
                            <FaArrowUpRightFromSquare className="text-yellow-500"/>
                            <span className="text-sm">{subSection?.title}</span>
                            <PiVideoDuotone className="text-red-500"/>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseSideBar;
