param([int]$Width = 1300, [int]$Height = 980, [int]$PosX = 200, [int]$PosY = 50, [string]$Match = '*ObsidianDevVault*')
. "$PSScriptRoot\_win.ps1"
$w = Get-TargetWindow $Match
[WinEnum]::ShowWindow($w.Hwnd, 9) | Out-Null
[WinEnum]::SetForegroundWindow($w.Hwnd) | Out-Null
[WinEnum]::SetWindowPos($w.Hwnd, [IntPtr]::Zero, $PosX, $PosY, $Width, $Height, 0x0004) | Out-Null
Start-Sleep -Milliseconds 700
Write-Output "resized to ${Width}x${Height} at $PosX,$PosY (was $($w.Width)x$($w.Height) at $($w.Left),$($w.Top))"
