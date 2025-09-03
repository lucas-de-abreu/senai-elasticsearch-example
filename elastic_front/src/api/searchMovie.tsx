import type { ElasticSearchMovieHit } from '@/types/ElasticSearchTypes'
import HttpClient from '@/lib/httpClient'

interface SearchMovieParams {
  searchQuery: string
}

export interface SearchMovieResponse {
  hits: {
    hits: Array<ElasticSearchMovieHit>
  }
}

export async function searchMovie({ searchQuery }: SearchMovieParams) {
  const httpClient = HttpClient()

  const body = {
    query: {
      bool: {
        should: [
          {
            match: {
              name: {
                query: searchQuery,
                boost: 2,
                fuzziness: 'AUTO',
              },
            },
          },
          {
            match: {
              description: searchQuery,
            },
          },
        ],
      },
    },
  }

  const response = await httpClient.post<SearchMovieResponse>(
    'movies/_search',
    body,
  )

  return {
    data: response.data.hits.hits,
  }
}
