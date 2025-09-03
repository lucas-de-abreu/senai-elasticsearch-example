import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import type { KeyboardEvent } from 'react'
import type { ElasticSearchMovieHit } from '@/types/ElasticSearchTypes'
import { useMovieAutocomplete } from '@/api/useMovieAutocomplete'
import { searchMovie } from '@/api/searchMovie'
import MovieCard from '@/components/MovieCard'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [value, setValue] = useState('')
  const [autocompleteQuery] = useDebounce(value, 250)
  const [searchQuery] = useDebounce(value, 750)

  const [autocompleteOptions, setAutocompleteOptions] = useState<
    Array<ElasticSearchMovieHit>
  >([])

  const [searchResults, setSearchResults] = useState<
    Array<ElasticSearchMovieHit>
  >([])

  const { mutate: autocomplete } = useMutation({
    mutationFn: useMovieAutocomplete,
    onSuccess: (response) => {
      setAutocompleteOptions(response.data)
    },
  })

  const { mutate: search } = useMutation({
    mutationFn: searchMovie,
    onSuccess: (response) => {
      setSearchResults(response.data)
    },
  })

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      if (autocompleteOptions.length > 0) {
        setValue(autocompleteOptions[0]._source.name)
      }
    }
  }

  useEffect(() => {
    if (autocompleteQuery.length > 0) {
      autocomplete({
        autocompleteQuery,
      })
    } else {
      setAutocompleteOptions([])
    }
  }, [autocompleteQuery])

  useEffect(() => {
    if (searchQuery.length > 0) {
      search({
        searchQuery,
      })
    } else {
      setAutocompleteOptions([])
    }
  }, [searchQuery])

  const [isInputFocused, setIsInputFocused] = useState(false)

  return (
    <div className="w-full px-4">
      <div className="w-full items-center flex justify-center">
        <div className="relative bg-foreground p-2 text-xl w-[400px] mx-auto rounded-sm active:border-base hover:border-base ">
          <input
            className="w-full text-base"
            type="text"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            value={value}
            onKeyDown={handleKeyDown}
            onChange={(event) => setValue(event.target.value)}
          />

          {autocompleteOptions.length > 0 && isInputFocused && (
            <div className="absolute left-0 top-0 p-2 ">
              <span className="text-base/20 line-clamp-1">
                {autocompleteOptions[0]._source.name}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-[1280px] mt-4 py-4 md:px-4 mx-auto">
        <div className="w-full grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {searchResults.length > 0 && (
            <>
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie._source.id}
                  name={movie._source.name}
                  description={movie._source.description}
                  link={movie._source.link}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
