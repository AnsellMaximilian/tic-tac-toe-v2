import React, {useState} from 'react'

import {Player, TileArray} from '../types/types';

import crack from '../images/crack.jpg';

import styles from '../styles/board.module.css';

type Props = {
    playerOne: Player,
    playerTwo: Player,
    tiles: TileArray,
    setTiles: Function,
    setWinner: Function,
    setWinCombo: Function,
    backToMenu: Function
    setDraw: Function
    winCombo: Array<number>,
    draw: boolean,
    winner: Player | null,
    setScore: Function
    
}

export default function Board(props: Props): React.ReactElement {

    const [playerOnTurn, setPlayerOnTurn] = useState<Player>(props.playerOne);

    const winningCombos = [ [3, 4, 5], [0, 1, 2], [6, 7, 8], // Horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
      [0, 4, 8], [2, 4, 6] // Diagonal
    ];
  
    const checkWin = (tiles: TileArray) => {
        let finished = false;
        winningCombos.forEach(combo => {
            let win = true;
            combo.forEach(tile => {
                if(tiles[tile] !== playerOnTurn.tile) win = false;
            })
            
            if(win){
                console.log('fag')
                props.setWinner(playerOnTurn);
                props.setWinCombo(combo);
                props.setScore(playerOnTurn);
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
            checkWin(newTiles);

            return newTiles;
        })
        setPlayerOnTurn((player: Player) => {
            if(player === props.playerOne){
                return props.playerTwo;
               
            }else {
                return props.playerOne;
            }
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.back} onClick={(e) => props.backToMenu()}>Go Back</div>
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
                <div className={`${styles.score} ${playerOnTurn === props.playerOne && styles['on-turn']}`}>
                    <div>
                        {`${props.playerOne.name} (${props.playerOne.tile})`}
                    </div>
                    <div>
                        {props.playerOne.score}
                    </div>
                </div>
                <div className={`${styles.score} ${playerOnTurn === props.playerTwo && styles['on-turn']}`}>
                    <div>
                        {`${props.playerTwo.name} (${props.playerTwo.tile})`}
                    </div>
                    <div>
                        {props.playerTwo.score}
                    </div>
                </div>
            </div>
        </div>
    )
}
