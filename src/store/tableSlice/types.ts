export interface DataTableQueryProps{
    searchSelection: string,
    query: string,
    limit: number,
    offset: number,
    currentPage: number,
    sort: string[],
    column: string[],
}