import React from 'react'

import {Player} from '../types/types';

import styles from '../styles/game-over.module.css';

type Props = {
    winner: Player | null,
    draw: boolean
    reset: Function
}

export default function GameOver(props: Props): React.ReactElement {
    return (
        <div className={styles['game-over']}>
            <div className={styles.ann}>
                {props.winner ?
                <div>
                    <div>Winner<div>
                    </div>{props.winner.name}</div>
                </div>
                :
                <div>Draw</div>
                }
            </div>
            <div className={styles.again} onClick={() => props.reset()}>Play Again</div>
        </div>
    )
}
