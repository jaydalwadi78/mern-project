import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaTwitter } from "react-icons/fa";

const Footer = () => {

    return (
        
        <div className='footer_wrapp'>
            <Container>
                <Row>
                    <Col md="12">
                        <div className='footer_box d-flex justify-content-between align-items-center flex-sm-row flex-column'>
                            <div className='copyright_content'>
                                Copyright © 2023 <span><NavLink to={"/"}>Raffle</NavLink></span> <br /> All rights reserved.
                            </div>

                            <div className='footer_menu'>
                                <ul>
                                    <li>
                                        <NavLink to={"/privacy-policy"}>Privacy Policy</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/cookie-policy"}>Cookie Policy</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/terms-and-condition"}>Terms and Conditions</NavLink>
                                    </li>
                                    <li className='twitter_icon'>
                                        <NavLink target={'_blank'} to={"https://twitter.com/upcomingraffle"}>
                                            <FaTwitter />
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}
export default Footer