import Page from "../../components/layout/page";
import CustomTitle from "../../components/title/title";


const ApplyForVote = () => {
    return (
        <Page>
            <CustomTitle title="Hello, Let&apos;s Apply"/>
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