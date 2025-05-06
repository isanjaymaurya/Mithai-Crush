import { Route, BrowserRouter, Routes } from "react-router-dom";

import HomePage from "./routes/HomePage/HomePage";
import LevelPage from "./routes/LevelPage/LevelPage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/level/:levelNo" element={<LevelPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes