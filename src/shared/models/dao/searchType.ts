export type ISearchParams<Filter = string> = {
  page: number
  perPage: number
  sort: string
  sortDir: string
  filter?: Filter
}

export type ISearchResult<T> = {
  items: T[]
  total: number
  currentPage: number
  sort: string
  perPage: number
  sortDir: string
}
