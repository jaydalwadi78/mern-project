import React, {} from 'react';
import { Col } from 'react-bootstrap';
import { Tabs } from 'antd';

import UsersCompetitions from './UsersCompetitions';
import UsersWins from './UsersWins';

const onChange = (key) => {
    console.log(key);
};

const UsersTabs = () => {

    return (
        
        <Col md="12">
            <div className='users_wrapp'>
                <Tabs
                    defaultActiveKey="1"
                    onChange={onChange}
                    items={[
                        {
                            label: 'Competitions Entered',
                            key: '1',
                            children: (
                                <UsersCompetitions />
                            ),
                        },
                        {
                            label: 'Wins',
                            key: '2',
                            children: (
                                <UsersWins />
                            ),
                        },
                    ]}
                />
            </div>
        </Col>
        
    )
}

export default UsersTabs;