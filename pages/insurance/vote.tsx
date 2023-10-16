import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Page from "../../components/layout/page";
import CustomTitle from "../../components/title/title";
import abi from "../../abi/Voting.json";

const Vote = () => {
  const [cid, setCid] = useState("");
  const [assetValue, setAssetValue] = useState<number>(0);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [positiveVotes, setPositiveVotes] = useState<number>(0);
  const [approvalThreshold, setApprovalThreshold] = useState<number>(0);
  const [activeVoteMessage, setActiveVoteMessage] = useState<string>("");
  const [voteInProgress, setVoteInProgress] = useState<boolean>(false);
  const [userWallet, setUserWallet] = useState<string>("");

  useEffect(() => {
    // get Vote
    const ipfsCid = "";
    setCid(ipfsCid);
    getVote();
    getApprovalThreshold();
  }, []);

  const getVote = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://testnet.aurora.dev"
      );
      const votingContractAddress = "0x4e6C88BD2C76DFDA0ce867EcEd0D4cF82a00D17F";
      const votingContract = new ethers.Contract(
        votingContractAddress,
        abi,
        provider
      );

      // Get the current vote session data
      const currentVoteSession = await votingContract.getCurrentVoteSession();

      // Destructure the returned data
      const { asset, totalVotes, positiveVotes } = currentVoteSession;

      // Update the state variables with the retrieved data
      setAssetValue(asset.assetValue);
      setTotalVotes(totalVotes);
      setPositiveVotes(positiveVotes);
      setActiveVoteMessage("");
    } catch (error) {
      if (error.message.includes("There is no active vote.")) {
        setActiveVoteMessage("There is no active vote.");
      } else {
        console.error("Error retrieving vote:", error);
      }
    }
  };

  const getApprovalThreshold = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://testnet.aurora.dev"
      );
      const votingContractAddress = "0x4e6C88BD2C76DFDA0ce867EcEd0D4cF82a00D17F";
      const votingContract = new ethers.Contract(
        votingContractAddress,
        abi,
        provider
      );

      // Call the contract function to retrieve the approvalThreshold
      const threshold = await votingContract.approvalThreshold();
      setApprovalThreshold(threshold.toNumber());
    } catch (error) {
      console.error("Error retrieving approval threshold:", error);
    }
  };

  const handleCidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCid(event.target.value);
  };

  const handleWalletChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserWallet(event.target.value);
  };

  const startVoteRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://testnet.aurora.dev"
      );
      const wallet = provider.getSigner();
      const votingContractAddress = "0x4e6C88BD2C76DFDA0ce867EcEd0D4cF82a00D17F";
      const votingContract = new ethers.Contract(
        votingContractAddress,
        abi,
        wallet
      );

      // Call the contract function to start a vote request
      const voteRequestTx = await votingContract.requestVote(userWallet, assetValue);
      await voteRequestTx.wait();

      // Reset the form and update the vote data after starting the vote request
      setUserWallet("");
      setAssetValue(0);
      getVote();
    } catch (error) {
      console.error("Error starting vote request:", error);
    }
  };

  const sendNegativeVote = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://testnet.aurora.dev"
      );
      const wallet = provider.getSigner();
      const votingContractAddress = "0x4e6C88BD2C76DFDA0ce867EcEd0D4cF82a00D17F";
      const votingContract = new ethers.Contract(
        votingContractAddress,
        abi,
        wallet
      );

      // Call the contract function to send a negative vote
      const negativeVoteTx = await votingContract.vote(false);
      await negativeVoteTx.wait();

      // Refresh the vote data after sending the vote
      getVote();
    } catch (error) {
      console.error("Error sending negative vote:", error);
    }
  };

  const sendPositiveVote = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://testnet.aurora.dev"
      );
      const wallet = provider.getSigner();
      const votingContractAddress = "0x4e6C88BD2C76DFDA0ce867EcEd0D4cF82a00D17F";
      const votingContract = new ethers.Contract(
        votingContractAddress,
        abi,
        wallet
      );

      // Call the contract function to send a positive vote
      const positiveVoteTx = await votingContract.vote(true);
      await positiveVoteTx.wait();

      // Refresh the vote data after sending the vote
      getVote();
    } catch (error) {
      console.error("Error sending positive vote:", error);
    }
  };

  return (
    <Page>
      <CustomTitle title="Hello, Let's Vote" />
      <div className="flex w-full h-96 mt-20">
        <div className="col-span-12 w-full h-full mx-10">
          <div className="flex w-full text-black justify-center mt-10">
            Asset Value: {assetValue} stNear
          </div>

          {/* <div className="flex w-full text-black justify-center mt-10">
            <input
              type="text"
              value={cid}
              onChange={handleCidChange}
              className="input"
            />
          </div> */}
          <div className="flex w-full text-black justify-center mt-10">
            Total Votes: {totalVotes}
          </div>
          <div className="flex w-full text-black justify-center mt-10">
            Positive Votes: {positiveVotes}
          </div>
          <div className="flex w-full text-black justify-center mt-10">
            Approval Threshold: {approvalThreshold}
          </div>
          {!voteInProgress ? (
            <div className="flex w-full justify-center mt-20">
              <form onSubmit={startVoteRequest}>
                <div className="flex justify-center">
                  <input
                    type="text"
                    value={userWallet}
                    onChange={handleWalletChange}
                    className="input"
                    placeholder="Enter Wallet Address"
                  />
                  <input
                    type="number"
                    value={assetValue}
                    onChange={(e) => setAssetValue(parseInt(e.target.value))}
                    className="input"
                    placeholder="Enter Asset Value"
                  />
                  <button type="submit" className="btn btn-primary">
                    Start Vote Request
                  </button>
                </div>
              </form>
            </div>
          ) : null}
          <div className="flex w-96 justify-around mt-20 mx-auto">
            <button onClick={sendNegativeVote} className="btn btn-error">
              No
            </button>
            <button onClick={sendPositiveVote} className="btn btn-success">
              Yes
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Vote;
