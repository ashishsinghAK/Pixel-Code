import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { FaRupeeSign } from "react-icons/fa";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const CourseData = ({ courses, setCourses }) => {
  return (
    <div className="flex items-center flex-col m-8 sm:justify-center">
      <Table className="w-full md:w-[70vw] sm:w-full border-collapse border border-gray-700">
        <Thead>
          <Tr className="bg-gray-800 text-white">
            <Th className="p-4 text-left border border-gray-700">Courses</Th>
            <Th className="p-4 text-left border border-gray-700">Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td colSpan={2} className="text-center p-4">
                No Course Found
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr key={course._id} className="border border-gray-700 ">
                {/* Course Details */}
                <Td className="flex flex-col md:flex-row items-center p-2 m-10 gap-4">
                  <img
                    src={course?.thumbNail}
                    alt={course?.courseName}
                    className="h-[140px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold">Title: {course?.courseName}</p>
                    <p className="text-sm text-gray-400">
                      Description: {course?.courseDescription}
                    </p>
                    <p>Sections: {course?.courseContent.length}</p>
                  </div>
                </Td>

                {/* Course Price */}
                <Td className="p-4 text-left align-top">
                  <span className="flex items-center gap-1 text-lg">
                    <FaRupeeSign />
                    {course?.price}
                  </span>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </div>
  );
};

export default CourseData;
