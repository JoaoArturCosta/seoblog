import React, { useState, useEffect, useCallback } from "react";
import { API } from "../../config";
import Lightbox from "react-image-lightbox";

const Gallery = (props) => {
	const [isOpen, setOpen] = React.useState(false);
	const [photoIndex, setPhotoIndex] = React.useState(0);

	const onClickHandle = () => () => {
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
	};

	const showLightbox = () => {
		return (
			isOpen && (
				<Lightbox
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
