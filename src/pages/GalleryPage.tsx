import { Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import ArtworkCard from '../components/ArtworkCard'
import { fetchArtworks, type Artwork } from '../lib/artic'

function GalleryPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get('q') || ''
    const [searchInput, setSearchInput] = useState(query)
    const [artworks, setArtworks] = useState<Artwork[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => { setSearchInput(query); setPage(1) }, [query])
    useEffect(() => {
        const controller = new AbortController()
        setIsLoading(true); setError(null)
        fetchArtworks({ page, query, signal: controller.signal }).then((result) => {
            setArtworks(result.data); setTotalPages(Math.min(result.pagination.total_pages, 100))
        }).catch((requestError: Error) => {
            if (requestError.name !== 'AbortError') setError(requestError.message)
        }).finally(() => setIsLoading(false))
        return () => controller.abort()
    }, [page, query])

    function handleSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const nextQuery = searchInput.trim()
        setSearchParams(nextQuery ? { q: nextQuery } : {})
    }

    return (
        <main className="site-shell">
            <header className="site-header page-width"><a className="wordmark" href="/">Morrow<span>.</span></a><nav className="site-nav" aria-label="Main navigation"><a className="active" href="/">Explore</a><a href="#about">About</a><a href="https://www.artic.edu/" target="_blank" rel="noreferrer">The Art Institute <span>↗</span></a></nav></header>
            <section className="gallery-intro page-width"><div><p className="eyebrow">Art Institute of Chicago / Open collection</p><h1>{query ? `Results for “${query}”` : 'A living collection'}</h1><p className="intro-copy">A quiet place to wander through centuries of image, object, and idea.</p></div><form className="search-form" onSubmit={handleSearch} role="search"><Search size={19} strokeWidth={1.7} /><input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Search the collection" aria-label="Search the collection" /><button type="submit" aria-label="Submit search"><span>Search</span><SlidersHorizontal size={17} /></button></form></section>
            <section className="collection-section page-width" aria-live="polite"><div className="collection-heading"><p>{query ? 'Search results' : 'Selected works'}</p><span>{isLoading ? 'Loading collection...' : `${artworks.length} works on this page`}</span></div>
                {error ? <div className="state-message"><h2>We lost the thread.</h2><p>{error}</p><button onClick={() => setPage(page)}>Try again</button></div> : null}
                {isLoading ? <div className="gallery-grid">{Array.from({ length: 12 }, (_, index) => <div className="skeleton-card" key={index} />)}</div> : null}
                {!isLoading && !error ? <div className="gallery-grid">{artworks.map((artwork, index) => <ArtworkCard key={artwork.id} artwork={artwork} index={index} />)}</div> : null}
                {!isLoading && !error && artworks.length === 0 ? <div className="state-message"><h2>Nothing found.</h2><p>Try a broader search and see where it leads.</p></div> : null}
                <div className="pagination"><button disabled={page <= 1 || isLoading} onClick={() => setPage((current) => current - 1)}>← Previous</button><span>{page} / {totalPages}</span><button disabled={page >= totalPages || isLoading} onClick={() => setPage((current) => current + 1)}>Next →</button></div>
            </section>
            <footer className="site-footer page-width"><span>Morrow / A considered index</span><span>Data from the Art Institute of Chicago API</span></footer>
        </main>
    )
}

export default GalleryPage
