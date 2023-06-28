import { useEffect, useState } from "react";
import Page from "../../components/layout/page";
import CustomTitle from "../../components/title/title";

const Vote = () => {
    const [cid,setCid] = useState<string>("");

    useEffect(()=>{
        // get Vote
    },[])

    const sendNegativeVote = () =>{
        
    }

    const sendPositiveVote = () =>{
        
    }
    return (
        <Page>
            <CustomTitle title="Hello, Let&apos;s Vote" />
            <div className="flex w-full h-96 mt-20">
                <div className="col-span-12 w-full h-full mx-10">
                    <div className="flex w-full text-black justify-center mt-10">
                        Asset Value : 1200stNear
                    </div>
                    <div className="flex w-full text-black justify-center mt-10">
                        Wallet Address: 0x1111
                    </div>
                    <div className="flex w-full text-black justify-center mt-10">
                        https://dweb.link/ipfs/${cid}
                    </div>
                    <div className="flex w-96 justify-around mt-20 mx-auto">
                        <button onClick={sendNegativeVote} className="btn btn-error">No</button>
                        <button onClick={sendPositiveVote} className="btn btn-success">Yes</button>
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default Vote;