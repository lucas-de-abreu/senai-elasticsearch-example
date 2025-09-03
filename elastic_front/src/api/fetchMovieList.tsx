import type { ElasticSearchMovieHit } from '@/types/ElasticSearchTypes'
import HttpClient from '@/lib/httpClient'

interface FetchMovieListParams {
  page: number
}

export interface FetchMovieListResponse {
  hits: {
    hits: Array<ElasticSearchMovieHit>
  }
  currentPage: number
}

export async function fetchMovieList({ page }: FetchMovieListParams) {
  const httpClient = HttpClient()

  const response = await httpClient.get<FetchMovieListResponse>(
    'movies/_search',
    {
      params: {
        from: (page - 1) * 20,
        size: 20,
      },
    },
  )

  return {
    data: response.data.hits.hits,
    currentPage: page,
  }
}
