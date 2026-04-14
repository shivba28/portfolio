import React from 'react';
import { Modal } from 'react-bootstrap';
import img1 from '../../../assets/Images/about1.png';
import './AboutModal.css';

export const AboutModal = ({ show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      animation
      className="about-modal-nb"
      backdropClassName="about-modal-nb-backdrop"
    >
      <Modal.Body className="p-0">
        <div className="about-modal-inner">
          <div className="about-modal-header">
            <span className="about-modal-num">00</span>
            <h2 className="about-modal-title">
              About <span className="about-modal-accent">Me</span>
            </h2>
            <button
              type="button"
              className="about-modal-close"
              onClick={handleClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="about-modal-body">
            <div className="about-modal-text">
              <p>
                Hey there! I&apos;m{' '}
                <strong
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: '22px',
                    color: '#3BCEAC',
                    fontStyle: 'italic',
                  }}
                >
                  Shivba
                </strong>
                , a software developer by day and a bug-squasher by night. I
                spend my time wrestling with code, upgrading websites, and
                making sure your apps load faster than your morning coffee,
                because trust me, I drink a lot of coffee.
              </p>
              <p>
                I&apos;ve successfully migrated many large scale web apps, which
                makes me wonder why my own website still takes forever to load.
              </p>
              <p>
                I&apos;m fluent in Python, JavaScript, C#, and a bunch of other
                techie stuff that makes websites work smoothly (most of the
                time). I&apos;ve even dabbled in making APIs, and yes, it&apos;s
                as nerdy as it sounds.
              </p>
              <p>
                In short: I build things, break things (occasionally), and try
                to make the web a better place, one API call (and coffee cup)
                at a time!
              </p>
            </div>

            <div className="about-modal-images">
              <img src={img1} alt="Shivba" className="about-modal-img" />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
