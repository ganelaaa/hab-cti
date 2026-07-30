"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";

function slugify(value) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function getAlphabeticTerm(term = "") {
    return term
        .trim()
        .replace(/^[^\p{L}\p{N}]+/u, "")
        .trim();
}

function getFirstLetter(term = "") {
    const cleanedTerm = getAlphabeticTerm(term);
    const firstLetter = cleanedTerm.charAt(0).toUpperCase();

    return /^[A-Z]$/.test(firstLetter) ? firstLetter : "#";
}

function GlossaryDefinition({ content }) {
    if (!content) {
        return null;
    }

    const formattedContent = formatCmsLinks(content);

    return (
        <div
            className="
                glossary-definition
                mt-3
                text-base
                leading-7
                text-gray-800

                [&_p]:mt-0
                [&_p+p]:mt-4

                [&_a]:text-primary
                [&_a]:underline
                [&_a]:underline-offset-2
                [&_a:hover]:text-primary-darker
                [&_a:focus-visible]:rounded-sm
                [&_a:focus-visible]:outline
                [&_a:focus-visible]:outline-2
                [&_a:focus-visible]:outline-offset-2

                [&_ul]:mt-3
                [&_ul]:ml-6
                [&_ul]:pl-5
                [&_ul]:space-y-1
                [&_ul]:!list-disc

                [&_ul_ul]:mt-1
                [&_ul_ul]:!list-[circle]

                [&_ul_ul_ul]:!list-[square]

                [&_ol]:mt-3
                [&_ol]:ml-6
                [&_ol]:pl-5
                [&_ol]:space-y-1
                [&_ol]:!list-decimal

                [&_ol_ol]:mt-1
                [&_ol_ol]:!list-[lower-alpha]

                [&_li]:pl-1
                [&_li>p]:inline
            "
            dangerouslySetInnerHTML={{
                __html: formattedContent,
            }}
        />
    );
}

