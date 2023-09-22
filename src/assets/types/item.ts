export type Item = {
    id: number,
    name: string,
    year: number,
    description: string,
    genre: number[],
    isFavorite?: boolean
}