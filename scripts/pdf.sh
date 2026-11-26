#!/bin/sh
# Erzeugt die A4-PDFs mit Chrome. Voraussetzung: npm run dev läuft.
set -eu
cd "$(dirname "$0")/.."
chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
url="http://localhost:5173/ortho-landing/print.html"
make_pdf() {
  "$chrome" --headless=new --disable-gpu --user-data-dir="$(mktemp -d)" --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="$2" "$1" 2>/dev/null
}
make_pdf "$url" public/anleitung-testset-604.pdf
make_pdf "$url?grid" print/satzraster-testset-604.pdf
