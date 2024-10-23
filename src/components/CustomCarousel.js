import React, { useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Card, CardMedia, Grid } from '@mui/material';

const CustomCarousel = ({ images, navigate }) => {
    const carouselRef = useRef(null);

    images = images.filter(image => image.links && image.links.length > 0);

    return (
        <Box sx={{ marginTop: 8 }}>
            <Carousel
                ref={carouselRef}
                autoPlay
                interval={3000}
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                centerMode={true}
                centerSlidePercentage={33}
                swipeable={true}
            >
                {images.map(image => (
                    <Grid item xs={12} sm={6} md={4} key={image.data[0].nasa_id} onClick={() => navigate(`/image/${image.data[0].nasa_id}`)}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                                marginLeft: "10%"
                            }}
                        >
                            <CardMedia
                                component="img"
                                width="10"
                                height="200"
                                image={image.links[0].href}
                                alt={image.data[0].title}
                                sx={{ objectFit: 'cover' }}
                            />
                        </Card>
                    </Grid>
                ))}
            </Carousel>

        </Box>
    );
};

export default CustomCarousel;
