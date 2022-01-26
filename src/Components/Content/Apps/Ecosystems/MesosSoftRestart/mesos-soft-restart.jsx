import React, { useState, useEffect, useMemo } from 'react'
import './mesos-soft-restart.css'
import { mongodb_host } from '../../../../../db.js';
import { ReactComponent as MarathonGroupIcon } from '../../../../../SvgFiles/marathon_group_icon.svg';
import { ReactComponent as MarathonAppIcon } from '../../../../../SvgFiles/marathon_app_icon.svg';
import { ReactComponent as RestartIcon } from '../../../../../SvgFiles/restart_icon.svg';

 const MesosSoftRestart = () => {
    const [menuItem, setMenuItem] = useState({ "host": ""});
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
                    <div onClick={(e) => setMenuItem({ "host": "host1"})}>ossk-master</div>
                    <div onClick={(e) => setMenuItem({ "host": "host2"})}>mb-app</div>
                    <div>onlc-int</div>
                </div>

                <div className="mesos_soft_restart_list">
                    <Groups groups={appList} width={100}></Groups>
                </div>
            </div>
        </div>
    )
}

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


export default MesosSoftRestart;
