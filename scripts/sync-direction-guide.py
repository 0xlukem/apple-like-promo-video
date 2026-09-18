#!/usr/bin/env python3
"""Publish the skill's canonical creative-control tables in the repository README."""
import argparse
from pathlib import Path


def section(text: str, start: str, end: str) -> tuple[int, int]:
    if text.count(start) != 1 or text.count(end) != 1:
        raise ValueError(f"Expected one pair of markers: {start}, {end}")
    first = text.index(start) + len(start)
    last = text.index(end)
    if first > last:
        raise ValueError("Section markers are out of order")
    return first, last


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Fail if README differs; do not write")
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    source = (root / "skills/apple-like-promo-video/references/creative-controls.md").read_text()
    first, last = section(source, "<!-- public-guide:start -->", "<!-- public-guide:end -->")
    guide = source[first:last].strip()
    readme = root / "README.md"
    text = readme.read_text()
    first, last = section(text, "<!-- creative-guide:start -->", "<!-- creative-guide:end -->")
    updated = text[:first] + "\n\n" + guide + "\n\n" + text[last:]
    if args.check:
        if text != updated:
            raise SystemExit("README is out of date. Run python3 scripts/sync-direction-guide.py")
        print("Creative guide is synchronized.")
    else:
        readme.write_text(updated)
        print("README creative guide updated from the skill reference.")


if __name__ == "__main__":
    main()
