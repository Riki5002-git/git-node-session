export const PhotoService = {
    getData() {
        return [
            {
                itemImageSrc: 'Images/77.jpg'
            },
            {
                itemImageSrc: 'Images/75.jpg'
            },
            {
                itemImageSrc: 'Images/74.jpg'
            },
            {
                itemImageSrc: 'Images/73.jpg'
            },
            {
                itemImageSrc: 'Images/72.jpg'
            },
            {
                itemImageSrc: 'Images/71.jpg'
            },
            {
                itemImageSrc: 'Images/70.jpg'
            },
            {
                itemImageSrc: 'Images/69.jpg'
            },
            {
                itemImageSrc: 'Images/68.jpg'
            },
            {
                itemImageSrc: 'Images/25.jpg'
            },
            {
                itemImageSrc: 'Images/29.jpg'
            },
            {
                itemImageSrc: 'Images/30.jpg'
            },
            {
                itemImageSrc: 'Images/31.jpg'
            },
            {
                itemImageSrc: 'Images/23.jpg'
            },
            {
                itemImageSrc: 'Images/20.jpg'
            }
        ];
    },

    getImages() {
        return Promise.resolve(this.getData());
    }
};