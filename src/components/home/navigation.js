"use client";
import Link from "next/link";

export default function Navigation({ toolsList = [] }) {
  // 1. Group the flat array of posts into their categories dynamically
  const groupedTools = toolsList.reduce((acc, tool) => {
    // FIXED: Must match the exact GraphQL property name we just updated
    const fields = tool.quickAccessKeyToolsConnector || {};
    
    // Extract the label configured in ACF
    let categoryLabel = fields.toolCategory;
    if (Array.isArray(categoryLabel)) categoryLabel = categoryLabel[0];
    
    // If the category is somehow blank, only then does it fall back
    categoryLabel = categoryLabel || "Laws and Permits"; 

    if (!acc[categoryLabel]) {
      acc[categoryLabel] = [];
    }
    
    // Map the WordPress fields directly to your original component's expected props
    acc[categoryLabel].push({
      title: tool.title,
      description: fields.toolDescription || "",
      href: fields.toolLink || "#",
      icon: fields.toolIcon || "star",
    });

    return acc;
  }, {});

  const categories = Object.keys(groupedTools);
  
  // Separate the first category to keep your full-width layout, and group the rest for the split layout
  const firstCategory = categories[0];
  const remainingCategories = categories.slice(1);

  if (categories.length === 0) return null;

  return (
    <section className="w-full px-4 py-8 tracking-wide sm:px-6 sm:py-10 lg:px-10 xl:px-20">
      <p className="text-sm font-semibold text-green">RESOURCE NAVIGATION</p>

      <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
        Quick Access to Key Tools
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
        Easily find permits, research, technologies, and approved products related to HAB control.
      </p>

      {/* Primary Section */}
      {firstCategory && (
        <ToolSection
          title={firstCategory}
          items={groupedTools[firstCategory]}
          className="mt-8"
          gridClassName="md:grid-cols-2 xl:grid-cols-3"
        />
      )}

      {/* Secondary Sections */}
      {remainingCategories.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
          {remainingCategories.map((category, index) => (
            <ToolSection
              key={category}
              title={category}
              items={groupedTools[category]}
              gridClassName={index === 0 ? "md:grid-cols-2" : ""}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// ... Keep your ToolCard and ToolSection UI functions exactly the same as before ...
function ToolCard({ item }) {
  return (
    <Link
      href={item.href}
      className="group block h-full rounded-md border border-gray-300 bg-white p-4 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(0,94,162,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <svg
            className="usa-icon mt-0.5 shrink-0 text-xl text-black transition-colors duration-300 group-hover:text-primary"
            aria-hidden="true"
            focusable="false"
            role="img"
          >
            <use href={`/assets/img/sprite.svg#${item.icon}`}></use>
          </svg>

          <div className="min-w-0">
            <p className="font-semibold leading-snug text-black group-hover:text-primary transition-colors duration-300">
              {item.title}
            </p>
            <p className="mt-1 text-sm leading-snug text-gray-700">
              {item.description}
            </p>
          </div>
        </div>

        <svg
          className="usa-icon mt-0.5 shrink-0 text-xl text-gray-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden="true"
          focusable="false"
          role="img"
        >
          <use href="/assets/img/sprite.svg#launch"></use>
        </svg>
      </div>
    </Link>
  );
}

function ToolSection({ title, items, className = "", gridClassName = "" }) {
  return (
    <fieldset
      className={`rounded-xl border border-primary px-4 py-6 font-medium sm:px-6 sm:py-8 lg:px-8 ${className}`}
    >
      <legend className="px-2 text-base font-medium text-primary">
        {title}
      </legend>

      <div className={`mt-4 grid grid-cols-1 gap-4 sm:gap-6 ${gridClassName}`}>
        {items.map((item) => (
          <ToolCard key={item.title} item={item} />
        ))}
      </div>
    </fieldset>
  );
}