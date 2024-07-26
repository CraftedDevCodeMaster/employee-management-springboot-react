import "./App.css";
import EmployeeComponent from "./components/EmployeeComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/headerComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewEmployee from "./components/ViewEmployee";
function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* http://localhost:3000/employee */}
          <Route path="/employee" element={<ListEmployeeComponent />}></Route>
          {/* http://localhost:3000/new-employee */}
          <Route path="/new-employee" element={<EmployeeComponent />}></Route>
          {/* http://localhost:3000/update-employee/1 */}
          <Route path="/update-employee/:id" element={<EmployeeComponent />}></Route>
           {/* http://localhost:3000/view-employee */}
           <Route path="/view-employee/:id" element={<ViewEmployee />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
