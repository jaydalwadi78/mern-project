import React, { useState, useLayoutEffect, useEffect } from "react";
import loadable from '@loadable/component';
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';


// ========================================
const Header = loadable(() => import('./Header'));
const Footer = loadable(() => import('./Footer'));
Header.preload();
Footer.preload();
// ============================================



export default function PublicLayout(props) {
    const location = useLocation();

    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <>
            <header className="header_wrapp fixed-top" fixed='top'>
                <Header />
            </header>
            <div className="main_wrapp">
                <Container>
                    {props.children}
                </Container>
            </div>

            <Footer />

        </>
    );
}