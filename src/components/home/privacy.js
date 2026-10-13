export default function Privacy({ cms }) {
  if (!cms?.privacyInformation) return null;

  return (
    <div id="privacy-policy" className="px-20 pb-10 tracking-wide scroll-mt-28">
      <p className="text-green font-bold text-sm uppercase">Privacy</p>
      <p className="font-bold text-3xl text-black mt-1">
        {cms.privacyHeader || "Privacy Policy"}
      </p>
      {cms.privacyDate && (
        <p className="text-sm text-gray-600 mt-4 italic">{cms.privacyDate}</p>
      )}

      <div
        className="prose max-w-none mt-5 text-light leading-relaxed [&_strong]:font-bold [&_b]:font-bold"
        dangerouslySetInnerHTML={{ __html: cms.privacyInformation }}
      />
    </div>
  );
}
