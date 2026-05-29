import { useEffect } from "react";

// Sets document.title for the current route and restores the previous title on
// unmount. The prebuilt OG pages give crawlers correct tags, but client-side
// navigation never updates the title without this, so every SPA route would
// otherwise keep the home page's title.
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
