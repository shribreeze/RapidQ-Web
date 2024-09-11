import React, { useEffect, useState, useRef } from 'react';
import './OurTeam.css';

const OurTeam = () => {
  const [visible, setVisible] = useState(false);
  const teamSectionRef = useRef(null);
  const sameerVideoRef = useRef(null);
  const atharvVideoRef = useRef(null);
  const divyanshuVideoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Reset and play videos when section becomes visible
          [sameerVideoRef, atharvVideoRef, divyanshuVideoRef].forEach(ref => {
            if (ref.current) {
              ref.current.currentTime = 0;
              ref.current.play();
            }
          });
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    if (teamSectionRef.current) {
      observer.observe(teamSectionRef.current);
    }

    return () => {
      if (teamSectionRef.current) {
        observer.unobserve(teamSectionRef.current);
      }
    };
  }, []);

  return (
    <div className="team-container" ref={teamSectionRef}>
      <h1 className="team-heading">Meet the QuickQ Team</h1>
      
      <div className="team-lineup">
        {/* Sameer */}
        <div className={`team-member ${visible ? 'enter' : ''}`}>
          <video
            ref={sameerVideoRef}
            autoPlay
            muted
            className="team-member-video"
          >
            <source src="sameerVid.mp4" type="video/mp4" />
          </video>
          <div className="team-member-info">
            <h3>Sameer Gautam</h3>
            <p>Founder & Frontend Developer</p>
          </div>
        </div>

        {/* Atharv */}
        <div className={`team-member ${visible ? 'enter' : ''}`}>
          <video
            ref={atharvVideoRef}
            autoPlay
            muted
            className="team-member-video"
          >
            <source src="atharvVid.mp4" type="video/mp4" />
          </video>
          <div className="team-member-info">
            <h3>Atharv Virmani</h3>
            <p>Co-Founder & Mobile App Developer</p>
          </div>
        </div>

        {/* Divyanshu */}
        <div className={`team-member ${visible ? 'enter' : ''}`}>
          <video
            ref={divyanshuVideoRef}
            autoPlay
            muted
            className="team-member-video"
          >
            <source src="divyanshuVid.mp4" type="video/mp4" />
          </video>
          <div className="team-member-info">
            <h3>Divyanshu Agarwal</h3>
            <p>Co-Founder & Backend Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
