import React, {useEffect, useState} from 'react';
import {getAllPokemon, getPokemon} from "./services/pokemon";
import Card from "./components/Card";
import "./components/Navbar/style.css";
import Pagination from './components/Pagination'
import './App.css';
import {Backdrop, Button, ButtonGroup, CircularProgress, TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import FilterBar from "./components/FilterBar";


function App() {
    const [pokemonData, setPokemonData] = useState([]);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [filterName, setFilterName] = useState('');
    const [filterType,, setFilterType] = useState('');
    const initialUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1118';


    useEffect(() => {
        async function fetchData() {
            let response = await getAllPokemon(initialUrl);
            setNextUrl(response.next);
            setPrevUrl(response.previous);
            await loadingPokemon(response.results);
            setLoading(false);
        }

        fetchData();
    }, []);

    const next = async () => {
        if (!nextUrl) return;
        setLoading(true);
        let data = await getAllPokemon(nextUrl);
        await loadingPokemon(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    };

    const prev = async () => {
        if (!prevUrl) return;
        setLoading(true);
        let data = await getAllPokemon(prevUrl);
        await loadingPokemon(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    };

    const loadingPokemon = async (data) => {
        let _pokemonData = await Promise.all(data.map(async pokemon => {
            let pokemonRecord = await getPokemon(pokemon.url);
            return pokemonRecord
        }));

        setPokemonData(_pokemonData)
    };

    const searchedPokemons = pokemonData.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(filterName.toLowerCase())
    });

    const filteredPokemon = pokemonData.filter(pokemon => {
        /**/
    });

    const tenPerPage = async () => {
        let data = await getAllPokemon('https://pokeapi.co/api/v2/pokemon?limit=10');
        await loadingPokemon(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    };

    const twentyPerPage = async () => {
        let data = await getAllPokemon('https://pokeapi.co/api/v2/pokemon?limit=20');
        await loadingPokemon(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    };

    const fiftyPerPage = async () => {
        let data = await getAllPokemon('https://pokeapi.co/api/v2/pokemon?limit=50');
        await loadingPokemon(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    };

    const allPerPage = async () => {
        let data = await getAllPokemon('https://pokeapi.co/api/v2/pokemon?limit=1118');
        await loadingPokemon(data.results);
        setNextUrl(false);
        setPrevUrl(false);
        setLoading(false);
    };


    const paginationNum = [tenPerPage, twentyPerPage, fiftyPerPage, allPerPage];

    return (
        <div>
            {
                loading ? <Backdrop open>
                    <CircularProgress color="white"/>
                </Backdrop> : (
                    <>
                        <div className="Navbar">
                            <p>PokeDex</p>
                            <div className="SearchBar">
                                <SearchIcon className="Search_icon"/>
                                <TextField
                                    onChange={(event) => setFilterName(event.target.value)}
                                    label="Pokemon`s name"
                                    variants="filled"
                                    className="Search_input"
                                />
                            </div>
                        </div>
                        <FilterBar/>
                        <div className="pgnUp">
                            <Button onClick={prev} variant="contained" color="primary">Prev</Button>
                            <Pagination idx={paginationNum}/>
                            <Button onClick={next} variant="contained" color="primary">Next</Button>
                        </div>
                        <div className="grid-container">
                            {
                                searchedPokemons.map((pokemon, i) => {
                                    return <Card pokemon={pokemon} key={i}/>;
                                })
                            }
                        </div>
                        <ButtonGroup className="btn" disableElevation variant="contained" color="primary">
                            <Button onClick={prev}>Prev</Button>
                            <Button onClick={next}>Next</Button>
                        </ButtonGroup>
                    </>
                )
            }
        </div>
    )
}

export default App;
