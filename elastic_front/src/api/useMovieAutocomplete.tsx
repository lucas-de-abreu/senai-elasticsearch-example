import type { ElasticSearchMovieHit } from '@/types/ElasticSearchTypes'
import HttpClient from '@/lib/httpClient'

interface UseMovieAutocompleteParams {
  autocompleteQuery: string
}

export interface UseMovieAutocompleteResponse {
  hits: {
    hits: Array<ElasticSearchMovieHit>
  }
}

export async function useMovieAutocomplete({
  autocompleteQuery,
}: UseMovieAutocompleteParams) {
  const httpClient = HttpClient()

  const body = {
    query: {
      wildcard: {
        name: `${autocompleteQuery}*`,
      },
    },
    size: 1,
  }

  const response = await httpClient.post<UseMovieAutocompleteResponse>(
    'movies/_search',
    body,
  )

  return {
    data: response.data.hits.hits,
  }
}
