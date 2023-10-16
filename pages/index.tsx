import CustomCard from "../components/card/card"
import CustomCarousel from "../components/carousel/carousel"

const Home = () =>{
    return(
        <div className="min-h-screen w-full">
            <CustomCarousel/>
            <div className="w-full h-72 flex flex-row justify-end my-10">
                <CustomCard/>
            </div>
            <div className="w-full h-72 flex flex-row justify-start">
                <CustomCard/>
            </div>
            <div className="w-full h-72 flex flex-row justify-end my-10">
                <CustomCard/>
            </div>
        </div>
    )
}

export default Home