import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Feature from "./pages/Feauture";

import AddCourse from "./pages/Addcourse";
import EditCourse from "./pages/Editcourse";
import SingleCourse from "./pages/Singelcourse";



const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />

         

          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/edit-course/:id" element={<EditCourse />} />
          <Route path="/course/:id" element={<SingleCourse />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/f" element={<Feature />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
};

export default App;