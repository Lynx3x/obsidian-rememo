# Applies a demo note set into a vault's daily-notes folder.
#
#   powershell -File apply.ps1                       # copy en set into L:\Files\ObsidianDevVault
#   powershell -File apply.ps1 -Clean                # wipe daily\*.md first (pristine demo run)
#   powershell -File apply.ps1 -Vault D:\OtherVault -Lang zh
#
# Always backs up the current daily\*.md to <vault>\bak\demo-swap-<timestamp>\ first.
# After running: hit the "Rememo" list title in Obsidian to re-read, or reopen the view.
param(
  [string]$Vault = 'L:\Files\ObsidianDevVault',
  [string]$Lang  = 'en',
  [switch]$Clean
)
$ErrorActionPreference = 'Stop'

$src = Join-Path $PSScriptRoot $Lang
$daily = Join-Path $Vault 'daily'

if (-not (Test-Path $src))        { throw "demo set not found: $src" }
if (-not (Test-Path $daily))      { throw "daily folder not found: $daily" }
$srcFiles = @(Get-ChildItem -Path $src -Filter *.md)
if ($srcFiles.Count -eq 0)        { throw "no .md files in $src" }

$ts = Get-Date -Format 'yyyyMMdd-HHmmss'
$bak = Join-Path $Vault "bak\demo-swap-$ts"
New-Item -ItemType Directory -Force -Path $bak | Out-Null
$existing = @(Get-ChildItem -Path $daily -Filter *.md -ErrorAction SilentlyContinue)
if ($existing.Count -gt 0) { Copy-Item -Path (Join-Path $daily '*.md') -Destination $bak -Force }

if ($Clean) {
  $existing | Remove-Item -Force
  Write-Output "clean: removed $($existing.Count) existing .md file(s)"
}

Copy-Item -Path (Join-Path $src '*.md') -Destination $daily -Force

Write-Output "lang=$Lang copied=$($srcFiles.Count) file(s) -> $daily"
Write-Output "backup=$bak ($($existing.Count) file(s))"

# Root-level notes: link targets for the demo wikilinks (a book note, etc.).
# Existing files of the same name are backed up too, never silently replaced.
$rootSrc = Join-Path $PSScriptRoot 'vault'
if (Test-Path $rootSrc) {
  $rootFiles = @(Get-ChildItem -Path $rootSrc -Filter *.md)
  foreach ($f in $rootFiles) {
    $dest = Join-Path $Vault $f.Name
    if (Test-Path $dest) { Copy-Item $dest (Join-Path $bak $f.Name) -Force }
    Copy-Item $f.FullName $dest -Force
  }
  Write-Output "vault-root copied=$($rootFiles.Count) file(s)"
  if ($rootFiles.Count -gt 0) { Write-Output "  (backs up any same-named root note to the folder above)" }
}

Write-Output "next: reload the Rememo view in Obsidian (click the 'Rememo' list title)."
