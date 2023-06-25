interface CustomTitle {
    title: string;
  }
  
const CustomTitle = (props:CustomTitle) => {
    return (
        <div className="hero h-52 bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">{props.title}</h1>
                </div>
            </div>
        </div>
    )
}

export default CustomTitle;
