export type Player = {
    name: string,
    score: number,
    tile: Tile
}

export type Computer = {
    name: "Computer"
    score: number,
    tile: Tile
}

export type Tile = 'x' | 'o'

export type TileArray = Array<Tile | null>;
