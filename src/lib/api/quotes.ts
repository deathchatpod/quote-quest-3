const STANDS4_UID = "13265";
const STANDS4_TOKENID = "sY1GYysANQU5Z1Au";

// Search for quotes using the Stands4.com Quotes API
export async function searchQuotesByKeyword(keyword: string) {
  const response = await fetch(
    `https://www.stands4.com/services/v2/quotes.php?uid=${STANDS4_UID}&tokenid=${STANDS4_TOKENID}&searchtype=SEARCH&query=${encodeURIComponent(
      keyword
    )}&format=json`
  );
  const json = await response.json();
  return json.result.map((item: { quote: string; author: string }) => ({
    quote: item.quote,
    author: item.author || "Unknown",
    source: "Stands4.com",
    length: item.quote?.length || 0,
  }));
}

export async function searchQuotesByAuthor(author: string) {
  const response = await fetch(
    `https://www.stands4.com/services/v2/quotes.php?uid=${STANDS4_UID}&tokenid=${STANDS4_TOKENID}&searchtype=AUTHOR&query=${encodeURIComponent(
      author
    )}&format=json`
  );
  const json = await response.json();
  return json.result.map((item: { quote: string; author: string }) => ({
    quote: item.quote,
    author: item.author || "Unknown",
    source: "Stands4.com",
    length: item.quote?.length || 0,
  }));
}

// Search for parables/famous phrases using ZenQuotes API (returns random if no keyword, so we filter manually)
export async function searchParablesByKeyword(keyword: string) {
  // ZenQuotes does not support keyword search directly, so fetch a batch and filter
  const response = await fetch("https://zenquotes.io/api/quotes");
  if (!response.ok) throw new Error("Failed to fetch parables");
  const json = await response.json();
  // Format data to match our expected schema
  const data = json.map((item: any) => ({
    quote: item.q,
    author: item.a || "Unknown",
    source: "ZenQuotes",
    length: item.q?.length || 0,
  }));
  // Filter quotes containing the keyword (case-insensitive)
  return data.filter(
    (item: any) =>
      item.quote.toLowerCase().includes(keyword.toLowerCase()) ||
      (item.author && item.author.toLowerCase().includes(keyword.toLowerCase()))
  );
}

// Search for lyrics using the Lyrics.ovh API (returns lyrics for a song, so we use keyword as song or artist)
export async function searchLyricsByKeyword(keyword: string) {
  // Lyrics.ovh does not support search, so we use lyrics-api (lyrics-api.com) as a public alternative
  const response = await fetch(
    `https://api.lyrics.ovh/v1/${encodeURIComponent(
      keyword
    )}/${encodeURIComponent(keyword)}`
  );
  // Note: This API expects artist and title, but for demo purposes, we use keyword for both
  if (!response.ok) throw new Error("Failed to fetch lyrics");
  return response.json();
}

// Combine all sources and map to a unified schema
export interface UnifiedQuote {
  quote: string;
  author: string;
  source: string;
  length: number;
}

export async function searchAllQuotes(keyword: string) {
  const [parables, quotes] = await Promise.all([
    searchParablesByKeyword(keyword),
    searchQuotesByKeyword(keyword),
  ]);

  return [...parables, ...quotes];
}
