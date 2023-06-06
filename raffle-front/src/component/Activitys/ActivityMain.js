import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
    UserSelector,
    getActivities,
    clearMessage,
} from "../../store/reducers/userSlice";
import ActivityRegister from "./ActivityRegister";

const ActivityMain = () => {
    const dispatch = useDispatch();
    const { user_id, activities, isactivityLoading, isactivitySuccess } =
        useSelector(UserSelector);

    useEffect(() => {
        if (user_id) {
            dispatch(
                getActivities({
                    userid: user_id,
                })
            );
        }
    }, [user_id]);

    return (
        <Row className="justify-content-center">
            <Col md="10" lg="9" xl="8">
                <div className="main_heading text-center">
                    <h1>Activity</h1>
                    <p>
                        You can find out about the ongoing raffle registration
                        here. You can check out which raffles are currently
                        getting a lot of registration here. Follow us on Twitter
                        and join Discord for more information.
                    </p>
                </div>
            </Col>

            <ActivityRegister
                activities={activities}
                isactivityLoading={isactivityLoading}
                isactivitySuccess={isactivitySuccess}
            />
        </Row>
    );
};

export default ActivityMain;
