import { Image } from 'primereact/image';
import { Galleria } from 'primereact/galleria';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { useState } from 'react';

const HomePage = () => {
    const cards = [
        { title: 'מטבחים מעוצבים', img: 'Images/42.jpg', link: '/veiwAll/kitchens' },
        { title: 'סלונים מעוצבים', img: 'Images/57.jpg', link: '/veiwAll/livingRooms' },
        { title: 'חדרי בנים מעוצבים', img: 'Images/10.jpg', link: '/veiwAll/boys' },
        { title: 'חדרי בנות מעוצבים', img: 'Images/12.jpg', link: '/veiwAll/girls' },
        { title: 'חדרי שינה מעוצבים', img: 'Images/68.jpg', link: '/veiwAll/parents' },
    ];

    const slideshowImages = [
        { itemImageSrc: 'Images/75.jpg', alt: 'תמונה 1' },
        { itemImageSrc: 'Images/72.jpg', alt: 'תמונה 2' },
        { itemImageSrc: 'Images/42.jpg', alt: 'תמונה 3' },
        { itemImageSrc: 'Images/69.jpg', alt: 'תמונה 4' },
        { itemImageSrc: 'Images/68.jpg', alt: 'תמונה 5' },
        { itemImageSrc: 'Images/67.jpg', alt: 'תמונה 6' },
        { itemImageSrc: 'Images/62.jpg', alt: 'תמונה 7' },
        { itemImageSrc: 'Images/61.jpg', alt: 'תמונה 8' },
        { itemImageSrc: 'Images/59.jpg', alt: 'תמונה 9' }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <div className="home-container">
                <div className="slideshow-container">
                    <Galleria
                        value={slideshowImages}
                        numVisible={5}
                        circular
                        autoPlay
                        transitionInterval={3000}
                        item={(item) => <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%' }} />}
                        activeIndex={activeIndex}
                        onItemChange={(e) => setActiveIndex(e.index)}
                        showThumbnails={false}
                        showIndicatorsOnItem
                    />

                    <div className="overlay-content">
                        <p style={{ fontFamily: 'revert-layer', fontWeight: 'bold', fontSize: '1.5rem' }}>
                            גלול מטה כדי להמשיך
                        </p>
                        <i className="pi pi-angle-down scroll-down-icon" style={{ fontSize: '3rem' }}
                            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
                        ></i>
                    </div>
                </div>

                <div className="cards-container">
                    {cards.map((card, index) => (
                        <div className="card-container" key={index}>
                            <Link to={card.link} className="card-link">
                                <h2 className="card-title">{card.title}</h2>
                                <Image src={card.img} alt={card.title} width="330" className="card-image" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <footer className="flex justify-content-center py-4 border-top-1 surface-border text-sm text-500">
                CasaVibe | © 2025 כל הזכויות שמורות</footer>
        </>
    );
}

export default HomePage;