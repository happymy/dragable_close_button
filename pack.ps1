$src = "C:\Users\GAME\Documents\GitHub\dragable_close_button"
$out = "$src\close-button.zip"

if (Test-Path $out) { Remove-Item $out }

Compress-Archive -Path @(
  "$src\manifest.json",
  "$src\background.js",
  "$src\content.js",
  "$src\styles.css"
) -DestinationPath $out

Write-Host "打包完成: $out"
