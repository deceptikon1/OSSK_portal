import React, { useState, useEffect, useRef, useMemo } from 'react';
import './MenuList.css';
import { ReactComponent as FolderIcon } from '../../../SvgFiles/group_icon.svg';
import { ReactComponent as SubFolderIcon } from '../../../SvgFiles/subMenu_icon.svg'
import { NavLink } from 'react-router-dom';
import EmptyList from '../EmptyGroupsView/EmptyGroupsView.jsx';
import { mongodb_host } from '../../../db.js';


function MenuList() {
    const [menu, DownloadMenu] = useState({});
    const [menuComp, setMenuComp] = useState((<EmptyList isEmpty="loading"></EmptyList>));
    const menuTest1 = useRef(null);


    useEffect(() => {
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
    }, [])

    useEffect(() => {
        if (Object.keys(menu).length === 0)
            setMenuComp((<EmptyList isEmpty="empty"></EmptyList>));
        else
            setMenuComp((
                <div className="menuList">
                    {
                        menu.map((elem) => {
                            return (
                                <MenuListElem item={elem} key={elem["groupName"]}></MenuListElem>
                            )
                        })

                    }
                </div>
            ));
    }, [menu]);

    return (menuComp)
}


export default MenuList;


function MenuListElem(props) {
    const [subItemsIsShow, subItemsShow] = useState(false);
    const [subItems, setSubItems] = useState([]);

    useMemo(() => {
        if (subItemsIsShow) {
            setSubItems(
                props.item["subGroups"].map((subElem) => {
                    return (
                        <div key={props.item["groupName"] + "_" + subElem["subGroupName"]} id={props.item["groupName"] + "_" + subElem["subGroupName"]}>
                            <div><SubFolderIcon></SubFolderIcon></div>
                            <div>{subElem["subGroupName"]}</div>
                            <NavLink
                                to={"/" + props.item["groupPath"] + "/" + subElem["subGroupPath"]}
                                style={{ position: "absolute", width: "100%", height: "100%" }}
                            ></NavLink>
                        </div>)

                }))
        } else setSubItems([]);
    }, [subItemsIsShow])

    return (
        <div className="menuItem">

            <div className="menuItemTop" onClick={() => subItemsShow(prev => !prev)}>
                <div><FolderIcon></FolderIcon></div>
                <div>{props.item["groupName"]}</div>
                <div className="menuItem_role">Admin</div>
            </div>

            <div className="menuItemSub">
                {subItems}
            </div>
        </div>
    )
}