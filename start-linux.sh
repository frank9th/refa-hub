#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# REFA Season 2 — Local Hub Launcher (Linux)
# Called automatically by REFA-Hub.desktop when double-clicked.
# ─────────────────────────────────────────────────────────────────────────────

cd "$(dirname "$0")"

GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${CYAN}  ============================================================${NC}"
echo -e "${CYAN}   REFA Season 2 — Local Network Hub Launcher (Linux)${NC}"
echo -e "${CYAN}  ============================================================${NC}"
echo ""

# ─── Check for Node.js ───────────────────────────────────────────────────────
echo "  [1/3] Checking for Node.js..."

if ! command -v node &> /dev/null; then
    echo -e "  ${RED}[!] Node.js not found.${NC}"
    read -p "  Install Node.js now? (yes/no): " INSTALL_CHOICE

    if [[ "$INSTALL_CHOICE" == "yes" || "$INSTALL_CHOICE" == "y" ]]; then
        if command -v apt-get &> /dev/null; then
            sudo apt-get update -y && sudo apt-get install -y nodejs npm
        elif command -v dnf &> /dev/null; then
            sudo dnf install -y nodejs npm
        elif command -v snap &> /dev/null; then
            sudo snap install node --classic
        else
            echo -e "  ${RED}[X] Cannot auto-install. Visit https://nodejs.org${NC}"
            read -p "  Press Enter to close..."
            exit 1
        fi
        echo -e "  ${GREEN}[OK] Node.js installed.${NC}"
    else
        echo -e "  ${RED}[X] Exiting.${NC}"
        read -p "  Press Enter to close..."
        exit 1
    fi
else
    echo -e "  ${GREEN}[OK] Node.js: $(node -v)${NC}"
fi

# ─── Dependencies ─────────────────────────────────────────────────────────────
echo ""
echo "  [2/3] Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "  [*] Installing (first-time only)..."
    npm install
    echo -e "  ${GREEN}[OK] Done.${NC}"
else
    echo -e "  ${GREEN}[OK] Already installed.${NC}"
fi

# ─── Start ────────────────────────────────────────────────────────────────────
echo ""
echo "  [3/3] Starting REFA Local Hub..."
echo ""
echo -e "${CYAN}  Share the URL below with your team!${NC}"
echo ""
node server.js

read -p "  Server stopped. Press Enter to close..."
