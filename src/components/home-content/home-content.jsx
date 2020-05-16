import React from 'react';
import Router from '../../routers/routers';

export default class HomeContent extends React.Component {
    render() {
        return (
            <div className="content_body">
                <div className="content_container">
                    <Router />
                </div>
            </div>
        )
    }
}