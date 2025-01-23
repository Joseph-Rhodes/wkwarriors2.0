import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>Team</h4>
            <ul className="list-unstyled">
              <li><Link to="/roster">Roster</Link></li>
              <li><Link to="/stats">Stats</Link></li>
              <li><Link to="/team-records">Team Records</Link></li>
            </ul>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Schedule</h4>
            <ul className="list-unstyled">
              <li><Link to="/schedule">Schedule</Link></li>
            </ul>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>News</h4>
            <ul className="list-unstyled">
              <li><Link to="/latest-news">Latest News</Link></li>
            </ul>
          </div>
          {/* Column4 */}
          <div className="col">
            <h4>Media</h4>
            <ul className="list-unstyled">
              <li><Link to="/photos">Photos</Link></li>
              <li><Link to="/videos">Videos</Link></li>
            </ul>
          </div>
          {/* Column5 */}
          <div className="col">
            <h4>Connect</h4>
            <ul className="list-unstyled social">
              <li>
                <Link to="/contact">
                  <i className="far fa-envelope"></i>
                </Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/warriorswk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@warriorswk"
                  target="_blank"
                  rel="noopener noreferrer">
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} West Kirby Warriors | All rights
            reserved | Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
