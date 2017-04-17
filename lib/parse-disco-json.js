import { Html5Entities } from 'html-entities'

const { decode } = Html5Entities;

const namesOf = (items) => items.map((item) => item.name || item).map(decode).sort();

export default function parseDiscoJson (releaseData) {
  const {
    artworkUrl,
    artists,
    name,
    year,
    tags,
    recordLabel,
    composers,
    conductor,
    catalogueNumber,
    torrentHash,
    liked
  } = releaseData;

  return {

    hash: torrentHash,

    artist: artists.length > 2 ? 'Various Artists' : namesOf(artists).join(' & '),
    title: decode(name),

    artworkUrl,

    artists: namesOf(artists),
    with: namesOf(releaseData.with || []),
    composers: namesOf(composers),
    conductors: namesOf(conductor),

    liked,

    label: recordLabel ? decode(recordLabel) : '',
    catalogueNumber: catalogueNumber,
    year: parseInt(year, 10),
    tags: tags.map(decode)
  };
}
