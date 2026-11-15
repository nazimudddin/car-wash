import { NavbarDesignOne } from '@/components/shered/Navbar';
import React from 'react';

const RootLayoutPage = ({ children }:{children: React.ReactNode}) => {
    return (
        <div>
      <NavbarDesignOne></NavbarDesignOne>
            {children}
        </div>
    );
};

export default RootLayoutPage;