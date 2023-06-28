import { ChangeEvent, FormEvent, useState } from "react";
import Page from "../../components/layout/page";
import CustomTitle from "../../components/title/title";
import { Web3Storage } from "web3.storage";
import axios from "axios";
import { useRouter } from "next/router";


const ApplyForVote = () => {
    const [userFile, setSelectedFile] = useState<File | null>(null);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
    const router = useRouter();
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (userFile) {
                const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY ?? "" });
                const _cid = await client.put([userFile]);
                setIsUploaded(true);
                router.push('/');
            }
        } catch {

        }
    }
    return (
        <Page>
            <CustomTitle title={isUploaded ? "Uploaded" : "Hello, Let's Apply"} />
            <div className="card flex-row justify-center mx-64 mt-32 h-96 bg-base-100 shadow-xl">
                <div className="form-control mt-20 w-full max-w-xs">
                    <form className="w-full" onSubmit={handleSubmit}>
                        <input type="file" onChange={handleFileChange} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                        <button className="btn btn-secondary w-full mt-20" type="submit">Apply</button>
                    </form>
                </div>
            </div>
        </Page>
    )
}

export default ApplyForVote;