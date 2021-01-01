export type Player = {
    name: string,
    score: number,
    tile: Tile
}

export type Tile = 'x' | 'o'

export type TileArray = Array<Tile | null>;
