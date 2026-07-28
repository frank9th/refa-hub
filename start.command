#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# REFA Season 2 — Local Hub Launcher (Mac)
# Double-click this file in Finder to launch the hub.
# macOS will open Terminal and run this script automatically.
# ─────────────────────────────────────────────────────────────────────────────

# Move to the folder where this script lives (critical for double-click to work)
cd "$(dirname "$0")"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${CYAN}  ============================================================${NC}"
echo -e "${CYAN}   REFA Season 2 — Local Network Hub Launcher (Mac)${NC}"
echo -e "${CYAN}  ============================================================${NC}"
echo ""

# ─── Check for Node.js ───────────────────────────────────────────────────────
echo "  [1/3] Checking for Node.js..."

if ! command -v node &> /dev/null; then
    echo -e "  ${RED}[!] Node.js not found.${NC}"
    echo ""
    read -p "  Install Node.js now? (yes/no): " INSTALL_CHOICE

    if [[ "$INSTALL_CHOICE" == "yes" || "$INSTALL_CHOICE" == "y" ]]; then
        # Try Homebrew first, install it if missing
        if ! command -v brew &> /dev/null; then
            echo "  [*] Installing Homebrew first..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            # Add brew to PATH for Apple Silicon Macs
            eval "$(/opt/homebrew/bin/brew shellenv)" 2>/dev/null || true
            eval "$(/usr/local/bin/brew shellenv)" 2>/dev/null || true
        fi
        echo "  [*] Installing Node.js via Homebrew..."
        brew install node
        echo -e "  ${GREEN}[OK] Node.js installed.${NC}"
    else
        echo -e "  ${RED}[X] Cannot start without Node.js. Exiting.${NC}"
        read -p "  Press Enter to close..."
        exit 1
    fi
else
    echo -e "  ${GREEN}[OK] Node.js found: $(node -v)${NC}"
fi

# ─── Check for dependencies ───────────────────────────────────────────────────
echo ""
echo "  [2/3] Checking project dependencies..."

if [ ! -d "node_modules" ]; then
    echo "  [*] Installing dependencies (first-time only)..."
    npm install
    if [ $? -ne 0 ]; then
        echo -e "  ${RED}[X] npm install failed.${NC}"
        read -p "  Press Enter to close..."
        exit 1
    fi
    echo -e "  ${GREEN}[OK] Done.${NC}"
else
    echo -e "  ${GREEN}[OK] Dependencies already installed.${NC}"
fi

# ─── Start the server ─────────────────────────────────────────────────────────
echo ""
echo "  [3/3] Starting REFA Local Hub..."
echo ""
echo -e "${CYAN}  Share the IP address below with your team.${NC}"
echo -e "${CYAN}  They open it in any phone/laptop browser — no internet needed!${NC}"
echo ""

node server.js

# Keep terminal open if server exits
read -p "  Server stopped. Press Enter to close..."
