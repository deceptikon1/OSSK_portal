import React, { useState, useEffect, useMemo } from 'react'
import './mesos-soft-restart.css'
import { mongodb_host } from '../../../../../db.js';
import { ReactComponent as MarathonGroupIcon } from '../../../../../SvgFiles/marathon_group_icon.svg';
import { ReactComponent as MarathonAppIcon } from '../../../../../SvgFiles/marathon_app_icon.svg';
import { ReactComponent as RestartIcon } from '../../../../../SvgFiles/restart_icon.svg';

 const MesosSoftRestart = () => {
    const [menuItem, setMenuItem] = useState({ "host": "ossk-master1", "userName": "ossk", "password": "Risk1234" });
    const [appList, setAppList] = useState([]);

    useEffect(() => {
        fetch(mongodb_host + '/api/marathon/get_groups?host=' + menuItem["host"] +
            '&userName=' + menuItem["userName"] +
            '&password=' + menuItem["password"])
            .then(result => result.json())
            .then(json => {
                setAppList(json);
            })
    }, [menuItem["host"]]);

    console.log("MesosSoftRestart");

    return (
        <div className="app" >
            <div className="app_title">Рестарт приложений (soft)</div>

            <div className="mesos_soft_restart">
                <div className="mesos_soft_restart_menu">
                    <div onClick={(e) => setMenuItem({ "host": "ossk-master1", "userName": "ossk", "password": "Risk1234" })}>ossk-master</div>
                    <div onClick={(e) => setMenuItem({ "host": "mbmesosm4", "userName": "ossk", "password": "Risk1234" })}>mb-app</div>
                    <div>onlc-int</div>
                </div>

                <div className="mesos_soft_restart_list">
                    {/* {appList} */}
                    <Groups groups={appList} width={100}></Groups>
                </div>
            </div>
        </div>
    )
}

// function CreateDivList(list = [], width = 100) {
//     let divList = [];
//     list.forEach(elem => {
//         divList.push((<div key={elem["id"]} className="mesos_soft_restart_list_group">
//             <div style={{ width: width + "%", height: "4.2vh" }} className="mesos_soft_restart_list_item">
//                 <div style={{marginTop: "3px", height: "65%"}}><MarathonGroupIcon /></div>
//                 <div style={{marginBottom: "2px"}}>{elem["id"]}</div>
//                 <div className="mesos_soft_restart_list_item_restartButton"><RestartIcon /></div>
//             </div>
//             {elem.hasOwnProperty("groups") ? CreateDivList(elem["groups"], width - 1) : null}
//             {elem.hasOwnProperty("apps") ? <div className="mesos_soft_restart_list_group">
//                 {elem["apps"].map((app) => {
//                     return (
//                         <div key={app["id"]} style={{ width: width - 1 + "%", height: "3.4vh" }} className="mesos_soft_restart_list_item">
//                             <div style={{height: "73%"}}><MarathonAppIcon /></div>
//                             <div style={{marginBottom: "2px"}}>{app["id"]}</div>
//                             <div className="mesos_soft_restart_list_item_restartButton"><RestartIcon /></div>
//                         </div>)
//                 })}
//             </div> : null}
//         </div>
//         ))
//     })
//     return divList;
// };

const Groups = (props) => {
    return (
        <>
            {
                props.groups.map(elem => {
                    return (
                        <div key={elem["id"]} className="mesos_soft_restart_list_group">
                            <div style={{ width: props.width + "%", height: "4.2vh" }} className="mesos_soft_restart_list_item">
                                <div style={{ marginTop: "3px", height: "65%" }}><MarathonGroupIcon /></div>
                                <div style={{ marginBottom: "2px" }}>{elem["id"]}</div>
                                <div className="mesos_soft_restart_list_item_restartButton"><RestartIcon /></div>
                            </div>
                            {
                                elem.hasOwnProperty("groups") ?
                                    <Groups groups={elem["groups"]} width={props.width - 1}></Groups>
                                    : null
                            }
                            {elem.hasOwnProperty("apps") ? <div className="mesos_soft_restart_list_group">
                                {elem["apps"].map((app) => {
                                    return (
                                        <div key={app["id"]} style={{ width: props.width - 1 + "%", height: "3.4vh" }} className="mesos_soft_restart_list_item">
                                            <div style={{ height: "73%" }}><MarathonAppIcon /></div>
                                            <div style={{ marginBottom: "2px" }}>{app["id"]}</div>
                                            <div className="mesos_soft_restart_list_item_restartButton"><RestartIcon /></div>
                                        </div>)
                                })}
                            </div> : null}
                        </div>
                    )
                })
            }
        </>
    )
};


function RestartGroup(groupName) {
    fetch(mongodb_host + '/api/mongodb/find', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'uri': "mongodb://ossk-node1:27018/replicaSet%3Dossk_replset?replicaSet=ossk_replset",
            'database': "osskportal",
            'collection': "GroupsAndApps",
            'findQuery': {}
        })
    }).then(result => result.json())
        .then(json => DownloadMenu(json))
        .catch(ex => console.log(ex))
}



export default MesosSoftRestart;