export interface Artwork {
    id: number
    title: string
    artist_display: string | null
    date_display: string | null
    department: string | null
    image_id: string | null
    thumbnail?: { lqip?: string; width?: number; height?: number; alt_text?: string }
    description?: string | null
    medium_display?: string | null
    place_of_origin?: string | null
}

interface ArticResponse { data: Artwork[]; pagination: { total_pages: number } }
interface ArticSingleResponse { data: Artwork }

const API_URL = 'https://api.artic.edu/api/v1'
const IIIF_URL = 'https://www.artic.edu/iiif/2'
const FIELDS = ['id', 'title', 'artist_display', 'date_display', 'department', 'image_id', 'thumbnail', 'description', 'medium_display', 'place_of_origin'].join(',')

export function getArtworkImageUrl(artwork: Artwork, width = 900): string | undefined {
    return artwork.image_id ? `${IIIF_URL}/${artwork.image_id}/full/${width},/0/default.jpg` : undefined
}

export async function fetchArtworks({ page = 1, query = '', signal }: { page?: number; query?: string; signal?: AbortSignal } = {}): Promise<ArticResponse> {
    const endpoint = query ? 'artworks/search' : 'artworks'
    const params = new URLSearchParams({ fields: FIELDS, limit: '24', page: String(page) })
    if (query) params.set('q', query)
    const response = await fetch(`${API_URL}/${endpoint}?${params}`, { signal })
    if (!response.ok) throw new Error('The collection could not be reached.')
    return response.json() as Promise<ArticResponse>
}

export async function fetchArtwork(id: string, signal?: AbortSignal): Promise<Artwork> {
    const response = await fetch(`${API_URL}/artworks/${id}?fields=${FIELDS}`, { signal })
    if (!response.ok) throw new Error('This artwork could not be found.')
    return ((await response.json()) as ArticSingleResponse).data
}

export function getArtistName(artistDisplay: string | null): string { return artistDisplay?.split('\n')[0] || 'Artist unknown' }
export function getArtistDetails(artistDisplay: string | null): string | null { return artistDisplay?.split('\n').slice(1).join(' ').trim() || null }
export function getDescription(description: string | null | undefined): string | null { return description ? description.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() : null }
