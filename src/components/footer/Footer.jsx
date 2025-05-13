import './footer.css';
import "@fortawesome/fontawesome-free"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="fLists">
          <ul className="fList">
            <li className="fListItem">Countries</li>
            <li className="fListItem">Regions</li>
            <li className="fListItem">Cities</li>
            <li className="fListItem">Districts</li>
            <li className="fListItem">Airports</li>
            <li className="fListItem">Hotels</li>
          </ul>
          <ul className="fList">
            <li className="fListItem">Travel Guides</li>
            <li className="fListItem">Holiday Packages</li>
            <li className="fListItem">Customer Service</li>
            <li className="fListItem">Terms of Service</li>
            <li className="fListItem">Privacy Policy</li>
          </ul>
          <ul className="fList">
            <li className="fListItem">About Us</li>
            <li className="fListItem">Careers</li>
            <li className="fListItem">Blog</li>
            <li className="fListItem">Contact Us</li>
          </ul>
        </div>
        <div className="footer-bottom">
          <p className="fText">&copy; {new Date().getFullYear()} CodeRonBooking. All rights reserved.</p>
          <div className="social-icons">
            <a href="https://facebook.com/coderon" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/coderon" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com/coderon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;