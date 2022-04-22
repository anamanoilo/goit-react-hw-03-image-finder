import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ hits }) {
  return (
    <ul className="ImageGallery">
      {hits.map(hit => (
        <ImageGalleryItem
          key={hit.id}
          url={hit.webformatURL}
          title={hit.tags}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;
