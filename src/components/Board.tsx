import React, {useState} from 'react'

import {Player, Computer, TileArray} from '../types/types';

import crack from '../images/crack.jpg';

import styles from '../styles/board.module.css';

type Props = {
    mode: 'pvp' | 'pvc',
    playerOne: Player,
    playerTwo: Player | Computer,
    tiles: TileArray,
    setTiles: Function,
    setWinner: Function,
    setWinCombo: Function,
    setDraw: Function
    winCombo: Array<number>,
    draw: boolean,
    winner: Player | Computer | null,
    setScore: Function
    
}

export default function Board(props: Props): React.ReactElement {

    const [playerOnTurn, setPlayerOnTurn] = useState<Player | Computer>(props.playerOne);

    const winningCombos = [ [3, 4, 5], [0, 1, 2], [6, 7, 8], // Horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
      [0, 4, 8], [2, 4, 6] // Diagonal
    ];
  
    const checkWin = (tiles: TileArray, player: Player | Computer) => {
        let finished = false;
        winningCombos.forEach(combo => {
            let win = true;
            combo.forEach(tile => {
                if(tiles[tile] !== player.tile) win = false;
            })
            
            if(win){
                console.log('fag')
                props.setWinner(player);
                props.setWinCombo(combo);
                props.setScore(player);
                finished = true;
            }else if(tiles.every(tile => tile) && !finished){
                props.setDraw(true);
                props.setWinCombo(new Array(9).fill(1).map((n, i) => i));
            }
        })
    }

    const setTile = (index: number) => {
        props.setTiles((tiles: TileArray): TileArray => {
            const newTiles = tiles.map((tile, tileIdx) => {
                if(tileIdx === index){
                    return playerOnTurn.tile;
                }
                return tile;
            })
            checkWin(newTiles, playerOnTurn);

            return newTiles;
        })
        setPlayerOnTurn((player: Player | Computer) => {
            if(player === props.playerOne){
                if(props.mode === 'pvp'){
                    return props.playerTwo;
                }else {
                    props.setTiles((tiles: TileArray) => {
                        const posTiles = tiles.map((t, i) => {
                            if(t || i === index){
                                return null;
                            }
                            return i;
                        }).filter(i => i !== null)

                        const comIdx = posTiles[Math.floor(Math.random() * posTiles.length)];
                        const newTiles = tiles.map((tile, tileIdx) => {
                            if(tileIdx === comIdx){
                                return props.playerTwo.tile;
                            }
                            return tile;
                        })
                        console.log({posTiles, comIdx, newTiles})
                        checkWin(newTiles, props.playerTwo);
            
                        return newTiles;
                    })
                    return props.playerOne;
                }
               
            }else {
                return props.playerOne;
            }
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.board}>
                {
                    props.tiles.map((tile, index) => {
                        return (
                            <div className={styles.tile} key={index} 
                                onClick={tile || props.winner ? () => alert('NOPE') : () => {
                                    setTile(index);
                                }}
                                style={props.winCombo.includes(index) ? {backgroundImage: `url(${crack})`} : {}}
                            >
                                <div className={styles['tile-value']}>
                                    {tile || " "}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.scores}>
                <div className={styles.score}>
                    {playerOnTurn === props.playerOne ? <span>On Turn</span> : null}
                    <div>
                        {props.playerOne.name}
                    </div>
                    <div>
                        {props.playerOne.score}
                    </div>
                </div>
                <div className={styles.score}>
                    {playerOnTurn === props.playerTwo ? <span>On Turn</span> : null}
                    <div>
                        {props.playerTwo.name}
                    </div>
                    <div>
                        {props.playerTwo.score}
                    </div>
                </div>
            </div>
        </div>
    )
}
