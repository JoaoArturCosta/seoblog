import React, { useState, useEffect, useCallback } from "react";
import { API } from "../../config";
import Lightbox from "react-image-lightbox";

const Gallery = (props) => {
	const [isOpen, setOpen] = React.useState(false);
	const [photoIndex, setPhotoIndex] = React.useState(0);

	const onClickHandle = () => () => {
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
	};

	const showLightbox = () => {
		return (
			isOpen && (
				<Lightbox
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
