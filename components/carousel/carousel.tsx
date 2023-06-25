
const CustomCarousel = () => {
    return (
        <div className="carousel carousel-center w-full h-96 bg-neutral">
            <div className="carousel-item w-full h-full">
                <img src="/images/stock/photo-1559703248-dcaaec9fab78.jpg" className="rounded-box" />
                <p>Item 1</p>
            </div>
            <div className="carousel-item w-full h-full">
                <img src="/images/stock/photo-1565098772267-60af42b81ef2.jpg" className="rounded-box" />
                <p>Item 2</p>
            </div>
            <div className="carousel-item w-full h-full">
                <img src="/images/stock/photo-1572635148818-ef6fd45eb394.jpg" className="rounded-box" />
                <p>Item 3</p>
            </div>
            
        </div>
    )
}

export default CustomCarousel;