import Link from "next/link";
import { getPrivacyPageFields } from "@/lib/cms";

export default async function PrivacyPolicyPage() {
  const cms = await getPrivacyPageFields();

  const sections = [
    [cms?.sectionOneTitle, cms?.sectionOneInformation],
    [cms?.sectionTwoTitle, cms?.sectionTwoInformation],
    [cms?.sectionThreeTitle, cms?.sectionThreeInformation],
    [cms?.sectionFourTitle, cms?.sectionFourInformation],
    [cms?.sectionFiveTitle, cms?.sectionFiveInformation],
    [cms?.sectionSixTitle, cms?.sectionSixInformation],
    [cms?.contactUs, cms?.contactUsInformation],
  ]
    .map(([title, text]) => ({ title, text }))
    .filter((s) => s.title && s.text);

  return (
    <main>
      <div className="px-20 pt-10 tracking-wide">
        <p className="text-sm text-gray-600">
          <Link href="/" className="underline">
            Home
          </Link>{" "}
          › Privacy Policy
        </p>
        <h1 className="text-primary font-bold text-4xl mt-4">
          {cms?.title || "Privacy Policy"}
        </h1>
        {cms?.lastUpdated && (
          <p className="text-sm text-gray-600 mt-2">{cms.lastUpdated}</p>
        )}
      </div>

      <div className="px-20 py-10 tracking-wide">
        {cms?.introText && (
          <div
            className="prose max-w-none text-light leading-relaxed"
            dangerouslySetInnerHTML={{ __html: cms.introText }}
          />
        )}
        {sections.map((s) => (
          <section key={s.title} className="mt-8">
            <h2 className="text-primary font-bold text-2xl">{s.title}</h2>
            <div
              className="prose max-w-none mt-3 text-light leading-relaxed [&_ul]:list-disc [&_ul]:ml-6 [&_strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: s.text }}
            />
          </section>
        ))}
      </div>
    </main>
  );
}
