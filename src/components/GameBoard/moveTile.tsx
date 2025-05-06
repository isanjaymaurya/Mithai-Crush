const moveTile = (tiles: TilesProps[], fromIndex: number, toIndex: number): TilesProps[] => {
    const newTiles = [...tiles];
    [newTiles[fromIndex], newTiles[toIndex]] = [newTiles[toIndex], newTiles[fromIndex]];
    return newTiles;
};

export default moveTile;