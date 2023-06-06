import React from 'react';
import { Row } from 'react-bootstrap';

import UserProfile from './UserProfile';
import UsersTabs from './UsersTabs';

const UserMain = () => {
    return (

        <Row className='justify-content-center'>
            <UserProfile />
            <UsersTabs />
        </Row>
        
    )
}

export default UserMain;