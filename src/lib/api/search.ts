import { UnifiedQuote } from "./quotes";
import { filterMockQuotesByKeyword, filterMockQuotesByAuthor, mockQuotes } from "./mock";

type LengthFilter = "short" | "medium" | "long";

interface SearchParams {
  keywords?: string;
  author?: string;
  lengths?: LengthFilter[];
}

// Helper function to filter quotes by length
function filterByLength(quotes: UnifiedQuote[], lengths: LengthFilter[]): UnifiedQuote[] {
  if (!lengths || lengths.length === 0) return quotes;

  return quotes.filter(quote => {
    if (lengths.includes("short") && quote.length <= 75) return true;
    if (lengths.includes("medium") && quote.length > 75 && quote.length <= 150) return true;
    if (lengths.includes("long") && quote.length > 150) return true;
    return false;
  });
}

// Main search function that combines all filters
export async function searchQuotes(params: SearchParams): Promise<UnifiedQuote[]> {
  const { keywords, author, lengths } = params;
  
  // If no search parameters are provided, return all quotes
  if (!keywords && !author && (!lengths || lengths.length === 0)) {
    return mockQuotes;
  }

  let results: UnifiedQuote[] = [];

  // Search by keyword if provided
  if (keywords) {
    // Split keywords by comma and trim whitespace
    const keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k.length > 0);
    
    if (keywordArray.length > 0) {
      // Create a Set to track unique quotes (by quote text) that match any keyword
      const uniqueQuotes = new Set<string>();
      const allKeywordResults: UnifiedQuote[] = [];
      
      // Process each keyword and collect matching quotes
      for (const keyword of keywordArray) {
        const keywordResults = await filterMockQuotesByKeyword(keyword);
        
        // Add each quote to our results if we haven't seen it before
        for (const quote of keywordResults) {
          if (!uniqueQuotes.has(quote.quote)) {
            uniqueQuotes.add(quote.quote);
            allKeywordResults.push(quote);
          }
        }
      }
      
      // Set the results to all quotes that matched any keyword
      results = allKeywordResults;
    }
  }

  // Search by author if provided
  if (author) {
    const authorResults = await filterMockQuotesByAuthor(author);
    
    // If we already have keyword results, find the intersection
    if (results.length > 0) {
      // Create a map of existing quotes for faster lookup
      const existingQuotes = new Map(
        results.map(quote => [quote.quote, quote])
      );
      
      // Only keep quotes that match both keyword and author
      results = authorResults.filter(quote => 
        existingQuotes.has(quote.quote)
      );
    } else {
      // If no keyword search was done, just use author results
      results = authorResults;
    }
  }

  // If neither keyword nor author was provided, use all quotes
  if (!keywords && !author) {
    results = [...mockQuotes];
  }

  // Apply length filters if provided
  if (lengths && lengths.length > 0) {
    results = filterByLength(results, lengths);
  }

  return results;
}
