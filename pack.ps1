$out = "close-button.zip"

if (Test-Path $out) { Remove-Item $out }

Compress-Archive -Path @(
  "manifest.json",
  "background.js",
  "content.js",
  "styles.css"
) -DestinationPath $out

Write-Host "打包完成: $out"
