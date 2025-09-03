export interface ElasticSearchMovieItem {
  id: number
  name: string
  description: string
  link: string
}

export interface ElasticSearchMovieHit {
  _source: ElasticSearchMovieItem
}
