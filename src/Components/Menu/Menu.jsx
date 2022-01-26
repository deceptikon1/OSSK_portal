import React from 'react';
import './Menu.css';
import SearchField from './SearchField/SearchField.jsx'
import { ReactComponent as AddIcon } from '../../SvgFiles/add_icon.svg';
import MenuList from './MenuList/MenuList.jsx';


function Menu() {
    return (
        <div className="menu">
            <SearchField></SearchField>
            <MenuList></MenuList>
            <MenuButtons></MenuButtons>
        </div>
    )
}

export default Menu;


function MenuButtons() {
    return (
        <div className="menuButtons">
            <div style={{ gridColumn: "5/5" }}>
                <AddIcon></AddIcon>
            </div>
        </div>
    )
}