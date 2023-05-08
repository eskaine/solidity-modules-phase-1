# Build ERC1155 token with a Frontend

UI Frontend: [Demo Link](https://erc1155-game-items.vercel.app/)

Forging Contract: [Link](https://mumbai.polygonscan.com/address/0x4e972bd4c30976ebbc78ba0d26ba76798c01acd9)

ERC1155 Contract: [Link](https://mumbai.polygonscan.com/address/0xFa4a5B6ADD649eD99c00Cd60Cb5f82978cd018C7)

## Setup Frontend

1. cd client
2. npm install
3. add a .env file with "POLYGONSCAN_API_KEY"
4. run "npm run dev"
5. Go to your browser at http://localhost:3000

## ERC1155 Concept - Game Items
Based on the Deliverables, this ERC1155 contract will be implemented in the form of game items as it will be easier to visualize in this manner.
- Token 0-2 will be raw materials.
- Token 3-6 will be equipments.

## Deliverables
Integrating with metamask is fairly simple, much of the work this week will be on the front-end design. Here is what needs to be accomplished by the end:

There are three new concepts you must master:

1. Creating that transactions that return instantly (such as from a view or pure function)
2. Creating transactions that change the state of the blockchain and thus must be asynchronous. Dealing with an pending transactions is not trivial!
3. Changing the network of metamask to the appropriate one

You will build an ERC1155 token with a front-end. Here are the requirements:
- You must have a total of 7 tokens within the collection id [0-6]
- There is no supply limit for each token
- Anyone can mint tokens [0-2], but there is a 1-minute cooldown between mints. These are free to mint except for the gas cost.
- Token 3 can be minted by burning token 0 and 1.
- Token 4 can be minted by burning token 1 and 2
- Token 5 can be minted by burning 0 and 2
- Token 6 can be minted by burning 0, 1, and 2
- Tokens [3-6] cannot be forged into other tokens
- Tokens [3-6] can be burned but you get nothing back
- You can trade any token for [0-2] by hitting the trade this button.
- The process of burning and minting is called forging in this context.
- The webapp must tell the user how much matic they have (we will use the polygon network for cost savings)
- The webapp must tell the user how much of each token they have
- Provide a link to the OpenSea page somewhere
- <b>Important</b> if the website detects someone is not on the polygon network, it must prompt them to change and autofill the feeds for changing the network (lesson on this later)
- <b>Important</b> please use some styling on this website to make it look nice (bootstrap, tailwind CSS, etc). This is something you can show to future employers or business partners.
- You must use 2 separate contracts. One for the ERC1155 token, and one for the forging logic. The forging logic will need mint privileges.
