"use server";

/**
 * Server action to handle form submission for quote search
 */
export async function searchFormAction(formData: FormData) {
  const keywords = (formData.get("keywords") as string) || "";
  const author = (formData.get("author") as string) || "";
  const lengths = formData.getAll("lengths") as string[];

  // Build the search parameters
  const searchParams = new URLSearchParams({
    keywords: keywords.trim(),
    author: author.trim(),
    lengths: lengths.join(","),
  });

  if (keywords && keywords.trim() !== "") {
    searchParams.set("keywords", keywords.trim());
  }

  if (author && author.trim() !== "") {
    searchParams.set("author", author.trim());
  }

  if (lengths && lengths.length > 0) {
    searchParams.set("lengths", lengths.join(","));
  }

  // Return the URL for client-side navigation
  return `/search?${searchParams.toString()}`;
}
