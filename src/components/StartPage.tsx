import React, {useState} from 'react';

import styles from '../styles/start-page.module.css';

import {Player} from '../types/types';

type Props = Readonly<{
    setPlayerOne: Function,
    setPlayerTwo: Function,
    setIsGameOn: Function,
    playerOne: Player,
    playerTwo: Player
}>

export default function StartPage(props: Props): React.ReactElement<Props>{

    const [playerOneName, setPlayerOneName] = useState('');
    const [playerTwoName, setPlayerTwoName] = useState('');

    const start = (): void => {
        props.setPlayerOne((player: Player) => ({...player, name: playerOneName || player.name}));
        props.setPlayerTwo((player: Player) => ({...player, name: playerTwoName || player.name}));
        props.setIsGameOn(true);
    }

    const switchTile = () => {
        props.setPlayerOne((player: Player) => {
            return {
                ...player,
                tile: player.tile === 'x' ? 'o' : 'x'
            }
        })
        props.setPlayerTwo((player: Player) => {
            return {
                ...player,
                tile: player.tile === 'x' ? 'o' : 'x'
            }
        })
    }

    return (
        <div className={styles.start}>
            <div className={styles.info}>
                <div className={styles.info__header}>
                    <h1>TIC TAC TOE</h1>
                </div>
                <div className={styles.info__author}>
                    <div>
                        Designed and Coded by <a href="https://github.com/AnsellMaximilian">Ansell Maximilian</a>
                    </div>
                </div>
            </div>

            <div className={styles.options}>
                <div className={styles.options__left}>
                    <div>
                        Source can be found on <a href="https://github.com/AnsellMaximilian/tic-tac-toe-v2">Github</a>
                    </div>
                    {/* <div className={styles['mode-instruction']}>
                        CHOOSE MODE
                    </div>
                    <div className={styles.radios}>
                        <div className={styles.mode__option}>
                            <div className={`${styles.radio} ${props.mode === 'pvc' && styles['radio-on']}`} 
                                onClick={() => props.setMode('pvc')}
                            >
                                <div className={`${styles.radio__box}`}></div>
                                Computer vs. Player
                            </div>
                        </div>
                        <div className={styles.mode__option}>
                            <div className={`${styles.radio} ${props.mode === 'pvp' && styles['radio-on']}`} 
                                onClick={() => props.setMode('pvp')}
                            > 
                                <div className={`${styles.radio__box}`}></div>
                                Player vs. Player
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className={styles.options__right}>
                    <div className={styles.names}>
                        <div className={styles['name-input']}>
                            <div className={styles.tile} onClick={switchTile}>
                                {props.playerOne.tile}
                                <div className={`${styles.switch} ${styles['switch-left']}`}></div>
                            </div>
                            <input 
                                type="text" 
                                name="playerOne" 
                                placeholder="Player 1 name"
                                value={playerOneName}
                                onChange={(e) => setPlayerOneName(e.target.value)}
                            />
                        </div>
                        <div className={styles['name-input']}>
                            <div className={styles.tile} onClick={switchTile}>
                                {props.playerTwo.tile}
                                <div className={`${styles.switch} ${styles['switch-right']}`}></div>
                            </div>
                            <input 
                                type="text" 
                                name="playerOne" 
                                placeholder="Player 2 name"
                                value={playerTwoName}
                                onChange={(e) => setPlayerTwoName(e.target.value)}
                            />
                        </div> 

                    </div>
                    <div className={styles['start-btn']}>
                        <button onClick={start}>START</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
