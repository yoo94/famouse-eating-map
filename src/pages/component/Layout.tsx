import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
    children : ReactNode
}

export default function Layout({children}:LayoutProps){
    return(
        <div className="layout_div">
          <Navbar />
          {children}
        </div>
    );
}