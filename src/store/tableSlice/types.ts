export interface DataTableQueryProps{
    searchSelection: string,
    query: string,
    limit: number,
    currentPage: number,
    sort: string[],
    columns: string[],
}