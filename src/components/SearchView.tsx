"use client";

import { useEffect, useMemo, useState } from "react";
import {
  artists,
  categoryMap,
  searchArtworks,
  searchFacets,
  type CategoryId,
} from "@/data";
import { screenScrollClass, screenContentClass } from "./artwork-layout";
import { SearchIcon, CloseIcon } from "./Icons";
import ArtworkTile from "./ArtworkTile";

interface SearchViewProps {
  initialCategory?: CategoryId | null;
  onOpenArtwork: (artworkId: string) => void;
}

type FilterKind = "period" | "empire" | "category" | "artist";

interface Filter {
  kind: FilterKind;
  value: string;
  label: string;
}

export default function SearchView({
  initialCategory,
  onOpenArtwork,
}: SearchViewProps) {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Filter | null>(null);

  // When arriving from a Discover category card, pre-apply that filter.
  useEffect(() => {
    if (initialCategory) {
      setFilter({
        kind: "category",
        value: initialCategory,
        label: categoryMap[initialCategory].label,
      });
    }
  }, [initialCategory]);

  const results = useMemo(
    () =>
      searchArtworks({
        text,
        period: filter?.kind === "period" ? filter.value : undefined,
        empire: filter?.kind === "empire" ? filter.value : undefined,
        category:
          filter?.kind === "category" ? (filter.value as CategoryId) : undefined,
        artistId: filter?.kind === "artist" ? filter.value : undefined,
      }),
    [text, filter]
  );

  const isActive = (kind: FilterKind, value: string) =>
    filter?.kind === kind && filter.value === value;

  const apply = (f: Filter) =>
    setFilter((prev) =>
      prev && prev.kind === f.kind && prev.value === f.value ? null : f
    );

  return (
    <div className={screenScrollClass}>
      <div className={screenContentClass}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          Search
        </p>
        <h1 className="mt-2 font-serif text-[28px] leading-tight text-white">
          Find a masterpiece
        </h1>

        {/* Search box */}
        <div className="mt-5 flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-3">
          <SearchIcon className="h-[18px] w-[18px] shrink-0 text-white/45" />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search artworks, artists, periods…"
            className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
          />
          {text && (
            <button
              onClick={() => setText("")}
              aria-label="Clear search"
              className="text-white/40 hover:text-white"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter facets */}
        <FacetRow title="Category">
          {searchFacets.categories.map((id) => (
            <Chip
              key={id}
              active={isActive("category", id)}
              onClick={() =>
                apply({ kind: "category", value: id, label: categoryMap[id].label })
              }
            >
              {categoryMap[id].label}
            </Chip>
          ))}
        </FacetRow>

        <FacetRow title="Period">
          {searchFacets.periods.map((p) => (
            <Chip
              key={p}
              active={isActive("period", p)}
              onClick={() => apply({ kind: "period", value: p, label: p })}
            >
              {p}
            </Chip>
          ))}
        </FacetRow>

        <FacetRow title="Empire">
          {searchFacets.empires.map((e) => (
            <Chip
              key={e}
              active={isActive("empire", e)}
              onClick={() => apply({ kind: "empire", value: e, label: e })}
            >
              {e}
            </Chip>
          ))}
        </FacetRow>

        <FacetRow title="Artist">
          {artists.map((a) => (
            <Chip
              key={a.id}
              active={isActive("artist", a.id)}
              onClick={() => apply({ kind: "artist", value: a.id, label: a.name })}
            >
              {a.name}
            </Chip>
          ))}
        </FacetRow>

        {/* Results */}
        <div className="mt-7 flex items-baseline justify-between">
          <h2 className="font-serif text-lg text-white">
            {results.length} {results.length === 1 ? "result" : "results"}
          </h2>
          {filter && (
            <button
              onClick={() => setFilter(null)}
              className="text-xs text-white/45 hover:text-white"
            >
              Clear filter
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <p className="mt-8 text-center text-sm text-white/45">
            No artworks match your search. Try a different term or filter.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {results.map((art, i) => (
              <ArtworkTile
                key={art.id}
                artwork={art}
                index={i}
                onOpen={onOpenArtwork}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FacetRow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "bg-white text-ink"
          : "border border-white/15 bg-white/5 text-white/70 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
