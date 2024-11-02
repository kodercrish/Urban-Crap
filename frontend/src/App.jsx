import AdminHome from "./admin/webPages/home/page.jsx";
import CustomerHome from "./customer/webPages/home/page.jsx";

function App() {
  return (
    <>
      <AdminHome />
      <hr style={{ border: '1px solid black', margin: '20px 0' }} />
      <CustomerHome />
    </>
  );
}

export default App;