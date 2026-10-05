import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchArtwork, getArtistDetails, getArtistName, getArtworkImageUrl, getDescription, type Artwork } from '../lib/artic'

function ArtworkPage() {
    const { id } = useParams(); const [artwork, setArtwork] = useState<Artwork | null>(null); const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        if (!id) return
        const controller = new AbortController()
        fetchArtwork(id, controller.signal).then(setArtwork).catch((requestError: Error) => { if (requestError.name !== 'AbortError') setError(requestError.message) })
        return () => controller.abort()
    }, [id])
    if (error)
        return <main className="detail-page">
            <div className="state-message">
                <h1>Artwork unavailable.</h1>
                <p>{error}</p>
                <Link to="/">Back to the collection</Link>
            </div>
        </main>

    if (!artwork)
        return <main className="detail-page">
            <div className="detail-loading">Loading artwork...</div>
        </main>
    const imageUrl = getArtworkImageUrl(artwork, 1200); const artistDetails = getArtistDetails(artwork.artist_display); const description = getDescription(artwork.description)

    return <main className="detail-page">
        <header className="site-header page-width"><Link className="wordmark" to="/">Morrow<span>.</span></Link><Link className="back-link" to="/"><ArrowLeft size={17} /> Back to explore</Link></header>
        <section className="detail-layout page-width">
            <div className="detail-image">{imageUrl ? <img src={imageUrl} alt={artwork.thumbnail?.alt_text || artwork.title} /> : <div className="image-placeholder">No image available</div>}</div>
            <div className="detail-content"><p className="eyebrow">{artwork.department || 'Art Institute of Chicago'}</p><h1>{artwork.title}</h1><p className="detail-artist">{getArtistName(artwork.artist_display)}{artistDetails ? <span>{artistDetails}</span> : null}</p><dl className="detail-facts"><div><dt>Date</dt><dd>{artwork.date_display || 'Unknown'}</dd></div><div><dt>Medium</dt><dd>{artwork.medium_display || 'Not specified'}</dd></div><div><dt>Origin</dt><dd>{artwork.place_of_origin || 'Not specified'}</dd></div></dl>{description ? <p className="detail-description">{description}</p> : null}<a className="museum-link" href={`https://www.artic.edu/artworks/${artwork.id}`} target="_blank" rel="noreferrer">View on artic.edu <ArrowUpRight size={17} /></a></div>
        </section></main>
}

export default ArtworkPage
