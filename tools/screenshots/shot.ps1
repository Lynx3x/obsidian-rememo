param([string]$Out = "$env:TEMP\rememo-shots\shot.png", [string]$Match = '*ObsidianDevVault*', [switch]$NoActivate)
. "$PSScriptRoot\_win.ps1"
Add-Type -AssemblyName System.Windows.Forms, System.Drawing
$w = Get-TargetWindow $Match
if (-not $NoActivate) {
  [WinEnum]::ShowWindow($w.Hwnd, 9) | Out-Null
  [WinEnum]::SetForegroundWindow($w.Hwnd) | Out-Null
  # park the cursor on empty background so no hover state / tooltip lands in the shot
  [WinEnum]::SetCursorPos($w.Left + $w.Width - 30, $w.Top + $w.Height - 100) | Out-Null
  Start-Sleep -Milliseconds 500
}
$bmp = New-Object System.Drawing.Bitmap($w.Width, $w.Height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.CopyFromScreen($w.Left, $w.Top, 0, 0, $bmp.Size)
New-Item -ItemType Directory -Force -Path (Split-Path $Out) | Out-Null
$bmp.Save($Out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Output "shot rect=$($w.Left),$($w.Top) size=$($w.Width)x$($w.Height) title=[$($w.Title)] -> $Out"
