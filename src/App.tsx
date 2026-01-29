import JobPage from "./webpage/JobPage";
import HomePage from "./webpage/HomePage";
import { Navbar } from "./functions/Navbar";
import { BrowserRouter, Route, Routes } from "react-router";
import CommunityPage from "./webpage/CommunityPage";
import ReadyToMove from "./webpage/ReadyToMove";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/jobs" element={<JobPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/ready-to-move" element={<ReadyToMove />} />
            </Routes>
        </BrowserRouter>
    )
  
}

export default App;
