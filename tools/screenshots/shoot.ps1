# Drives one full screenshot pass against the dev vault window.
#
#   powershell -File tools/screenshots/shoot.ps1                 # all steps -> %TEMP%\rememo-shots
#   powershell -File tools/screenshots/shoot.ps1 -Only 01-main   # just one step
#
# Prereqs (see docs/SCREENSHOTS.md): dev vault open in Obsidian, Rememo view on Home,
# UI language = English, light theme, demo notes applied (tools/demo/apply.ps1).
# All clicks are window-relative; the window rect is re-read before every action, so a
# moved window is fine -- but a changed *layout* means the coordinates below must be re-measured.
param(
  [string]$OutDir = "$env:TEMP\rememo-shots",
  [string]$Only = '',
  [int]$WinW = 1300, [int]$WinH = 980, [int]$WinX = 200, [int]$WinY = 50
)
$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
$ps = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

function Run-Script([string]$file, [hashtable]$Extra) {
  $argv = @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', (Join-Path $here $file))
  foreach ($k in $Extra.Keys) { $argv += @("-$k", "$($Extra[$k])") }
  & $ps @argv | Out-Host
}
function Shot([string]$name)  { Run-Script 'shot.ps1'   @{ Out = (Join-Path $OutDir "$name.png") } }
function Click([int]$x, [int]$y) { Run-Script 'click.ps1' @{ X = $x; Y = $y } }
function Scroll([int]$n, [int]$x = 700, [int]$y = 600) { Run-Script 'scroll.ps1' @{ X = $x; Y = $y; Notches = $n } }
function Want([string]$name)  { return ($Only -eq '' -or $Only -eq $name) }

# ---- window-relative coordinates (measured at 1300x980; re-measure if the layout changes) ----
$C = @{
  listTitle    = @(528, 152)   # "Rememo" list title -> manual re-read
  sliderTask   = @(987, 260)   # right half of the plain/task slider -> task mode
  sliderPlain  = @(961, 260)   # left half -> plain memo mode (either half toggles)
  navHome      = @(300, 347)
  navRecycle   = @(300, 389)
  tagReading   = @(300, 767)   # "reading" row in the sidebar tag list -> filter by tag
  refsBar      = @(700, 878)   # "N REFERENCES" bar on the parent card (top of list)
  listArea     = @(700, 600)   # a point inside the scrollable card list
}

Run-Script 'resize.ps1' @{ Width = $WinW; Height = $WinH; PosX = $WinX; PosY = $WinY }
Click $C.navHome[0] $C.navHome[1]                # start from Home with no filter
Start-Sleep -Milliseconds 600
Click $C.listTitle[0] $C.listTitle[1]            # fresh read
Start-Sleep -Milliseconds 1500
Scroll 25 $C.listArea[0] $C.listArea[1]          # re-read keeps the old scroll offset -> scroll to top after it
Start-Sleep -Milliseconds 600

if (Want '01-main')    { Shot '01-main-raw' }

if (Want '02-editor') {
  Click $C.sliderTask[0] $C.sliderTask[1]
  Shot '02-editor-raw'
  Click $C.sliderPlain[0] $C.sliderPlain[1]      # back to plain mode
}

if (Want '03-tags') {
  Click $C.tagReading[0] $C.tagReading[1]        # sidebar tag row -> filter by tag
  Start-Sleep -Milliseconds 900
  Shot '03-tags-raw'
  Click $C.navHome[0] $C.navHome[1]              # clear the filter
  Start-Sleep -Milliseconds 900
}

if (Want '04-recycle') {
  Click $C.navRecycle[0] $C.navRecycle[1]
  Start-Sleep -Milliseconds 900
  Shot '04-recycle-raw'
  Click $C.navHome[0] $C.navHome[1]
  Start-Sleep -Milliseconds 900
}

if (Want '05-references') {
  Click $C.refsBar[0] $C.refsBar[1]              # "N REFERENCES" bar -> memo dialog
  Start-Sleep -Milliseconds 900
  Shot '05-references-raw'
  Click 120 120                                  # click the dialog backdrop to close it
  Start-Sleep -Milliseconds 600
}

Write-Output "done -> $OutDir"
