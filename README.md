# Pack Creation Script

A simple script to demonstrate how to bundle NFTs into packs for the [Pack](https://portal.thirdweb.com/sdk/interacting-with-contracts/pack) contract.

## How to Use This Script

1. Create a copy of this template on your local machine:

```bash
npx thirdweb@latest create --template pack-creation-script
```

2. Setup your private key to sign transactions:

NOTE: in this repository, we use environment variables to store our private key.

We strongly recommend reading our [Securely Storing Private Keys](https://portal.thirdweb.com/sdk/set-up-the-sdk/securing-your-private-key) guide to learn more about how to securely store your private key.

Create a `.env` file in the root of your project and add your private key:

```bash
PRIVATE_KEY=xxx
```

3. In the [index.ts](./src/index.ts) file, update all of the variables at the top of the file to match your project.

4. From line `30` onwards, you can configure the packs you want to create and the tokens you want to include in each pack.

5. Run the script to create your packs:

```bash
npx ts-node src/index.ts
```

## Questions?

Jump into our [Discord](https://discord.com/invite/thirdweb) to speak with us directly.
