import logo from '../../assets/logo.jpg';

function NavBar() {

    return(
        <>
        
        <header className="header-area header-sticky bg-[#f6a32f]">
            <div className="container">
                <div className="row">
                    <div className="col-12" style = {{display: "inline"}}>    
                        <nav className="main-nav" style = {{display: "flex", flexWrap: "wrap"}}>
                            {/* Profile Icon */}
                        
                            {/* <!-- ***** Logo Start ***** --> */}
                            <img src = {logo} alt = "logo" style={{borderRadius: "50%", width: 100, height: 100, background: "white", display: "block"}} />
                            {/* <!-- ***** Logo End ***** -->
                            // <!-- ***** Menu Start ***** --> */}
                            <ul id="nav">
                                <li>Home</li>
                                <li>New Reads</li>
                                <li>The Team</li>
                                <li>Previous Editions</li>
                                <li>Reach Us</li>
                            </ul>
                            {/* <!-- ***** Menu End ***** --> */}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
        </>
    );
}

export default NavBar;
/*

/*
logo
agents_list
profile "pic" and name
logout 
*/


/*
<header className="header-area header-sticky">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="main-nav">
                        <!-- ***** Logo Start ***** -->
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Tilt+Neon&display=swap');
                          </style>
                        <a href="index.html" className="logo" style="font-family: 'Tilt Neon', sans-serif;">
                            8Bit
                        </a>
                        <!-- ***** Logo End ***** -->
                        <!-- ***** Menu Start ***** -->
                        <ul className="nav">
                            <li className="scroll-to-section"><a href="#welcome" className="menu-item active">Home</a></li>
                            <li className="scroll-to-section"><a href="#about" className="menu-item">New Reads</a></li>
                            <li><a href="./team/team.html">The Team</a>
                            </li><li>
                                <a href="./magazinePage/mag.html">Previous Editions</a>
                            </li>
                            <li className="scroll-to-section"><a href="#contact-us" className="menu-item">Reach Us</a></li>
                        </ul>
                        <a className="menu-trigger">
                            <span>Menu</span>
                        </a>
                        <!-- ***** Menu End ***** -->
                    </nav>
                </div>
            </div>
        </div>
    </header>
*/ 
