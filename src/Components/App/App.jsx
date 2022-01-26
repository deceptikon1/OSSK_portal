import React from 'react';
import './App.css'
import Menu from '../Menu/Menu.jsx'
import Content from '../Content/Content';
import { BrowserRouter, Redirect } from 'react-router-dom';
import TopLine from './TopLine/TopLine.jsx';

function App() {
    return (
        <BrowserRouter basename="/osskportal">
            <div className="background">

                <TopLine></TopLine>

                <div className="menu_content">
                    <Menu></Menu>
                    <Content></Content>
                </div>

            </div>
        </BrowserRouter>
    )
};

export default App;


