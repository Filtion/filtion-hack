import lighthouse from "@lighthouse-web3/sdk";
import { getAccount, signMessage } from "@wagmi/core";
import axios from "axios";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

type Post = {
  title: string; // post title, text
  body: string; // markup text
  image: string; // one post can contain 1 image, this holds cid, upload image to ipfs to get cid
  tags: string[]; // tags
};

let LIGHTHOUSE_API_KEY = "";
export const getApiKey = async () => {
  const account = await getAccount(wagmiConfig);

  const verificationMessage = (
    await axios.get(`https://api.lighthouse.storage/api/auth/get_message?publicKey=${account.address}`)
  ).data;

  console.log("verificationMessage", verificationMessage);

  if (LIGHTHOUSE_API_KEY === "") {
    const signedmessage = await signMessage(wagmiConfig, { message: verificationMessage });

    const response = await lighthouse.getApiKey(account.address as string, signedmessage);
    console.log("response", response.data.apiKey);
    LIGHTHOUSE_API_KEY = response.data.apiKey;
  }

  return LIGHTHOUSE_API_KEY;
};

export const uploadFile = async file => {
  const apiKey = await getApiKey();
  console.log("file", file);
  let output;

  try {
    output = await lighthouse.upload(file, apiKey, false, null, null);
  } catch (e) {
    console.log(e);
  }
  console.log("File Status:", output);
  /*
    output:
      data: {
        Name: "filename.txt",
        Size: 88000,
        Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
      }
    Note: Hash in response is CID.
  */

  console.log("Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash);

  return output;
};

export const createNewPost = async (post: Post) => {
  const apiKey = await getApiKey();

  const response = await lighthouse.uploadText(JSON.stringify(post), apiKey, post.title);

  console.log(response);
  return response;
};

export const listPosts = async () => {
  const apiKey = await getApiKey();
  const response = await lighthouse.getUploads(apiKey);
  return response;
};
