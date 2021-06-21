import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import "./style.css"


const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function FilterBar(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({left: false});

    const handleChange = (event) => {
        localStorage.setItem('type', event.target.value);
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Choose pokemon type you would like filter by:</FormLabel>
                    <RadioGroup className="radio-group" name="type" onChange={handleChange}>
                        <FormControlLabel value="bug" control={<Radio />} label="Bug" onClick={props.func}/>
                        <FormControlLabel value="dragon" control={<Radio />} label="Dragon" onClick={props.func}/>
                        <FormControlLabel value="fairy" control={<Radio />} label="Fairy" onClick={props.func}/>
                        <FormControlLabel value="fire" control={<Radio />} label="Fire" onClick={props.func}/>
                        <FormControlLabel value="ghost" control={<Radio />} label="Ghost" onClick={props.func}/>
                        <FormControlLabel value="ground" control={<Radio />} label="Ground" onClick={props.func}/>
                        <FormControlLabel value="normal" control={<Radio />} label="Normal" onClick={props.func}/>
                        <FormControlLabel value="psychic" control={<Radio />} label="Psychic"  onClick={props.func}/>
                        <FormControlLabel value="steel" control={<Radio />} label="Steel" onClick={props.func}/>
                        <FormControlLabel value="dark" control={<Radio />} label="Dark" onClick={props.func} />
                        <FormControlLabel value="electric" control={<Radio />} label="Electric" onClick={props.func}/>
                        <FormControlLabel value="fighting" control={<Radio />} label="Fighting" onClick={props.func}/>
                        <FormControlLabel value="flying" control={<Radio />} label="Flying" onClick={props.func}/>
                        <FormControlLabel value="grass" control={<Radio />} label="Grass" onClick={props.func}/>
                        <FormControlLabel value="ice" control={<Radio />} label="Ice" onClick={props.func}/>
                        <FormControlLabel value="poison" control={<Radio />} label="Poison" onClick={props.func}/>
                        <FormControlLabel value="rock" control={<Radio />} label="Rock" onClick={props.func}/>
                        <FormControlLabel value="water" control={<Radio />} label="Water" onClick={props.func}/>
                        <FormControlLabel value="" control={<Radio />} label="Reset" onClick={props.func}/>
                    </RadioGroup>
                </FormControl>
            </List>
        </div>
    );

    return (
        <div className='toggleBtn-container'>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button className="toggleBtn" onClick={toggleDrawer(anchor, true)}>Filtering by types</Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}


