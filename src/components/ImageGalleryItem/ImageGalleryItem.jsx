function ImageGalleryItem({ title, url }) {
  return (
    <li className="ImageGalleryItem">
      <img src={url} alt={title} className="ImageGalleryItem-image" />
    </li>
  );
}

export default ImageGalleryItem;
