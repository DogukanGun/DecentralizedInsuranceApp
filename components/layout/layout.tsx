import React, { ReactNode } from 'react';
import CustomNavbar from "../navbar/navbar"
interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <CustomNavbar/>
            <main>{children}</main>
        </div>
    );
};

export default Layout;