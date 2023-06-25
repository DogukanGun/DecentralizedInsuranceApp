import Page from "../../components/layout/page";


const ApplyForVote = () => {
    return (
        <Page>
            <div className="hero h-52 bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello, Let&apos;s Apply</h1>
                    </div>
                </div>
            </div>
            <div className="card flex-row justify-center mx-64 mt-32 h-96 bg-base-100 shadow-xl">
                <div className="form-control mt-20 w-full max-w-xs">
                    <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                    <button className="btn btn-secondary mt-20">Apply</button>
                </div>
            </div>
        </Page>
    )
}

export default ApplyForVote;