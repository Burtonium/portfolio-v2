export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  linkedinUrl: string;
  body: string;
  images?: { src: string; alt: string }[];
  links?: { label: string; text: string; href: string }[];
};

const linkedinPost = (urn: string) => `https://www.linkedin.com/feed/update/${urn}/`;

export const posts: Post[] = [
  {
    slug: 'trusting-ai-written-code',
    title: 'Can you trust code that AI wrote for you?',
    date: '2026-11-17',
    summary:
      'Three hard earned lessons from a year of AI-assisted development: full end-to-end tests, mutation testing with Stryker, and manual QA with release gates.',
    linkedinUrl: linkedinPost('urn:li:activity:7528352312071782400'),
    images: [
      {
        src: '/blog/stryker-mutant.png',
        alt: 'A liquidation check where an AI-written test passes on both the original code and a mutant that changes < to <=',
      },
      {
        src: '/blog/stryker-pipeline.png',
        alt: 'Pipeline: AI writes the code and the tests, end-to-end tests on a local chain, mutation testing with Stryker, ship to production',
      },
    ],
    body: `
Can you trust code that AI wrote for you? After a year of working with AI every day, my answer is: not without a babysitter.

Hard earned lesson number one: AI-written code regresses. A lot. So when my team moved to AI workflows I pushed very hard for full end-to-end testing: Playwright driving the whole product against a local blockchain in CI. If the AI broke something a user would notice, CI had to notice first.

Hard earned lesson number two: AI lies about test coverage. You get tests that pass and look thorough but don't actually check much. That's why we added Stryker, which mutates your code on purpose (flips a < into a <=, deletes a line) and reruns your tests. If they still pass, the test is useless. Dumb example attached. Very good call.

Hard earned lesson number three: automated tests aren't the whole story. Manual QA still matters a lot, and so do release gates. One of mine timed our queries on a Neon database branch so performance regressions got caught before deploy.

The result: AI couldn't fake coverage anymore, and we shipped to production with regressions caught before release instead of after.

If your team is leaning on AI to write code, what are you doing to keep it honest?
`,
  },
  {
    slug: 'vampire-tactics-blockchain-indexing',
    title: 'Vampire tactics in crypto and picking a blockchain indexer',
    date: '2024-11-19',
    summary:
      'Pulling competitor user data through Alchemy was far too slow, so I went shopping for an indexing tool before that logic reached production.',
    linkedinUrl: linkedinPost('urn:li:activity:7264598027594600448'),
    links: [
      {
        label: 'Full article on Medium',
        text: 'Vampire Tactics in Crypto: Using Blockchain Indexing Tools to Steal Users',
        href: 'https://medium.com/@matt_5334/vampire-tactics-in-crypto-using-blockchain-indexing-tools-to-steal-users-e182a2fbda91',
      },
    ],
    body: `
If you've sat through enough early crypto startup meetings you'll eventually hear your coworkers talk about vampire strategies. You'll find that Vampire Strategies is something crypto/tech startups do to steal users from their competitors.

I was tasked with helping with this task and immediately recognized how inefficiently we were pulling a ton of data using Alchemy's APIs which was taking way too long. I wanted to nip this in the bud before this logic got to production.

So I start shopping for various analytics/indexing tools that could partition the blockchain for easy querying. Here's how that deliberation happened, which product we ended up picking and why:
`,
  },
  {
    slug: 'merkle-trees',
    title: 'Merkle trees, and investing in yourself',
    date: '2024-03-21',
    summary:
      'A blockchain concept I avoided for six years turned out to be the key to understanding L2s, and to acing a web3 interview.',
    linkedinUrl: linkedinPost('urn:li:share:7176549415329910785'),
    body: `
Merkle trees. A fancy blockchain concept I never fully understood in my 6 years of experience in the blockchain industry because I've tried to laser focus on being the best web2 programmer I could be and I thought this would detract from that. Well, that all changed this year when I got laid off.

Learning how they worked gave me that eureka moment for understanding how many L2 chains actually work and how the main chain can efficiently verify transactions without needing to download the entire blockchain. It was also key to acing a recent web3 interview.

It wasn't cryptographic voodoo that requires a PhD to understand, and I wish I could travel back in time to tell a slightly younger me this. Had I known how easily achievable this would be I would have made the jump to web3 a lot sooner; but the reality of full time work is that you often only focus on the next feature that needs to roll out.

And I have a harsh unemployed crypto winter to thank for this. Buy the dip. Invest in yourself.
`,
  },
  {
    slug: 'ethereum-wallet-from-scratch',
    title: 'An Ethereum web wallet from scratch, no web3 libraries',
    date: '2024-02-27',
    summary:
      'Raw JSON RPCs and raw transactions with React and Vite, and everything EIP-155 taught me about the v in an ECDSA signature.',
    linkedinUrl: linkedinPost('urn:li:share:7168273569167228929'),
    links: [
      {
        label: 'Source code',
        text: 'Burtonium/ethereum-web-wallet-from-scratch',
        href: 'https://github.com/Burtonium/ethereum-web-wallet-from-scratch',
      },
    ],
    body: `
Can you write an Ethereum Web Wallet from scratch without using popular web3 libraries? Stop reading what ChatGPT has to say about the achievements of other candidates; this post is hand-written with a quill in candlelight for some hard learned lessons.

As a personal challenge I built an Ethereum Web Wallet with React, Vite, TailwindCSS, and Tanstack's useQuery but I avoided using web3.js, ethers or your uncle's favorite new web3 library. We're talking raw JSON RPCs and raw transactions here with complete disregard for the training wheels. Full feature list in the README: https://github.com/Burtonium/ethereum-web-wallet-from-scratch

Biggest thing to trip me up was EIP-155. I actually couldn't make simple legacy transactions work without including the chainId at index 6 of my raw transaction array before hashing. I mean, simple replay protection is a good thing, but I learned all about this EIP and the v part of the ECDSA signature the very hard way with sweat and mostly tears.

For those who don't know: in Ethereum's ECDSA signature, the v variable serves as the recovery ID, which, after EIP-155, is calculated using the formula RECOVERY_ID{0...3}+CHAIN_ID×2+35, embedding the chain ID to safeguard against replay attacks and ensuring the signature's uniqueness and validity across different blockchains by adjusting based on the network and the transaction's specifics.
`,
  },
  {
    slug: 'modifying-evm-storage-in-tests',
    title: 'Seeding token balances by modifying EVM storage',
    date: '2024-01-30',
    summary:
      'Skipping a minting cooldown in Hardhat tests by writing straight to contract storage slots, mappings and nested mappings included.',
    linkedinUrl: linkedinPost('urn:li:share:7158146224255070208'),
    links: [
      {
        label: 'Expanded into a Medium article, with the code',
        text: 'Modifying EVM Storage to Seed Token Balances in Testing',
        href: 'https://medium.com/@matt_5334/modifying-evm-storage-to-seed-token-balances-in-testing-a6d58b596ceb',
      },
    ],
    body: `
Looks like it's time to put on our 👷‍♂️ Hardhat(.js) and start testing some Solidity smart contracts because a total 2.7B dollars was lost to smart contract bugs and hacks in 2022. Looks like an opportunity to offer value! Here's the latest thing I was able to do that made me feel amazing while unit testing:

I seeded (or, hacked, if you're a cool kid) myself free NFTs from my ERC1155 contract by modifying the EVM Storage directly! That made quick work of the pesky cooldown my minting function had that would have made testing quite tedious. To accomplish this I had to wrap my head around the idea of slots in Solidity.

For regular data, you can look directly at the smart contract's storage location and then index in the order they appear on your contract. First thing to appear in your storage declarations takes the 0 index for example. For mappings, however, it's a little different. In a mapping(address => uint256 balance) structure, for example, you have to take the hash of the key of your mapping (the address, in this case) concatenated with the index the mapping is at in the contract (lets assume 0).

For nested maps, for example mapping(uint256 tokenId => mapping(address account => uint256 balance)), you first hash the tokenId you want and the storage slot (0), and then hash the address whose balance you want with the result of the first hash.

I implemented this year's great NFT heist using web3's new library viem. I chose viem because it had awesome Typescript support which I absolutely love 😍. Using such a new library wasn't without its challenges though (still cant figure out why npx hardhat test run fine but npx hardhat coverage doesn't?), and it was a lot harder to use than ethers/web3.js due to it being so new and having less resources online. Overall, though, exciting breakthrough for me.
`,
  },
  {
    slug: 'first-steps-in-solidity',
    title: 'First steps in Solidity: The Ethereal Forge',
    date: '2024-01-25',
    summary:
      'Three weeks into a Solidity bootcamp: an ERC1155 contract and a forging contract on Sepolia, wired up to a Next.js frontend.',
    linkedinUrl: linkedinPost('urn:li:share:7156181000232878080'),
    body: `
Three weeks ago, I took a leap into the fascinating world of blockchain technology by enrolling in a Web3 Solidity bootcamp offered by Metana. Today, I am thrilled to share some exciting milestones from this journey.

Highlights of My Progress:

- Successfully deployed an ERC1155 contract alongside a unique forging contract. These are now live on the Sepolia network, marking my first official step into the decentralized web. https://testnets.opensea.io/collection/the-ethereal-forge
- Seamlessly integrated these contracts with a frontend built using Next.js and the powerful eth-scaffold-2 framework, ensuring a user-friendly experience for interacting with the blockchain. https://the-ethereal-forge.vercel.app/
- Ensured transparency and collaboration by making the entire source code publicly available on GitHub: https://github.com/Burtonium/the-ethereal-forge

This journey is more than just learning; it's about transforming and being part of the revolution in how we interact with the digital world. I am eager to continue this path and contribute to the blockchain ecosystem.
`,
  },
  {
    slug: 'never-run-foreign-code',
    title: 'Never run foreign code from a coding assignment',
    date: '2023-12-22',
    summary: 'A credentials stealer hidden in the first line of a take-home assignment.',
    linkedinUrl: linkedinPost('urn:li:share:7143817590128226304'),
    body: `
For the love of god please do not run foreign code on your machine for coding assignments. There was this obfuscated credentials stealer hidden after a long comment in the first line of code in a coding assignment I was sent. Be safe out there.
`,
  },
  {
    slug: 'underrated-engineering-values',
    title: 'Underrated things in software engineering',
    date: '2023-10-30',
    summary:
      'Semantic conventions, resisting excessive DRY, and knowing when technical debt is a necessary evil.',
    linkedinUrl: linkedinPost('urn:li:activity:7124750948450668544'),
    body: `
Underrated things that nobody else cared as much as I did late in my career as a software engineer:

Semantic conventions. Making the whole team agree that certain components/features/services have a specific name and should be referenced as such in the code. If a service is called ezpay then all code referencing it should mention by name. Too many times have I seen a product have multiple names; confusing anyone coming to the codebase for the first time. The classic example is a rename of a product where the old code referencing the old name and new code referencing the new name. Take the effort to do the refactor. It's an excellent and valuable task for a beginner at the company.

Excessive DRY-ing. Not everything needs to be an abstraction. I often see abstractions that grow overly complex and become a pain point for the our team because it wasn't meant to be abstracted. Think about the true cost of duplication. A little bit of duplication is fine compared to an abstraction that takes up half your day only to avoid copy pasting some code twice. Embrace where ctrl-f ctrl-v mentality and or find-replace regex jutsu wherever it makes sense; it's not that expensive. Here's a dumb example. You see a page title with fancy little doodads at the top of all your pages. You abstract out a AppTitle component when really, duplicated html+css would have been just fine.

Over-refactoring and not realizing when technical debt is a necessary evil. Developers that obsess too much about code quality can really slow down development and frustrate feature-mill project managers everywhere. There are times when utilizing your career capital convincing management that you need to get things right makes sense. Core aspects of your application where you want to architect for extensibility instead of having to do expensive refactors down the road, for example. But if you find yourself agonizing too much about contributions to your codebase refactoring other people's work in order to be absolutely perfect and consistent with your coding style, you might be falling into this very insidious trap.
`,
  },
];

export const getPost = (slug: string) => posts.find(post => post.slug === slug);

export const formatDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
