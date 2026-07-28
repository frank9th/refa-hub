#!/data/data/com.termux/files/usr/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# REFA Season 2 — Local Hub Launcher (Android / Termux)
#
# HOW TO MAKE THIS A HOME SCREEN TAP (One-Tap Launch):
# 1. Install "Termux" from F-Droid: https://f-droid.org
# 2. Install "Termux:Widget" from F-Droid (same site)
# 3. Copy this project folder to your phone:
#      /sdcard/RAFA_CONTEST/
# 4. Run this once in Termux to link the shortcut:
#      bash /sdcard/RAFA_CONTEST/start-android.sh --setup
# 5. Long-press your home screen → Widgets → Termux Widget → tap the REFA icon
# ─────────────────────────────────────────────────────────────────────────────

# ─── Setup mode: creates the Termux widget shortcut ─────────────────────────
if [[ "$1" == "--setup" ]]; then
    mkdir -p ~/.shortcuts
    SCRIPT_PATH="$(realpath "$0")"
    # Create a shortcut script in ~/.shortcuts (Termux:Widget reads from here)
    cat > ~/.shortcuts/REFA-Hub.sh << EOF
#!/data/data/com.termux/files/usr/bin/bash
bash "$SCRIPT_PATH"
EOF
    chmod +x ~/.shortcuts/REFA-Hub.sh
    echo ""
    echo "  ✅ Shortcut created!"
    echo "  Long-press your home screen → Widgets → Termux Widget"
    echo "  Add the 'REFA-Hub' widget to tap-to-launch!"
    echo ""
    exit 0
fi

# ─── Normal launch ───────────────────────────────────────────────────────────
# Navigate to project folder (adjust path if you stored it differently)
PROJECT_DIR="/sdcard/RAFA_CONTEST"
if [ ! -d "$PROJECT_DIR" ]; then
    # Try the directory of this script as fallback
    PROJECT_DIR="$(dirname "$(realpath "$0")")"
fi
cd "$PROJECT_DIR" || { echo "Cannot find project folder at $PROJECT_DIR"; exit 1; }

echo ""
echo "  ============================================================"
echo "   REFA Season 2 — Local Hub (Android / Termux)"
echo "  ============================================================"
echo ""

termux-setup-storage 2>/dev/null || true
pkg update -y -q 2>/dev/null

echo "  [1/3] Checking for Node.js..."
if ! command -v node &> /dev/null; then
    echo "  [!] Node.js not found."
    read -p "  Install now? (yes/no): " CHOICE
    if [[ "$CHOICE" == "yes" || "$CHOICE" == "y" ]]; then
        pkg install -y nodejs
        echo "  [OK] Node.js installed."
    else
        echo "  [X] Exiting."; exit 1
    fi
else
    echo "  [OK] Node.js: $(node -v)"
fi

echo ""
echo "  [2/3] Checking dependencies..."
if [ ! -d "node_modules" ]; then
    npm install
fi
echo "  [OK] Ready."

echo ""
echo "  [3/3] Starting hub — share the URL with your team!"
echo ""
node server.js
