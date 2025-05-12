import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { PiVideoDuotone } from "react-icons/pi";

function CourseSideBar() {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const [videoBarActive, setVideoBarActive] = useState("");
  const [expandedSections, setExpandedSections] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const { sectionId, subSectionId, courseId } = useParams();
  const location = useLocation();

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    if (!courseSectionData.length) return;

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
  }, [courseSectionData, courseEntireData, location.pathname]);

  // Click outside to close sidebar (mobile only)
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isSidebarVisible &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isSidebarVisible]);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsSidebarVisible((prev) => !prev)}
        className="md:hidden fixed top-4 left-4 z-50 bg-yellow-500 p-2 rounded-full text-black shadow-lg"
      >
        {isSidebarVisible ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* Overlay on mobile */}
      {isSidebarVisible && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:relative top-0 left-0 z-50 bg-slate-900 text-white w-[75vw] md:w-[20vw] h-full p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          <h1 className="text-xl font-bold mb-1">{courseEntireData?.courseName}</h1>
          {/* <p className="text-sm text-gray-400">{completedLectures.length}/{totalNoLectures} completed</p> */}
        </div>

        <div className="mt-6 space-y-4">
          {courseSectionData &&
            courseSectionData.map((section, index) => (
              <div key={index}>
                <div
                  onClick={() => toggleSection(section?._id)}
                  className="flex items-center justify-between p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition"
                >
                  <span className="font-semibold text-sm">{section?.sectionName}</span>
                  <IoIosArrowDropupCircle
                    size={20}
                    className={`transition-transform ${
                      expandedSections.includes(section?._id) ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {expandedSections.includes(section?._id) && (
                  <div className="mt-2 space-y-2 pl-4">
                    {section?.subSection &&
                      section?.subSection.map((subSection, subIndex) => (
                        <div
                          key={subIndex}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer text-sm ${
                            videoBarActive === subSection?._id
                              ? "bg-slate-600 font-semibold"
                              : "bg-slate-900 hover:bg-slate-800"
                          } transition`}
                          onClick={() => {
                            navigate(
                              `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subSection?._id}`
                            );
                            setVideoBarActive(subSection?._id);
                            setIsSidebarVisible(false); // auto close on mobile
                          }}
                        >
                          <FaArrowUpRightFromSquare className="text-yellow-500" />
                          <span>{subSection?.title}</span>
                          <PiVideoDuotone className="text-red-500" />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default CourseSideBar;
