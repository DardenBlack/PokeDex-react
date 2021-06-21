import React from 'react'
import './style.css'
import pokemonType from '../helpers/pokemonTypes'

function Card({pokemon}) {
    return (
        <div className="Card">
            <div className="FrontFace">
                <div className="Card_img">
                    <img src={pokemon.sprites.front_default} alt=""/>
                </div>
                <div className="Card_name">
                    {pokemon.name}
                </div>
                <div className="Card_types">
                    {pokemon.types.map(type => {
                        return (
                            <div className="Card_type" style={{backgroundColor: pokemonType[type.type.name]}}>
                                {type.type.name}
                            </div>
                        )
                    })}
                </div>
                <div className="Card_info">
                    <div className="Card_data Card_data-height">
                        <p className="title">Height</p>
                        <p>{pokemon.height}</p>
                    </div>
                    <div className="Card_data Card_data-weight">
                        <p className="title">Weight</p>
                        <p>{pokemon.weight}</p>
                    </div>
                    <div className="Card_data Card_data-ability">
                        <p className="title">Ability</p>
                        <p>{pokemon.abilities[0].ability.name}</p>
                    </div>
                </div>
            </div>
            <div className="BackFace">
                <div className="Card_stats">
                    <div className='CardStats_title'>Pokemon Stats</div>
                    <div className="Card_data Card_data-hp">
                        <p className="title">HP:</p>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar"
                                 style={{width: pokemon.stats[0].base_stat}}>
                                {pokemon.stats[0].base_stat}
                            </div>
                        </div>
                    </div>
                    <div className="Card_data Card_data-attack">
                        <p className="title">Attack:</p>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar"
                                 style={{width: pokemon.stats[1].base_stat}}>
                                {pokemon.stats[1].base_stat}
                            </div>
                        </div>
                    </div>
                    <div className="Card_data Card_data-defense">
                        <p className="title">Defense:</p>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar"
                                 style={{width: pokemon.stats[2].base_stat}}>
                                {pokemon.stats[2].base_stat}
                            </div>
                        </div>
                    </div>
                    <div className="Card_data Card_data-s_attack">
                        <p className="title">Special Attack:</p>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar"
                                 style={{width: pokemon.stats[3].base_stat}}>
                                {pokemon.stats[3].base_stat}
                            </div>
                        </div>
                    </div>
                    <div className="Card_data Card_data-s_defense">
                        <p className="title">Special Defense:</p>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar"
                                 style={{width: pokemon.stats[4].base_stat}}>
                                {pokemon.stats[4].base_stat}
                            </div>
                        </div>
                    </div>
                    <div className="Card_data Card_data-speed">
                        <p className="title">Speed:</p>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar"
                                 style={{width: pokemon.stats[5].base_stat}}>
                                {pokemon.stats[5].base_stat}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;