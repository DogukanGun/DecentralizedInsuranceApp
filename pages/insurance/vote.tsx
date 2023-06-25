import Page from "../../components/layout/page";
import CustomTitle from "../../components/title/title";

const Vote = () => {
    return (
        <Page>
            <CustomTitle title="Hello, Let&apos;s Vote" />
            <div className="flex w-full h-96 mt-20">
                <div className="w-1/2 h-full bg-black mx-10">
                    A
                </div>
                <div className="col-span-12 w-1/2 h-full mx-10">
                    <div className="flex w-full text-black justify-center mt-10">
                        Asset Value : 1200 stNear
                        Wallet Address: 0x1111
                    </div>
                    <div className="flex w-96 justify-around mt-20 mx-auto">
                        <button className="btn btn-error">No</button>
                        <button className="btn btn-success">Yes</button>
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default Vote;