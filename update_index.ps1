$dir = "c:\Users\Frank\Documents\REFA_CONTEST"
$indexHtml = "$dir\index.html"
$templatesDir = "$dir\js\templates"

$lines = [System.IO.File]::ReadAllLines($indexHtml)
$newLines = @()

$templateFiles = Get-ChildItem -Path $templatesDir -Filter "*.js" | Select-Object -ExpandProperty Name

foreach ($line in $lines) {
    if ($line.Contains('<script src="js/studio.js"></script>')) {
        foreach ($file in $templateFiles) {
            $newLines += "  <script src=`"js/templates/$file`"></script>"
        }
    }
    $newLines += $line
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines($indexHtml, $newLines, $utf8NoBom)
Write-Host "index.html updated with template script tags."
