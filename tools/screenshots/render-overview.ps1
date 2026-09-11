# Renders tools/screenshots/overview.html into assets/screenshots/00-overview.png
# with headless Edge (2x device scale, then downscaled to 1500px wide so the PNG stays
# crisp but small). A throw-away profile keeps the user's Edge session untouched.
#
#   powershell -File tools/screenshots/render-overview.ps1
param(
  [string]$Html = "$PSScriptRoot\overview.html",
  [string]$Out = '',
  [string]$Edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
  [int]$Width = 1500, [int]$Height = 1060, [int]$Scale = 2
)
$ErrorActionPreference = 'Stop'
if (-not $Out) {
  $repo = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
  $Out = Join-Path $repo 'assets\screenshots\00-overview.png'
}
if (-not (Test-Path $Edge)) { throw "Edge not found: $Edge" }

$raw = Join-Path $env:TEMP 'rememo-overview-2x.png'
if (Test-Path $raw) { Remove-Item $raw -Force }
$profileDir = Join-Path $env:TEMP 'rememo-edge-profile'

$uri = ([uri]('file:///' + ($Html -replace '\\', '/'))).AbsoluteUri
$edgeArgs = @(
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  '--no-default-browser-check', "--user-data-dir=$profileDir",
  "--force-device-scale-factor=$Scale", "--window-size=$Width,$Height",
  "--screenshot=$raw", $uri
)
& $Edge @edgeArgs | Out-Null
Start-Sleep -Milliseconds 700
if (-not (Test-Path $raw)) { throw 'Edge produced no screenshot' }

Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Image]::FromFile($raw)
$h = [int][Math]::Round($src.Height * $Width / $src.Width)
$bmp = New-Object System.Drawing.Bitmap($Width, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($src, 0, 0, $bmp.Width, $bmp.Height)
New-Item -ItemType Directory -Force -Path (Split-Path $Out) | Out-Null
$bmp.Save($Out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); $src.Dispose()
Write-Output "overview -> $Out ($Width x $h, rendered at ${Scale}x)"
