import { Injectable } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  getImages(product) {
    this.galleryImages = [
      {
        small: product.photo1small,
        medium: product.photo1big,
        big: product.photo1big
      },
      {
        small: product.photo2small,
        medium: product.photo2big,
        big: product.photo2big
      }
    ];
  }

  getOptions() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '470px',
        thumbnails: false,
        imageSwipe: true,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        previewKeyboardNavigation: true,
        previewZoom: true,
        previewZoomStep: 2.5,
        previewZoomMax: 2.5,
        previewZoomMin: 1,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ];
  }

}
