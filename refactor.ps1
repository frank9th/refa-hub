$dir = "c:\Users\Frank\Documents\REFA_CONTEST"
$indexHtml = "$dir\index.html"
$cssDir = "$dir\css"
$jsDir = "$dir\js"
$scratchDir = "C:\Users\Frank\.gemini\antigravity\brain\e2f0165e-60c3-4859-b1ab-5790aaf827e9\scratch"
$engineSubagentScratchDir = "C:\Users\Frank\.gemini\antigravity\brain\2ab4bb5f-c311-4d44-81a1-fc4c971edb2d\scratch"

New-Item -ItemType Directory -Force -Path $cssDir | Out-Null
New-Item -ItemType Directory -Force -Path $jsDir | Out-Null

$lines = [System.IO.File]::ReadAllLines($indexHtml)

# CSS (Lines 15-284 => indices 14-283)
$cssLines = $lines[14..283]
$cssAdditions = [System.IO.File]::ReadAllLines("$scratchDir\css_additions.txt")
$fullCss = $cssLines + $cssAdditions
[System.IO.File]::WriteAllLines("$cssDir\styles.css", $fullCss)

# app.js (Lines 895-1061 & 1578-1843 => indices 894-1060 & 1577-1842)
$appLinesPart1 = $lines[894..1060]
$appLinesPart2 = $lines[1577..1842]
$fullApp = $appLinesPart1 + $appLinesPart2
[System.IO.File]::WriteAllLines("$jsDir\app.js", $fullApp)

# studio.js
Copy-Item -Path "$engineSubagentScratchDir\new_engine.js" -Destination "$jsDir\studio.js" -Force

# Reconstruct index.html
$newIndex = @()
$newIndex += $lines[0..11]
$newIndex += '  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&family=Bebas+Neue&family=Great+Vibes&family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet" />'
$newIndex += '  <link rel="stylesheet" href="css/styles.css" />'
$newIndex += $lines[285..830]

$studioHtml = [System.IO.File]::ReadAllLines("$scratchDir\html_section.txt")
$newIndex += $studioHtml

$newIndex += $lines[875..892]
$newIndex += '  <script src="js/app.js"></script>'
$newIndex += '  <script src="js/studio.js"></script>'
$newIndex += '</body>'
$newIndex += '</html>'

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines($indexHtml, $newIndex, $utf8NoBom)

Write-Host "Refactor complete."
