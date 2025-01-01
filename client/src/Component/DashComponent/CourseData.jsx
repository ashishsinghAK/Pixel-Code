import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { FaRupeeSign } from "react-icons/fa";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const CourseData = ({ courses, setCourses }) => {
  return (
    <div className="flex items-center flex-col m-8 sm:justify-center">
      {/* Table for larger screens */}
      <Table className="w-full md:w-[70vw] sm:w-full border-collapse border border-gray-700 hidden sm:table">
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
              <Tr key={course._id} className="border border-gray-700">
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
                <Td className="p-4 text-left align-top hidden sm:table-cell">
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

      {/* Mobile View for small screens */}
      <div className="block sm:hidden w-full">
        {courses?.map((course) => (
          <div key={course._id} className="flex flex-col gap-4 mb-6 border-b border-gray-700 pb-6">
            <img
              src={course?.thumbNail}
              alt={course?.courseName}
              className="w-full h-[200px] rounded-lg object-cover"
            />
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-lg">{course?.courseName}</p>
              <p className="text-sm text-gray-400">
                {course?.courseDescription}
              </p>
              <p>Sections: {course?.courseContent.length}</p>
              <span className="flex items-center gap-1 text-lg">
                <FaRupeeSign />
                {course?.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseData;
