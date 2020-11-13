import React, { useState, useEffect, useCallback } from "react";
import { API } from "../../config";
import Lightbox from "react-image-lightbox";

const Gallery = (props) => {
	const [isOpen, setOpen] = React.useState(false);
	const [photoIndex, setPhotoIndex] = React.useState(0);

	const onClickHandle = () => () => {
<<<<<<< HEAD
		const photos = props.photos;
		console.log(photos);
		if (photos.length > 0) {
			loadPhotos(photos);
		}
		setOpen(true);
	};

	const loadPhotos = (_photos) => {
		let galleryPhotos = [];
		_photos.forEach((photo) => {
			galleryPhotos.push({
				src: `http://localhost:8000/${photo}`,
				width: 4,
				height: 3,
			});
		});

		return galleryPhotos;
=======
		const slug = props.slug;
		loadPhotos(slug);
		setOpen(true);
	};

	const loadPhotos = (slug) => {
		let photos = [];
		photos.push({
			src: `${API}/blog/photo/${slug}`,
			width: 4,
			height: 3,
		});
		return photos;
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
	};

	const showLightbox = () => {
		return (
			isOpen && (
				<Lightbox
<<<<<<< HEAD
					mainSrc={loadPhotos(props.photos)[photoIndex].src}
					nextSrc={
						loadPhotos(props.photos)[
							(photoIndex + 1) % loadPhotos(props.photos).length
						].src
					}
					prevSrc={
						loadPhotos(props.photos)[
							(photoIndex + loadPhotos(props.photos).length - 1) %
								loadPhotos(props.photos).length
						].src
					}
					imageCaption={
						"Credit: " + loadPhotos(props.photos)[photoIndex].caption
					}
					onCloseRequest={() => setOpen(false)}
					onMovePrevRequest={() =>
						setPhotoIndex(
							(photoIndex + loadPhotos(props.photos).length - 1) %
								loadPhotos(props.photos).length
						)
					}
					onMoveNextRequest={() =>
						setPhotoIndex((photoIndex + 1) % loadPhotos(props.photos).length)
=======
					mainSrc={loadPhotos(props.slug)[photoIndex].src}
					nextSrc={
						loadPhotos(props.slug)[
							(photoIndex + 1) % loadPhotos(props.slug).length
						].src
					}
					prevSrc={
						loadPhotos(props.slug)[
							(photoIndex + loadPhotos(props.slug).length - 1) %
								loadPhotos(props.slug).length
						].src
					}
					imageCaption={"Credit: " + loadPhotos(props.slug)[photoIndex].caption}
					onCloseRequest={() => setOpen(false)}
					onMovePrevRequest={() =>
						setPhotoIndex(
							(photoIndex + loadPhotos(props.slug).length - 1) %
								loadPhotos(props.slug).length
						)
					}
					onMoveNextRequest={() =>
						setPhotoIndex((photoIndex + 1) % loadPhotos(props.slug).length)
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
					}
				/>
			)
		);
	};

	return (
		<React.Fragment>
			<button type="button" onClick={onClickHandle()}>
				Pictures ({loadPhotos.length})
			</button>
			{showLightbox()}
		</React.Fragment>
	);
};

export default Gallery;
