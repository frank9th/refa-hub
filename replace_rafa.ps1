$files = Get-ChildItem -Path "c:\Users\Frank\Documents\REFA_CONTEST" -Recurse -File -Include *.html, *.css, *.js, *.md, *.ps1 | Where-Object { $_.FullName -notmatch "\\\.git\\" }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match "REFA" -or $content -match "refa" -or $content -match "Refa") {
        $content = $content -creplace 'REFA', 'REFA'
        $content = $content -creplace 'refa', 'refa'
        $content = $content -creplace 'Refa', 'Refa'
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.Name)"
    }
}
Write-Host "Replacement complete!"
