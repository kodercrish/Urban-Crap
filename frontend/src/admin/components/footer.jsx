import logo from '../../assets/logo.jpg';

function Footer() {
    return (
        <footer className="bg-[#f6a32f] p-1 __className_8cc72f">
        <div className="w-full max-w-screen-xl mx-auto p-0 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse" href="/">
              <img src={logo} className="h-10" alt="Urban Crap Logo" style={{borderRadius: "50%", background: "#f6a32f", display: "block"}}/>
              <span className="__className_37c115 self-center text-2xl font-semibold whitespace-nowrap text-[#f8f0e5]">Urban Crap</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-[#f8f0e5] sm:mb-0">
              <li>
                <a href="" className="hover:underline me-4 md:me-6">About Us</a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-[#f8f0e5] sm:mx-auto lg:my-8"/>
          <span className="block text-sm text-[#f8f0e5] sm:text-center">
            © 2024 <a className="hover:underline me-4 md:me-6" href="/">Urban Crap™</a> All Rights Reserved
          </span>
        </div>
      </footer>
    );
  }
  
  export default Footer;