const ENTRIES_PER_PAGE = 10;
function PaginationControls({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <nav
            aria-label="Glossary pagination"
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="rounded border border-gray-300 px-3 py-2 text-sm font-semibold text-primary disabled:cursor-not-allowed disabled:text-gray-400"
            >
                Previous
            </button>

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`rounded border px-3 py-2 text-sm font-semibold ${currentPage === page
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 text-primary hover:bg-primary-lighter"
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="rounded border border-gray-300 px-3 py-2 text-sm font-semibold text-primary disabled:cursor-not-allowed disabled:text-gray-400"
            >
                Next
            </button>
        </nav>
    );
}

function htmlToSearchText(html = "") {
    return html
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&#8217;/g, "'")
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')
        .replace(/\s+/g, " ")
        .trim();
}

function formatCmsLinks(html = "") {
    return html.replace(/<a\b([^>]*)>/gi, (match, attributes) => {
        let updatedAttributes = attributes;

        if (/\btarget\s*=/.test(updatedAttributes)) {
            updatedAttributes = updatedAttributes.replace(
                /\btarget\s*=\s*["'][^"']*["']/i,
                'target="_blank"'
            );
        } else {
            updatedAttributes += ' target="_blank"';
        }

        if (/\brel\s*=/.test(updatedAttributes)) {
            updatedAttributes = updatedAttributes.replace(
                /\brel\s*=\s*["'][^"']*["']/i,
                'rel="noopener noreferrer"'
            );
        } else {
            updatedAttributes += ' rel="noopener noreferrer"';
        }

        if (/\bclass\s*=/.test(updatedAttributes)) {
            updatedAttributes = updatedAttributes.replace(
                /\bclass\s*=\s*["']([^"']*)["']/i,
                'class="$1 text-primary underline underline-offset-2 hover:text-primary-darker"'
            );
        } else {
            updatedAttributes +=
                ' class="text-primary underline underline-offset-2 hover:text-primary-darker"';
        }

        return `<a${updatedAttributes}>`;
    });
}

export default function GlossaryClient({
    entries = [],
}) {
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pendingScrollTerm, setPendingScrollTerm] = useState(null);
    const [pendingScrollLetter, setPendingScrollLetter] = useState(null);
    const [activeTerm, setActiveTerm] =
        useState(
            entries.length > 0
                ? slugify(entries[0].term)
                : ""
        );
    function sortGlossaryEntries(entries = []) {
        return [...entries].sort((a, b) => {
            const termA = getAlphabeticTerm(a.term);
            const termB = getAlphabeticTerm(b.term);

            return termA.localeCompare(termB, undefined, {
                sensitivity: "base",
                numeric: true,
            });
        });
    }

    const filteredEntries = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        const matchingEntries = !normalizedQuery
            ? entries
            : entries.filter((entry) => {
                const definitionText = htmlToSearchText(entry.content);

                return `${entry.term} ${definitionText}`
                    .toLowerCase()
                    .includes(normalizedQuery);
            });

        return sortGlossaryEntries(matchingEntries);
    }, [query, entries]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredEntries.length / ENTRIES_PER_PAGE)
    );

    const startIndex = (currentPage - 1) * ENTRIES_PER_PAGE;
    const endIndex = Math.min(startIndex + ENTRIES_PER_PAGE, filteredEntries.length);

    const paginatedEntries = useMemo(() => {
        return filteredEntries.slice(startIndex, endIndex);
    }, [filteredEntries, startIndex, endIndex]);

    const paginatedGroupedEntries = useMemo(() => {
        return paginatedEntries.reduce((groups, entry) => {
            const key = getFirstLetter(entry.term);

            if (!groups[key]) {
                groups[key] = [];
            }

            groups[key].push(entry);
            return groups;
        }, {});
    }, [paginatedEntries]);

    const groupedEntries = useMemo(() => {
        return filteredEntries.reduce((groups, entry) => {
            const key = getFirstLetter(entry.term);

            if (!groups[key]) {
                groups[key] = [];
            }

            groups[key].push(entry);
            return groups;
        }, {});
    }, [filteredEntries]);

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    useEffect(() => {
        if (!pendingScrollTerm) return;

        const id = slugify(pendingScrollTerm);

        requestAnimationFrame(() => {
            document.getElementById(id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            setActiveTerm(id);
            setPendingScrollTerm(null);
        });
    }, [pendingScrollTerm, paginatedEntries]);

    useEffect(() => {
        const handleScroll = () => {
            for (const entry of paginatedEntries) {
                const id = slugify(entry.term);
                const element = document.getElementById(id);

                if (element) {
                    const rect = element.getBoundingClientRect();

                    if (rect.top <= 160 && rect.bottom >= 160) {
                        setActiveTerm(id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [paginatedEntries]);
    const goToPage = (page) => {
        const nextPage = Math.min(Math.max(page, 1), totalPages);
        setCurrentPage(nextPage);

        requestAnimationFrame(() => {
            document.getElementById("glossary-results")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    };

    const scrollTo = (term) => {
        const targetIndex = filteredEntries.findIndex((entry) => entry.term === term);

        if (targetIndex === -1) return;

        const targetPage = Math.floor(targetIndex / ENTRIES_PER_PAGE) + 1;

        setCurrentPage(targetPage);
        setPendingScrollTerm(term);
    };

    const alphabetLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const availableLetters = useMemo(() => {
        return new Set(filteredEntries.map((entry) => getFirstLetter(entry.term)));
    }, [filteredEntries]);

    const scrollToLetter = (letter) => {
        const targetIndex = filteredEntries.findIndex(
            (entry) => getFirstLetter(entry.term) === letter
        );

        if (targetIndex === -1) return;

        const targetPage = Math.floor(targetIndex / ENTRIES_PER_PAGE) + 1;

        setCurrentPage(targetPage);

        setPendingScrollLetter({
            letter,
            targetPage,
            timestamp: Date.now(),
        });
    };

    useEffect(() => {
        if (!pendingScrollLetter) return;
        if (currentPage !== pendingScrollLetter.targetPage) return;

        const timeoutId = window.setTimeout(() => {
            const section = document.getElementById(
                `glossary-section-${pendingScrollLetter.letter}`
            );

            if (!section) return;

            const yOffset = -120;
            const y =
                section.getBoundingClientRect().top + window.scrollY + yOffset;

            window.scrollTo({
                top: y,
                behavior: "smooth",
            });

            setPendingScrollLetter(null);
        }, 50);

        return () => window.clearTimeout(timeoutId);
    }, [pendingScrollLetter, currentPage, paginatedGroupedEntries]);

    return (
        <div className="px-6 py-10 tracking-wide md:px-12 lg:px-20">
            <div className="mb-8 flex flex-row items-center gap-2 text-sm text-gray-500">
                <svg
                    className="usa-icon text-gray-500"
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                >
                    <use href="/assets/img/sprite.svg#arrow_back"></use>
                </svg>

                <Link href="/" className="text-primary hover:underline">
                    Home
                </Link>

                <span>›</span>

                <span className="text-gray-800">Glossary</span>
            </div>

            <InternalPageHero
                title="Glossary"
                subtitle="Alphabetized terms and definitions - Use this glossary to review terms, definitions, and related regulatory language."
            />

            <div className="mt-10 flex flex-col gap-10 lg:flex-row">
                <aside className="w-full shrink-0 lg:sticky lg:top-8 lg:w-[280px] lg:self-start">
                    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                        <label
                            htmlFor="glossary-search"
                            className="mb-2 block text-sm font-bold text-gray-900"
                        >
                            Search glossary
                        </label>

                        <div className="relative w-full overflow-hidden rounded-md">
                            <div className="relative flex h-10 w-full overflow-hidden rounded-md border border-gray-300 bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-lighter">
                                <input
                                    id="glossary-search"
                                    type="text"
                                    role="searchbox"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Search by term or definition"
                                    className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 pr-10 text-sm leading-5 text-gray-900 outline-none placeholder:text-xs placeholder:text-gray-500 focus:border-0 focus:outline-none focus:ring-0"
                                />

                                <svg
                                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                                    aria-hidden="true"
                                    focusable="false"
                                    role="img"
                                >
                                    <use href="/assets/img/sprite.svg#search"></use>
                                </svg>
                            </div>
                        </div>

                        <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                            <span>
                                {filteredEntries.length}{" "}
                                {filteredEntries.length === 1 ? "term" : "terms"}
                            </span>

                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery("")}
                                    className="font-semibold text-primary underline underline-offset-2"
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        <nav
                            aria-label="Glossary alphabet navigation"
                            className="mt-2 border-t border-gray-200 pt-4"
                        >
                            <div className="grid grid-cols-6 gap-2">
                                {alphabetLetters.map((letter) => {
                                    const isAvailable = availableLetters.has(letter);

                                    return (
                                        <button
                                            key={letter}
                                            type="button"
                                            disabled={!isAvailable}
                                            onClick={() => scrollToLetter(letter)}
                                            className={`rounded border px-1 py-1 !text-xs font-bold ${isAvailable
                                                ? "border-primary text-primary hover:bg-primary-lighter"
                                                : "cursor-not-allowed border-gray-200 text-gray-300"
                                                }`}
                                        >
                                            {letter}
                                        </button>
                                    );
                                })}
                            </div>
                        </nav>

                        <nav
                            aria-label="Glossary term navigation"
                            className="mt-5 max-h-[48vh] overflow-y-auto border-l-2 border-gray-200"
                        >
                            {Object.entries(groupedEntries).map(([letter, entries]) => (
                                <div key={letter} className="mb-4">
                                    <p className="mb-1 pl-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                                        {letter}
                                    </p>

                                    {entries.map((entry) => {
                                        const id = slugify(entry.term);
                                        const isActive = activeTerm === id;

                                        return (
                                            <button
                                                key={entry.id}
                                                type="button"
                                                onClick={() => scrollTo(entry.term)}
                                                className={`block w-full py-1.5 pl-4 pr-2 text-left !text-xs font-medium hover:bg-primary-lighter hover:text-primary-darker ${isActive ? "bg-primary-lighter text-primary-darker" : "text-primary"
                                                    }`}
                                            >
                                                {entry.term}
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </nav>
                    </div>
                </aside>

                <main
                    id="glossary-results"
                    className="min-w-0 flex-1 scroll-mt-24"
                >
                    {filteredEntries.length === 0 ? (
                        <div className="mt-10 rounded border border-gray-200 bg-gray-50 p-8 text-gray-700">
                            No glossary terms match your search.
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
                                <p>
                                    Showing {startIndex + 1}–{endIndex} of {filteredEntries.length} terms
                                </p>

                                <p>
                                    Page {currentPage} of {totalPages}
                                </p>
                            </div>

                            <div className="mt-5 space-y-4">
                                {Object.entries(paginatedGroupedEntries).map(([letter, entries]) => (
                                    <section
                                        key={letter}
                                        id={`glossary-section-${letter}`}
                                        className="scroll-mt-28"
                                    >
                                        <div className="mb-4 text-3xl font-bold text-primary flex items-center gap-4">
                                            <h2 className="!mb-0 text-3xl font-bold text-primary">
                                                {letter}
                                            </h2>
                                            <div className="h-px flex-1 bg-gray-200" />
                                        </div>

                                        <div className="space-y-4">
                                            {entries.map((entry) => (
                                                <article
                                                    key={entry.id}
                                                    id={slugify(entry.term)}
                                                    className="scroll-mt-28 pb-5"
                                                >
                                                    <h2 className="!mb-0 text-2xl font-bold text-black">
                                                        {entry.term}
                                                    </h2>

                                                    <GlossaryDefinition
                                                        content={entry.content}
                                                    />
                                                </article>
                                            ))}
                                        </div>
                                    </section>
                                ))}
                            </div>

                            <PaginationControls
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={goToPage}
                            />
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}