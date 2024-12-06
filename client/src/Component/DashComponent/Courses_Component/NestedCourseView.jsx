import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdDelete } from "react-icons/md";
import Modal from '../../Common/Modal';
import { deleteSection, deleteSubSection } from '../../../Service/courseDetailAPI';
import { IoAddCircleOutline } from "react-icons/io5";
import SubSectionModal from './SubSectionModal';
import { setCourse } from '../../../Reducer/slice/courseSlice';
import { ImEnter } from "react-icons/im";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import  Spinner  from "../../Common/Spinner"

function NestedCourseView() {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSectionDelete = async (sectionID) => {
    setLoading(true)
    let result = await deleteSection({
      sectionID: sectionID,
      courseId: course._id
    }, token)
    setLoading(false)
    if (result) {
      dispatch(setCourse(result))
    }
    setModal(null);
  }

  const handleSubSectionDelete = async (subSectionId, sectionId) => {
    setLoading(true);
    const result = await deleteSubSection({
      SubSectionID: subSectionId,
      sectionID: sectionId,
      courseID: course._id
    }, token)
    setLoading(false)
    if (result) {
      dispatch(setCourse(result));
    }
    setModal(null);
  }

  return (
    <div className='w-[50vw]'>
      {loading === true ? <Spinner className="text-center"/> :
        <div className='bg-slate-700 rounded-lg p-6 m-5 '>
          {course?.courseContent?.map((section) => (
            <div key={section._id} open>
              <div className='flex item-center justify-between border-b-2 m-2'>
                <div className='flex justify-between items-center w-[50vw] '>
                  <div className='flex items-center gap-6'>
                    <ImEnter className='text-orange-500' />
                    <span className='font-serif text-xl'>{section.sectionName}</span>
                  </div>
                  <button
                    onClick={() => setModal({
                      text1: "Delete this Section",
                      text2: "It will remove all your section content",
                      btn1: "Delete",
                      btn2: "Cancel",
                      btn1Handler: () => handleSectionDelete(section._id),
                      btn2Handler: () => setModal(null)
                    })}>
                    <MdDelete className='text-2xl text-red-600' />
                  </button>
                </div>
              </div>

              <div className='ml-6 w-[35vw]'>
                {section?.subSection &&
                  section?.subSection?.map((data) => (
                    <div key={data._id} onClick={() => setViewSubSection(data)} className='flex justify-between'>
                      <div className='flex gap-6 items-center'>
                        <IoArrowRedoCircleOutline className='text-teal-500 text-xl' />
                        <span className='font-semibold text-orange-400'>{data.title}</span>
                      </div>
                      <button
                        onClick={() => setModal({
                          text1: "Delete this Sub-Section",
                          text2: "It will remove your SubSection Content",
                          btn1: "Delete",
                          btn2: "Cancel",
                          btn1Handler: () => handleSubSectionDelete(data._id, section._id),
                          btn2Handler: () => setModal(null)
                        })}>
                        <RiDeleteBinLine className='text-2xl text-red-600' />
                      </button>
                    </div>
                  ))
                }
                <button className='flex items-center gap-1 font-semibold text-yellow-400 rounded-lg border-2 p-2 m-2'
                  onClick={() => setAddSubSection(section._id)}>
                  <span>Add Lecture</span>
                  <IoAddCircleOutline />
                </button>
              </div>


            </div>
          ))}
          {modal && <Modal data={modal} />}
          {addSubSection &&
            (<SubSectionModal
              modalData={addSubSection}
              setModalData={setAddSubSection}
              add={true}
            />)
          }
        </div>
      }

    </div>
  )
}

export default NestedCourseView