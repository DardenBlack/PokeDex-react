import React, {useEffect, useState} from 'react';
import {getAllPokemon, getPokemon} from "./services/pokemon";
import NavBar from "./components/Navbar";
import Pagination from './components/Pagination'
import Card from "./components/Card";
import FilterBar from "./components/FilterBar";
import {Backdrop, Button, ButtonGroup, CircularProgress} from "@material-ui/core";
import './App.css';


function App() {
    const [pokemonData, setPokemonData] = useState([]);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [filterName, setFilterName] = useState('');
    const initialUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1118';

    useEffect(() => {
        async function fetchData() {
           localStorage.clear();
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

    const filterPokemon = async() => {
        await localStorage.getItem("type");
        let filtered_pokemons = pokemonData.filter(pokemon => {
        return pokemon.types.map(type => {
            return type.type.name}).includes(localStorage.getItem("type"))});
        setFilteredPokemons(filtered_pokemons);
    };

    const searchTmp = (event) => setFilterName(event.target.value);

    const searchedPokemon = filteredPokemons.length !== 0 ?
        filteredPokemons.filter(pokemon => {
            return pokemon.name.toLowerCase().includes(filterName.toLowerCase())})
        :
        pokemonData.filter(pokemon => {
            return pokemon.name.toLowerCase().includes(filterName.toLowerCase())});

    const tenPerPage = async () => {
        setFilteredPokemons([]);
        let data = await getAllPokemon('https://pokeapi.co/api/v2/pokemon?limit=10');
        await loadingPokemon(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    };

    const twentyPerPage = async () => {
        setFilteredPokemons([]);
        let data = await getAllPokemon('https://pokeapi.co/api/v2/pokemon?limit=20');
        await loadingPokemon(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    };

    const fiftyPerPage = async () => {
        setFilteredPokemons([]);
        let data = await getAllPokemon('https://pokeapi.co/api/v2/pokemon?limit=50');
        await loadingPokemon(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    };

    const allPerPage = async () => {
        setFilteredPokemons([]);
        let data = await getAllPokemon('https://pokeapi.co/api/v2/pokemon?limit=1118');
        await loadingPokemon(data.results);
        setNextUrl(false);
        setPrevUrl(false);
        setLoading(false);
    };

    const paginationNum = [allPerPage, tenPerPage, twentyPerPage, fiftyPerPage];

    return (
        <div>
            {
                loading ? <Backdrop open>
                    <CircularProgress color="primary"/>
                </Backdrop> : (
                    <>
                        <NavBar func={searchTmp}/>
                        <FilterBar func={filterPokemon}/>
                        <div className="pgnUp">
                            <Button onClick={prev} variant="contained" color="primary">Prev</Button>
                            <Pagination idx={paginationNum}/>
                            <Button onClick={next} variant="contained" color="primary">Next</Button>
                        </div>
                        <div className="grid-container">
                            {filteredPokemons.length !== 0 ? filteredPokemons.map((pokemon, i) => {
                                return <Card pokemon={pokemon} key={i}/>;}) :
                                searchedPokemon.map((pokemon, i) => {
                                    return <Card pokemon={pokemon} key={i}/>;
                                })}
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
