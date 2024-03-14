import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    return (
        <>
            <Header></Header>
            <div className="App w-full p-5 flex flex-col items-center gap-3">
                <Outlet></Outlet>
            </div>
        </>
    );
}
 
export default Layout;