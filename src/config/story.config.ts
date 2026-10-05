export interface StorySection {
  tagline: string;
  heading: string;
  bengaliHeading?: string;
  paragraphs: string[];
  quote?: string;
  stats?: { label: string; value: string }[];
}

export const storyConfig = {
  hero: {
    eyebrow: "Our Heritage & Philosophy",
    title: "The RizqHub Journey",
    bengaliSubtitle: "নৈতিক ফ্যাশন ও প্রিমিয়াম কারুশিল্পের নতুন দিগন্ত",
    lead: "Born from a passion for ethical craft and timeless simplicity. At RizqHub, we set out to prove that world-class menswear can be designed, woven, and tailored with integrity right here in Bangladesh.",
  },
  sections: [
    {
      tagline: "The Genesis",
      heading: "Purpose-Driven Essentials for the Modern Wardrobe",
      bengaliHeading: "যেখান থেকে পথচলার শুরু",
      paragraphs: [
        "RizqHub was founded on a simple conviction: everyday menswear should be comfortable, sustainable, and crafted from high-density natural textiles.",
        "Instead of chasing fleeting seasonal trends, we obsess over relaxed silhouettes, immaculate seams, and natural fabrics that grow softer with every wear.",
      ],
      quote: "True quality is found in the weight of every thread, the precision of each cut, and the dignity of every tailor.",
    },
    {
      tagline: "The Craft",
      heading: "Mastering Fabric Density & Natural Weaves",
      bengaliHeading: "ফেব্রিক এবং কারুশিল্প",
      paragraphs: [
        "We source double-brushed cotton, structured jacquard textures, and breathable weaves directly from local artisan mills. Every design undergoes rigorous wear testing to ensure durability.",
        "From relaxed Cuban collar shirts to structured boxy cuts, our pieces are tailored for year-round comfort across diverse occasions.",
      ],
      stats: [
        { label: "Fabric Density", value: "220+ GSM" },
        { label: "Hand-Finished", value: "100%" },
        { label: "Satisfied Customers", value: "25,000+" },
      ],
    },
    {
      tagline: "The Commitment",
      heading: "Timeless Comfort. Honest Craftsmanship.",
      bengaliHeading: "ভবিষ্যতের প্রতিশ্রুতি",
      paragraphs: [
        "Today, RizqHub stands as a symbol of thoughtful simplicity and accessible luxury.",
        "Our promise is simple: to create garments that look exceptional, feel incredible, and stay with you for years to come.",
      ],
    },
  ] as StorySection[],
};
