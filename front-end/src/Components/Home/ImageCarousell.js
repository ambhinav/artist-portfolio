import React from 'react';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

const ImageCarousell = (props) => {

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
        setWindowWidth(window.innerWidth);
    }, []);

    return (
        <div style={{ textAlign: "center", margin: 10, paddingLeft: "2%", paddingRight: "2%", paddingBottom: "2%" }}>
            {props.work.length !== 0 ?
                <ImageGallery showNav={true} showPlayButton={true} autoPlay={true} lazyLoad={true} items={props.work} />
                :
                <div>No data to display</div>
            }
        </div >
    );
}

export default ImageCarousell;