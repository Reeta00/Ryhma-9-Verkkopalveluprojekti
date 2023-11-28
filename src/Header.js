// Dynamic Header
import React from 'react';
import './Style.css'; // Import the CSS file for styling

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/productList">Novellinurkka </a>
          <button
            className="navbar-toggler"
            type="button"
            // Tämä korvaa data-toggle ja data-target
            onClick={() => document.getElementById('navbarScroll').classList.toggle('show')}
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarScroll">
            <ul
              className="navbar-nav my-2 my-lg-0 navbar-nav-scroll"
              style={{ '--bs-scroll-height': '100px' }}
            >
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/productList">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/categories">Kategoriat</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin">Ylläpito</a>
              </li>
              <li className="nav-item">
                {/* Container for the cart icon */}
                <div className="navbar-nav">
                  {/* Wrap the SVG in an anchor tag with the desired link */}
                  <a href="/cart" className="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;


