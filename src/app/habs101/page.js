import { getHabs101Fields } from "@/lib/cms";

const richText =
  "prose max-w-none mt-5 [&_p]:mt-5 [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_li]:mt-3";

export default async function Habs101() {
  const cms = await getHabs101Fields();

  return (
    <div className="px-20 py-10 tracking-wide">
      {/* Breadcrumb */}
      <div className="flex flex-row gap-2 text-sm text-gray-500 mb-8">
        <svg
          className="usa-icon text-gray-500"
          aria-hidden="true"
          focusable="false"
          role="img"
        >
          <use href="/assets/img/sprite.svg#arrow_back"></use>
        </svg>
        <a href="/" className="text-primary hover:underline">
          Home
        </a>
        <span>›</span>
        <span className="text-primary">Literature</span>
        <span>›</span>
        <span className="text-gray-800">HABs 101</span>
      </div>

      <div className="mb-8 mt-10">
        <h1 className="text-primary font-bold">
          {cms?.pageTitle || "Harmful Algal Blooms"}
        </h1>

        {cms?.overviewText && (
          <>
            <p className="mt-10">
              <b>{cms.overviewTitle || "Overview"}</b>
            </p>
            <div
              className={richText}
              dangerouslySetInnerHTML={{ __html: cms.overviewText }}
            />
          </>
        )}

        {cms?.learnMoreText && (
          <>
            <p className="mt-10">
              <b>{cms.learnMoreTitle || "Learn More"}</b>
            </p>
            <div
              className={richText}
              dangerouslySetInnerHTML={{ __html: cms.learnMoreText }}
            />
          </>
        )}
      </div>
    </div>
  );
}
