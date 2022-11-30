import { ChainOrRpc, ThirdwebSDK } from "@thirdweb-dev/sdk";
import "dotenv/config";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { readFileSync } from "fs";

// === UPDATE THESE VALUES TO MATCH YOUR CONTRACT AND NETWORK ===
const EDITION_ADDRESS = "0x73197DBbFFad473e6917dBE790b927B61E831219"; // The address of the edition contract
const PACK_ADDRESS = "0xd8Bd34726814855fB9cFF58fe5372558e3B411Cb"; // Pack Smart Contract Address
const network: ChainOrRpc = "optimism-goerli"; // The network your contracts are deployed to
const PRIVATE_KEY = process.env.PRIVATE_KEY!; // Read the README for how to set this up in a .env file
const lootBoxImageFileName = "lootbox.png"; // The name of the image file you want to be used for the lootbox metadata
// NOTE: You will also need to configure line `30` onwards to configure your pack rewards.
// ============================================================================================================

(async () => {
  try {
    // Instantiate the SDK with our private key onto the network
    const sdk = ThirdwebSDK.fromPrivateKey(PRIVATE_KEY, network);
    const storage = new ThirdwebStorage();

    // Connect to the edition and pack contracts
    const edition = await sdk.getContract(EDITION_ADDRESS, "edition");
    const pack = await sdk.getContract(PACK_ADDRESS, "pack");

    // Set approval for the pack contract to transfer our edition NFTs (items)
    await edition.setApprovalForAll(PACK_ADDRESS, true);
    console.log("🟢 Approved pack contract to transfer edition NFTs");

    // === UPDATE THESE VALUES TO CONFIGURE YOUR PACK REWARDS ===
    await pack.create({
      packMetadata: {
        name: "Loot Box",
        description: "Open this to reveal an in-game item!",
        image: await storage.upload(
          readFileSync(`${__dirname}/${lootBoxImageFileName}`)
        ),
        attributes: {
          artist: "@GabrielAguiarProd",
        },
      },
      erc1155Rewards: [
        {
          contractAddress: EDITION_ADDRESS,
          tokenId: 0,
          quantityPerReward: 1,
          totalRewards: 400,
        },
        {
          contractAddress: EDITION_ADDRESS,
          tokenId: 1,
          quantityPerReward: 1,
          totalRewards: 100,
        },
      ],
      // In this example, we specify 1 reward per pack, and there is 400+100 total rewards, so we will have 500 packs created.
      rewardsPerPack: 1,
    });

    console.log("🟢 Succesfully bundled and created packs 🎉");
    console.log("Check your dashboard to see the packs you created:");
    console.log(`https://thirdweb.com/${network}/${PACK_ADDRESS}/nfts`);
  } catch (e) {
    console.log("🔴 FAILED! Error creating packs:", e);
    console.log("Try the following to resolve the issue:");
    console.log(
      "> Ensure you have configure the correct network and contract addresses"
    );
    console.log("> Ensure you have set your PRIVATE_KEY in a .env file");
    console.log(
      "> Ensure you have configured the pack rewards correctly (and the math adds up)"
    );
  }
})();
