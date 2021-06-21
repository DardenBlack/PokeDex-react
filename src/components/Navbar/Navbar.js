import React from 'react'
import './style.css'
import {TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';


function NavBar(props) {
    return (
        <div className="NavBar">
            <p>PokeDex</p>
            <div className="SearchBar">
                <SearchIcon className="Search_icon"/>
                <TextField
                    onChange={props.func}
                    label="Pokemon`s name"
                    variants="filled"
                    className="Search_input"
                />
            </div>
        </div>
    )
}


export default NavBar;