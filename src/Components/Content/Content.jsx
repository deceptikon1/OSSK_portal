import React from 'react';
import './Content.css';
import { Route } from 'react-router-dom';
import OsskDevToolsCertificates from './Apps/OsskDevToolsCertificates/OsskDevToolsCertificates.jsx'
import OsskDevToolsNetworkCsv from './Apps/OsskDevToolsNetworkCsv/OsskDevToolsNetworkCsv.jsx';
import OsskDevEcosystemsShutDown from './Apps/OsskDevEcosystemsShutDown/OsskDevEcosystemsShutDown.jsx';
import OsskDevToolsNetworkCsvArchive from './Apps/OsskDevToolsNetworkCsvArchive/OsskDevToolsNetworkCsvArchive.jsx';
import OsskDevToolsGenerateCertificates from './Apps/OsskDevToolsGenerateCertificate/OsskDevToolsGenerateCertificate.jsx';
import EcosystemsSoftRestart from './Apps/Ecosystems/MesosSoftRestart/mesos-soft-restart.jsx';
import OsskDevToolsCheckNetworkAccess from './Apps/OsskDevToolsCheckNetworkAccess/OsskDevToolsCheckNetworkAccess.jsx';
import TimeSheetManual from './Apps/TimeSheet/Manual/Manual.jsx';
import TimeSheetAuto from './Apps/TimeSheet/Auto/Auto.jsx';

function Content() {
    return (
        <div className="content">
            <div className="contentContent">
                <Route exact path='/tools/storage_certificate' component={OsskDevToolsCertificates} />
                <Route exact path='/tools/generate_csv_netaccess' component={OsskDevToolsNetworkCsv} />
                <Route exact path='/tools/storage_csv_netaccess' component={OsskDevToolsNetworkCsvArchive} />
                <Route exact path='/tools/generate_certificate' component={OsskDevToolsGenerateCertificates} />
                <Route exact path='/tools/check_net_access' component={OsskDevToolsCheckNetworkAccess} />

                <Route exact path='/ecosystems/service_shut_down' component={OsskDevEcosystemsShutDown} />
                <Route exact path='/ecosystems/soft_restart' component={EcosystemsSoftRestart} />

                <Route exact path='/timesheet/manual' component={TimeSheetManual} />
                <Route exact path='/timesheet/auto' component={TimeSheetAuto} />
            </div>
        </div>
    )
};

export default Content;