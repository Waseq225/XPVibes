import Header from "./Header";
import { Outlet } from "react-router-dom";
import IndexPage from "./pages/indexPage";

export default function Layout() {
    return (
        <div className="p-4 flex flex-col min-h-screen">
            <Header />
            <IndexPage />
            <Outlet />
        </div>
    );
}