import React from "react";
import "animate.css";

const IntroScreen = (props) => {
  return (
    <div className="introscreen-bg">
      <div className="introscreen animate__animated animate__zoomIn">
        <h2>Weclome to Hoya Courses!</h2>
        <h5>
          The easiest way to build your perfect schedule and find classes you
          need. Built by Reed Uhlik.
        </h5>
        <div className="introscreen-features">
          <div className="introscreen-feature animate__animated animate__zoomInUp animate__delay-1s">
            <img src="/icons/seats.svg" alt="search" />
            <div className="introscreen-feature-text">
              <h4>View Seats Remaining</h4>
              <p>
                See how many seats (and waitlist seats) are left in a class
                before you register. Don't waste your time searching for courses
                already full.
              </p>
            </div>
          </div>
          <div className="introscreen-feature animate__animated animate__zoomInUp animate__delay-1s">
            <img src="/icons/star.svg" alt="search" />
            <div className="introscreen-feature-text">
              <h4>RateMyProfessor Ratings</h4>
              <p>
                View a professor's RMP rating directly next to their name -
                click on it to go directly to their RMP page. No more multiple
                tabs.
              </p>
            </div>
          </div>
          <div className="introscreen-feature animate__animated animate__zoomInUp animate__delay-1s">
            <img src="/icons/fast.svg" alt="search" />
            <div className="introscreen-feature-text">
              <h4>Blazingly Fast</h4>
              <p>
                All interactions are instant. No more waiting for pages to load.
              </p>
            </div>
          </div>
          <div className="introscreen-feature animate__animated animate__zoomInUp animate__delay-1s">
            <img src="/icons/search.svg" alt="search" />
            <div className="introscreen-feature-text">
              <h4>Powerful Search</h4>
              <p>
                Search that just makes sense. Search by course name, professor,
                course code. Hide conflicting classes, full classes, and more.
              </p>
            </div>
          </div>
          <div className="introscreen-feature animate__animated animate__zoomInUp animate__delay-1s">
            <img src="/icons/link.svg" alt="search" />
            <div className="introscreen-feature-text">
              <h4>Professor & RMP Links</h4>
              <p>
                Click on any professor name or RMP rating to be taken to their
                webpage. Sort by RMP rating to see the best professors.
              </p>
            </div>
          </div>
          <div className="introscreen-feature animate__animated animate__zoomInUp coming-soon animate__delay-1s">
            <img src="/icons/calendar.svg" alt="search" />
            <div className="introscreen-feature-text">
              <h4>Calendar View</h4>
              <p>
                Visualize your schedule with a calendar view. Filter classes to
                hide any scheduling conflicts with your other classes.
              </p>
            </div>
          </div>
        </div>
        <button onClick={props.closeModal}>Get Started!</button>
      </div>
    </div>
  );
};

export default IntroScreen;
