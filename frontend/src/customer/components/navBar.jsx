import logo from '../../assets/logo.jpg';

/*function NavBar() {

    return(
        <>
        
        </>
    );
}

export default NavBar;
*/
import React, { useState } from 'react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (  
    <div>
      <style>
        {`
          .header-area {
            background-color: #333;
            padding: 15px 0;
            position: sticky;
            top: 0;
            width: 100%;
            z-index: 10;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
          }

          .main-nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
          }

          .logo-text {
            color: white;
            font-weight: bold;
            font-size: 1.5rem;
            min-width: 100px;
          }

          .nav-items {
            display: flex;
            align-items: center;
            gap: 30px;
            margin: 0;
            padding: 0;
            flex-grow: 1;
            justify-content: center;
            list-style: none;
          }

          .nav-item {
            color: white;
            font-weight: 500;
            cursor: pointer;
            transition: color 0.3s;
          }

          .nav-item:hover {
            color: #ffa500;
          }

          .profile-section {
            display: flex;
            align-items: center;
            gap: 20px;
          }

          .profile-name {
            color: white;
            font-weight: 500;
          }

          .logout-btn {
            color: white;
            background: none;
            border: 1px solid white;
            padding: 5px 15px;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s;
          }

          .logout-btn:hover {
            background: white;
            color: #333;
          }

          .menu-trigger {
            display: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            background: none;
            border: none;
            padding: 10px;
          }

          @media (max-width: 768px) {
            .nav-items, .profile-section {
              display: ${isMenuOpen ? 'flex' : 'none'};
              flex-direction: column;
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              background-color: #333;
              padding: 20px;
              gap: 15px;
            }

            .menu-trigger {
              display: block;
            }

            .profile-section {
              border-top: 1px solid rgba(255,255,255,0.1);
              padding-top: 15px;
              margin-top: 15px;
            }
          }
        `}
      </style>

      <header className="header-area">
        <div className="container">
          <nav className="main-nav">
            {/* Logo */}
            <div className="logo-text">
                <img src= {logo} style = {{height: "100px", width: "100px", borderRadius: "50%"}} />
            </div>

            {/* Agent List */}
            <ul className="nav-items">
              <li className="nav-item">Agent List</li>
            </ul>

            {/* Profile Section */}
            <div className="profile-section">
              <span className="profile-name">akm </span>
              <button className="logout-btn">Logout</button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="menu-trigger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default NavBar;