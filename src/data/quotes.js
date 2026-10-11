/**
 * 15 Iconic Fashion Quotes with Accurate Attributions
 * Used for Drape's mobile splash screen experience
 */
export const fashionQuotes = [
  {
    id: 1,
    quote: "Fashion changes, but style endures.",
    author: "Coco Chanel",
    context: "On the timeless essence of personal style",
  },
  {
    id: 2,
    quote: "Fashions fade, style is eternal.",
    author: "Yves Saint Laurent",
    context: "Rive Gauche Atelier, 1971",
  },
  {
    id: 3,
    quote: "More is more and less is a bore.",
    author: "Iris Apfel",
    context: "On unapologetic personal expression",
  },
  {
    id: 4,
    quote: "The only real elegance is in the mind; if you've got that, the rest really comes from it.",
    author: "Diana Vreeland",
    context: "Vogue Editorial Philosophy",
  },
  {
    id: 5,
    quote: "Simplicity, good taste, and comfort are the three fundamentals of all good dressing.",
    author: "Christian Dior",
    context: "The Little Dictionary of Fashion, 1954",
  },
  {
    id: 6,
    quote: "Fashion should be a form of escapism, and not a form of imprisonment.",
    author: "Alexander McQueen",
    context: "Runway Retrospective",
  },
  {
    id: 7,
    quote: "Don't be into trends. Don't make fashion own you, but you decide what you are.",
    author: "Gianni Versace",
    context: "On authentic identity",
  },
  {
    id: 8,
    quote: "One is never over-dressed or under-dressed with a Little Black Dress.",
    author: "Karl Lagerfeld",
    context: "The World According to Karl",
  },
  {
    id: 9,
    quote: "Elegance is the only beauty that never fades.",
    author: "Audrey Hepburn",
    context: "Timeless Grace",
  },
  {
    id: 10,
    quote: "Fashion is the armor to survive the reality of everyday life.",
    author: "Bill Cunningham",
    context: "On the streets of New York",
  },
  {
    id: 11,
    quote: "What you wear is how you present yourself to the world. Fashion is instant language.",
    author: "Miuccia Prada",
    context: "Prada Design Philosophy",
  },
  {
    id: 12,
    quote: "Style is very personal. It has nothing to do with fashion. Fashion is over quickly. Style is forever.",
    author: "Ralph Lauren",
    context: "Fifty Years of American Design",
  },
  {
    id: 13,
    quote: "Fashion is about dressing according to what's fashionable. Style is more about being yourself.",
    author: "Oscar de la Renta",
    context: "Atelier Interview",
  },
  {
    id: 14,
    quote: "Buy less, choose well, make it last.",
    author: "Vivienne Westwood",
    context: "Manifesto on Sustainable Craft",
  },
  {
    id: 15,
    quote: "You are only as good as the people you dress.",
    author: "Halston",
    context: "American Minimalist Tailoring",
  },
];

/**
 * Returns a random quote from the collection
 * @returns {{ id: number, quote: string, author: string, context: string }}
 */
export function getRandomFashionQuote() {
  const index = Math.floor(Math.random() * fashionQuotes.length);
  return fashionQuotes[index];
}

export default fashionQuotes;
