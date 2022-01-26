import React from 'react';
import './Content.css';
import { Route } from 'react-router-dom';
import EcosystemsSoftRestart from './Apps/Ecosystems/MesosSoftRestart/mesos-soft-restart.jsx';

function Content() {
    return (
        <div className="content">
            <div className="contentContent">
                <Route exact path='/ecosystems/service_shut_down' component={OsskDevEcosystemsShutDown} />
            </div>
        </div>
    )
};

export default Content;