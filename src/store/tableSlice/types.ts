export interface DataTableQueryProps{
    searchSelection: string,
    search: string,
    limit: number,
    currentPage: number,
    sort: string[],
    columns: string[],
}