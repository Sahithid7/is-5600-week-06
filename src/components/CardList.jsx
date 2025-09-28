// src/components/CardList.jsx
import React, { useEffect, useMemo, useState } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data = [] }) => {
  const limit = 10; // show 10 products per page

  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);

  // Filter by tags
  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter(
      (p) =>
        Array.isArray(p?.tags) &&
        p.tags.some((tag) => String(tag).toLowerCase().includes(q))
    );
  }, [data, query]);

  // Slice products for current page
  useEffect(() => {
    setProducts(filtered.slice(offset, offset + limit));
  }, [filtered, offset, limit]);

  const filterTags = (value) => {
    setQuery(value || "");
    setOffset(0);
  };

  // Pagination helpers
  const total = filtered.length;
  const prevDisabled = offset === 0;
  const nextDisabled = offset + limit >= total;

  const handlePage = (dir) => {
    if (dir === "prev" && !prevDisabled) setOffset((o) => Math.max(0, o - limit));
    if (dir === "next" && !nextDisabled) setOffset((o) => o + limit);
  };

  return (
    <div className="cf pa2">
      {/* Search bar */}
      <div className="mt2 mb3 flex items-center justify-center">
        <Search handleSearch={filterTags} />
      </div>

      {/* Cards */}
      <div className="mt2 mb2">
        {products.length === 0 ? (
          <p className="tc i">No products found.</p>
        ) : (
          products.map((product) => <Card key={product.id} {...product} />)
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center pa3">
        <Button text="Previous" handleClick={() => handlePage("prev")} disabled={prevDisabled} />
        <div className="mh2" />
        <Button text="Next" handleClick={() => handlePage("next")} disabled={nextDisabled} />
      </div>
    </div>
  );
};

export default CardList;

