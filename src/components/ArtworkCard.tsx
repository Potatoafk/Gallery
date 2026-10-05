import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getArtistName, getArtworkImageUrl, type Artwork } from '../lib/artic'

function ArtworkCard({ artwork, index }: { artwork: Artwork; index: number }) {
    const imageUrl = getArtworkImageUrl(artwork)
    return (
        <Link className="artwork-card" to={`/artwork/${artwork.id}`} style={{ '--card-index': index } as React.CSSProperties}>
            <div className="artwork-image-wrap" style={artwork.thumbnail?.lqip ? { backgroundImage: `url(${artwork.thumbnail.lqip})` } : undefined}>
                {imageUrl ? <img src={imageUrl} alt={artwork.thumbnail?.alt_text || artwork.title} loading={index < 6 ? 'eager' : 'lazy'} /> : <div className="image-placeholder">No image available</div>}
                <span className="card-arrow"><ArrowUpRight size={18} strokeWidth={1.8} /></span>
            </div>
            <div className="artwork-card-meta"><h2>{artwork.title}</h2><p>{getArtistName(artwork.artist_display)}</p><span>{artwork.date_display || 'Date unknown'}</span></div>
        </Link>
    )
}

export default ArtworkCard
