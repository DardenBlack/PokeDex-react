import React from 'react'
import './style.css'
import {TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';


function Navbar() {
    return (
        <div className="Navbar">
            <p>PokeDex</p>
            <div className="SearchBar">
                <SearchIcon className="Search_icon"/>
                <TextField
                    label="Input Pokemon`s name"
                    variants="filled"
                    className="Search_input"
                />
            </div>
        </div>
    )
}


export default Navbar;