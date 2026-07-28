$dir = "c:\Users\Frank\Documents\REFA_CONTEST"
$studioJs = "$dir\js\studio.js"

$lines = [System.IO.File]::ReadAllLines($studioJs)

# Lines to remove: 79 to 952 (0-indexed: 78 to 951)
$before = $lines[0..77]
$after = $lines[952..($lines.Length-1)]

$newInit = @(
"window.TEMPLATES = window.TEMPLATES || [];",
"window.CONTROLS_CONFIG = window.CONTROLS_CONFIG || {};",
"window.RENDERERS = window.RENDERERS || {};",
"",
"const TEMPLATES = window.TEMPLATES;",
"const CONTROLS_CONFIG = window.CONTROLS_CONFIG;",
"const RENDERERS = window.RENDERERS;"
)

$newStudio = $before + $newInit + $after

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines($studioJs, $newStudio, $utf8NoBom)
Write-Host "studio.js updated."
