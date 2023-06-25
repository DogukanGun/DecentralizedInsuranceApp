import { ChangeEvent, FormEvent, useState } from "react";
import Page from "../../components/layout/page";
import CustomTitle from "../../components/title/title";
import { writeFile } from "../../ipfs/ipfs";


const ApplyForVote = () => {
    const [userFile, setSelectedFile] = useState<File | null>(null);
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            if (e.target?.result) {
                const fileContent = e.target.result as string;
                const fileName = sessionStorage.getItem("account");
                if (fileName) {
                    //writeFile(fileName,fileContent);
                    console.log(fileContent);
                }
            }
        };
        if (userFile) {
            fileReader.readAsText(userFile);
        }
    }
    return (
        <Page>
            <CustomTitle title="Hello, Let&apos;s Apply" />
            <div className="card flex-row justify-center mx-64 mt-32 h-96 bg-base-100 shadow-xl">
                <div className="form-control mt-20 w-full max-w-xs">
                    <form className="w-full" onSubmit={handleSubmit}>
                        <input type="file" onChange={handleFileChange} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                        <button className="btn btn-secondary w-full mt-20">Apply</button>
                    </form>
                </div>
            </div>
        </Page>
    )
}

export default ApplyForVote;