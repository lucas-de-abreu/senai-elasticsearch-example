import { useInfiniteQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useRef } from 'react'
import { fetchMovieList } from '@/api/fetchMovieList'
import MovieCard from '@/components/MovieCard'

export const Route = createFileRoute('/(movies)/list')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, fetchNextPage, isLoading, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['listAllMovies'],
      queryFn: (params) =>
        fetchMovieList({
          page: params.pageParam,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.data.length === 0) {
          return undefined
        }

        return lastPage.currentPage + 1
      },
    })

  const loadingTriggerRef = useRef<HTMLDivElement>(null)

  const handleObserver = useCallback(
    (entries: Array<IntersectionObserverEntry>) => {
      const [entry] = entries

      if (entry.isIntersecting && !isLoading && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [isLoading, isFetchingNextPage],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
    })

    const currentTrigger = loadingTriggerRef.current

    if (currentTrigger) {
      observer.observe(currentTrigger)
    }

    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger)
      }
    }
  }, [handleObserver])

  return (
    <div className="w-full px-4">
      <div className="w-full max-w-[1280px] p-4 mx-auto">
        <div className="w-full grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {data && (
            <>
              {data.pages
                .flatMap((res) => res.data)
                .map((movie) => (
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

        <>{hasNextPage && <div ref={loadingTriggerRef} />}</>
      </div>
    </div>
  )
}
