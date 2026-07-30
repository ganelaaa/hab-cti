import GlossaryClient from "./GlossaryClient";
import { getAllGlossaryPosts } from "@/lib/cms";

export default async function GlossaryPage() {
  const glossaryEntries =
    await getAllGlossaryPosts();

  return (
    <GlossaryClient
      entries={glossaryEntries}
    />
  );
}