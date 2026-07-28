$dir = "c:\Users\Frank\Documents\REFA_CONTEST"
$indexHtml = "$dir\index.html"
$scratchDir = "C:\Users\Frank\.gemini\antigravity\brain\e2f0165e-60c3-4859-b1ab-5790aaf827e9\scratch"

$lines = [System.IO.File]::ReadAllLines($indexHtml)
$newLines = @()

$htmlSection = [System.IO.File]::ReadAllLines("$scratchDir\countdown_html.txt")

foreach ($line in $lines) {
    if ($line.Contains('<div class="nav-section-label">Execution</div>')) {
        $newLines += '    <div class="nav-section-label">Live Tools</div>'
        $newLines += '    <a class="nav-item" onclick="goTo(''countdown'')" id="nav-countdown"><span class="icon">⏱️</span> Countdown Timer</a>'
    }
    
    if ($line.Contains('</main>')) {
        $newLines += $htmlSection
    }
    
    if ($line.Contains('<script src="js/studio.js"></script>')) {
        $newLines += '  <script src="js/countdown.js"></script>'
    }

    $newLines += $line
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines($indexHtml, $newLines, $utf8NoBom)
Write-Host "Countdown timer HTML added to index.html."
