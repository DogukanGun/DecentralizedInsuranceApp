import CustomCard from "../components/card/card"
import CustomCarousel from "../components/carousel/carousel"
import CustomFooter from "../components/footer/footer"

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
            <CustomFooter/>
        </div>
    )
}

export default Home