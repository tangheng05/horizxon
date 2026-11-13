export type Link = { label: string; href: string };

export type Product = {
  id: string;
  name: string;
  mark: string;
  status: string;
  live: boolean;
  summary: string;
  facts: string[];
  links: Link[];
};

export type Tool = { name: string; summary: string; kind: string; href: string };

export type ToolGroup = { title: string; note: string; tools: Tool[] };

const gh = (repo: string) => `https://github.com/tangheng05/${repo}`;

export const products: Product[] = [
  {
    id: "checksen",
    name: "CheckSen",
    mark: "/work/checksen.svg",
    status: "Live on Telegram",
    live: true,
    summary:
      "Not sure if a message, link, KHQR code or file is a scam? Forward it to CheckSen. It replies in Khmer or English with the risk, the reasons and what to do.",
    facts: [
      "Checks texts, links, KHQR codes, screenshots, files and voice notes",
      "Can quietly guard a family or work group",
      "Free, with nothing to install",
    ],
    links: [
      { label: "Open in Telegram", href: "https://t.me/CheckSen_bot" },
      { label: "Website", href: "https://checksen.horizxon.tech" },
      { label: "Code", href: gh("checksen") },
    ],
  },
  {
    id: "samleng",
    name: "Samleng",
    mark: "/work/samleng.svg",
    status: "In training",
    live: false,
    summary:
      "A Khmer voice that sounds native and reads in real time on an ordinary computer, plus the first open benchmark for Khmer speech, rated by people.",
    facts: [
      "KhmerTTS-Bench: 320 sentences, published on Hugging Face",
    ],
    links: [
      {
        label: "Benchmark",
        href: "https://huggingface.co/datasets/hengthegoat/khmertts-bench-v1",
      },
      { label: "Code", href: gh("samleng-tts") },
    ],
  },
];

export const toolGroups: ToolGroup[] = [
  {
    title: "Payments in Cambodia",
    note: "Building blocks for taking money through Bakong KHQR.",
    tools: [
      {
        name: "khqr-rs",
        summary:
          "KHQR, Bakong's payment QR standard, in Rust. Runs in a CLI, a browser or a POS terminal.",
        kind: "Rust crate",
        href: gh("khqr-rs"),
      },
      {
        name: "dual-rail",
        summary:
          "Card payments through Stripe and bank-app payments through KHQR, behind one API and one ledger.",
        kind: "Rust service",
        href: gh("dual-rail"),
      },
    ],
  },
  {
    title: "Mac menu bar apps",
    note: "Small, quiet apps we use every day.",
    tools: [
      {
        name: "clawdmeter",
        summary:
          "Shows what Claude Code is doing and how much of your usage limit is left.",
        kind: "macOS app",
        href: gh("clawdmeter"),
      },
      {
        name: "macpeek",
        summary:
          "VPN status, CPU, memory, network, disk and battery, at a glance.",
        kind: "macOS app",
        href: gh("macpeek"),
      },
      {
        name: "clippeek",
        summary:
          "Screenshots and recordings go straight to your own Zipline server, not the Desktop.",
        kind: "macOS app",
        href: gh("clippeek"),
      },
    ],
  },
  {
    title: "Small tools",
    note: "Problems we hit once and solved for good.",
    tools: [
      {
        name: "Shop Feedback",
        summary:
          "Customers scan a QR code in the store, and their note lands in that store's Telegram topic.",
        kind: "Telegram bot",
        href: gh("feedback"),
      },
      {
        name: "chain-rpc-balancer",
        summary:
          "Keeps traffic away from blockchain nodes that are stuck, resyncing or too slow.",
        kind: "HAProxy agent",
        href: gh("chain-rpc-balancer"),
      },
    ],
  },
];

export const websites: Link[] = [
  { label: "bassty.org", href: "https://bassty.org" },
  { label: "vengvouchly.shop", href: "https://vengvouchly.shop" },
];

export const contact = {
  email: "horizxon.limited@gmail.com",
  social: [
    { label: "GitHub", href: "https://github.com/tangheng05" },
    { label: "Instagram", href: "https://www.instagram.com/horizxon.tech/" },
    { label: "TikTok", href: "https://www.tiktok.com/@horizxon.limited" },
  ],
};
