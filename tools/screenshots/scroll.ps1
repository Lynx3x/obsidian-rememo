param([int]$X = 700, [int]$Y = 600, [int]$Notches = -5, [string]$Match = '*ObsidianDevVault*')
. "$PSScriptRoot\_win.ps1"
$w = Get-TargetWindow $Match
[WinEnum]::ShowWindow($w.Hwnd, 9) | Out-Null
[WinEnum]::SetForegroundWindow($w.Hwnd) | Out-Null
Start-Sleep -Milliseconds 400
[WinEnum]::SetCursorPos($w.Left + $X, $w.Top + $Y) | Out-Null
Start-Sleep -Milliseconds 200
$delta = if ($Notches -lt 0) { -120 } else { 120 }
for ($i = 0; $i -lt [Math]::Abs($Notches); $i++) {
  [WinEnum]::mouse_event(0x0800, 0, 0, $delta, [UIntPtr]::Zero)
  Start-Sleep -Milliseconds 90
}
Start-Sleep -Milliseconds 400
Write-Output "scrolled $Notches notches at window-rel ($X,$Y)"
