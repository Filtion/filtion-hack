import lighthouse from "@lighthouse-web3/sdk";
import { getAccount, signMessage } from "@wagmi/core";
import axios from "axios";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import kavach from "@lighthouse-web3/kavach"


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


  console.log("Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash);

  return output;
};

export const createNewPost = async (post: Post) => {
  const apiKey = await getApiKey();

  const response = await lighthouse.uploadText(JSON.stringify(post), apiKey, post.title);

  console.log(response);
  return response;
};

export const createNewNote = async (post: Post) => {
  const apiKey = await getApiKey();
  const account = await getAccount(wagmiConfig);
  console.log("post", post)

  const authMessage = await kavach.getAuthMessage(account.address as string)
  console.log("AuthMessage:", authMessage)

  // const signedMessage = await signer.signMessage(authMessage.message)
  // console.log("SignedMessage:", signedMessage)

  const signedmessage = await signMessage(wagmiConfig, { message: authMessage.message as string });
  let response;
  try {
    response = await lighthouse.textUploadEncrypted(JSON.stringify({ message: post.body }), apiKey, account.address as string, signedmessage);

  } catch (e) {
    console.log(e);

  }
  console.log(response);

  await decrypt(response.data.Hash as string)

  return response;
};

export const listPosts = async () => {
  const apiKey = await getApiKey();
  const response = await lighthouse.getUploads(apiKey);
  return response;
};

export const listNotes = async () => {
  const apiKey = await getApiKey();
  const response = await lighthouse.getUploads(apiKey);
  const encryptedUploads = response.data.fileList.filter(upload => upload.encryption === true);

  return encryptedUploads;
};


const signAuthMessage = async () => {
  const account = await getAccount(wagmiConfig);

  const messageRequested = (await lighthouse.getAuthMessage(account.address as string)).data.message
  const signedMessage = await signMessage(wagmiConfig, { message: messageRequested as string });
  return signedMessage
}

const decrypt = async (cid) => {

  const account = await getAccount(wagmiConfig);

  // Get file encryption key
  const signedMessage = await signAuthMessage()
  console.log("decrypt cid", cid)
  const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
    cid,
    account.address,
    signedMessage
  )

  // Decrypt File
  const decrypted = await lighthouse.decryptFile(
    cid,
    fileEncryptionKey.data.key as string
  )

  console.log(decrypted)
  const ciddata = await decrypted.text()
  console.log(ciddata)



  // Save File
}