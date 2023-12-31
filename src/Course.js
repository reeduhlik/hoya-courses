import React from "react";
import "animate.css";

import { FaExpand, FaPlus } from "react-icons/fa6";

const Course = ({
  course,
  func,
  hoverFunc,
  unhoverFunc,
  showAttributes,
  showInfo,
  showInfoToggle,
}) => {
  const getTimeString = () => {
    let str = "";
    let empty = false;
    for (let i = 0; i < course.meetingsFaculty.length; i++) {
      if (course.meetingsFaculty[i].meetingTime.beginTime == "") {
        empty = true;
      }
      str +=
        formatTimeFromMilitary(
          course.meetingsFaculty[i].meetingTime.beginTime
        ) +
        " - " +
        formatTimeFromMilitary(course.meetingsFaculty[i].meetingTime.endTime);
      if (i < course.meetingsFaculty.length - 1) {
        str += ", ";
      }
    }
    if (str.length === 0 || str === " - " || empty) {
      str = "TBA";
    }
    return str;
  };

  const formatTimeFromMilitary = (time) => {
    if (!time) {
      return "";
    }
    const hour = time.substring(0, 2);
    const minute = time.substring(2, 4);
    const formattedHour = hour % 12 || 12;
    const ampm = hour < 12 ? "AM" : "PM";
    return formattedHour + ":" + minute + " " + ampm;
  };

  const formatTitle = (title) => {
    return title.replace(/&amp;/g, "&");
  };

  const formatDaysString = () => {
    let str = "";
    for (let i = 0; i < course.meetingsFaculty.length; i++) {
      if (course.meetingsFaculty[i].meetingTime.monday) {
        str += "M";
      }
      if (course.meetingsFaculty[i].meetingTime.tuesday) {
        str += "T";
      }
      if (course.meetingsFaculty[i].meetingTime.wednesday) {
        str += "W";
      }
      if (course.meetingsFaculty[i].meetingTime.thursday) {
        str += "Th";
      }
      if (course.meetingsFaculty[i].meetingTime.friday) {
        str += "F";
      }
      if (i < course.meetingsFaculty.length - 1) {
        str += ", ";
      }
    }

    if (str.length == 0) {
      str = "TBA";
    }

    return str;
  };

  const getCreditHours = () => {
    if (course.creditHours != null) {
      return course.creditHours + " Credits";
    } else if (course.creditHourHigh != null) {
      return course.creditHourHigh + " Credits";
    } else if (course.creditHourLow != null) {
      return course.creditHourLow + " Credits";
    } else {
      return "TBA";
    }
  };

  return (
    <div
      className="course animate__animated animate__fadeIn animate__faster"
      onMouseEnter={hoverFunc}
      onMouseLeave={unhoverFunc}>
      <div className="course-top">
        <div className="course-top-left">
          <h3>
            {course.subjectCourse}-{course.sequenceNumber}
          </h3>
        </div>
        <h5>CRN: {course.courseReferenceNumber}</h5>
      </div>
      <h2>{formatTitle(course.courseTitle)}</h2>
      <h6>{getCreditHours()}</h6>
      {showInfoToggle && (
        <div className="course-icons">
          <div className="course-icon">
            <img src="/icons/instructor.svg" alt="instructor" />

            <a
              target="_blank"
              rel="noreferrer"
              href={
                "https://gufaculty360.georgetown.edu/s/global-search?searchText=" +
                encodeURIComponent(course.faculty[0]?.displayName)
              }>
              {course.faculty.length > 0
                ? course.faculty[0].displayName
                : "Not Available"}
            </a>
          </div>

          <div className="course-icon">
            <img src="/icons/star.svg" alt="rating" />
            <a
              target="_blank"
              rel="noreferrer"
              href={
                "https://www.ratemyprofessors.com/search/professors/355?q=" +
                encodeURIComponent(course.faculty[0]?.displayName)
              }>
              {course.faculty.length > 0 ? course.rating : "N/A"}

              {course.rating !== "N/A" && course.rating >= 4 && (
                <div className="color-circle-green"></div>
              )}
              {course.rating !== "N/A" &&
                course.rating < 4 &&
                course.rating >= 3 && (
                  <div className="color-circle-yellow"></div>
                )}
              {course.rating !== "N/A" && course.rating < 3 && (
                <div className="color-circle-red"></div>
              )}
            </a>
          </div>
          <div className="course-icon">
            <img src="/icons/seats.svg" alt="Seats" />

            <p>
              <span className="large-text">{course.seatsAvailable}</span>
              <span className="small-text">
                {"/" + course.maximumEnrollment}{" "}
              </span>
              Left
            </p>
            <p>
              <span className="large-text">{course.waitAvailable}</span>
              <span className="small-text">{"/" + course.waitCapacity} </span>
              WL
            </p>
          </div>
          <div className="course-icon">
            <img src="/icons/location.svg" alt="location" />
            <p>
              {course.meetingsFaculty.length > 0 &&
              course.meetingsFaculty[0].meetingTime.building
                ? course.meetingsFaculty[0].meetingTime.building +
                  "-" +
                  course.meetingsFaculty[0].meetingTime.room
                : "TBA"}
            </p>
          </div>

          <div className="course-icon">
            <img src="/icons/time.svg" alt="time" />
            <p>{getTimeString()}</p>
          </div>
          <div className="course-icon">
            <img src="/icons/days.svg" alt="Days" />
            <p>{formatDaysString()}</p>
          </div>
        </div>
      )}
      {course.seatsAvailable > 0 &&
        course.seatsAvailable < 4 &&
        course.waitCount > 3 && (
          <div className="course-alert">
            <img src="/icons/alert.svg" alt="alert" />
            <p>Open seat(s) likely reserved for WL.</p>
          </div>
        )}
      {course.seatsAvailable === 0 && (
        <div className="course-warning">
          <img src="/icons/alert.svg" alt="alert" />
          <p>Course is full :(</p>
        </div>
      )}
      {showAttributes && (
        <div className="course-attributes">
          {course.sectionAttributes.length > 0 &&
            course.sectionAttributes.map((attribute) => {
              if (attribute.code !== "MEAN") {
                return <p className="course-attribute">{attribute.code}</p>;
              }
            })}
        </div>
      )}
      <div className="course-buttons">
        <button className="course-button-more" onClick={() => showInfo(course)}>
          <FaExpand />
        </button>
        <button className="course-button" onClick={func}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Course;
