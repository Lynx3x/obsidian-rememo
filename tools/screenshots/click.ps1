param([Parameter(Mandatory = $true)][int]$X, [Parameter(Mandatory = $true)][int]$Y,
      [int]$Delay = 350, [switch]$NoActivate, [string]$Match = '*ObsidianDevVault*')
. "$PSScriptRoot\_win.ps1"
$w = Get-TargetWindow $Match
[WinEnum]::ShowWindow($w.Hwnd, 9) | Out-Null
[WinEnum]::SetForegroundWindow($w.Hwnd) | Out-Null
Start-Sleep -Milliseconds 400
if (-not $NoActivate) {
  # click the title bar first (window-relative y=20) so the OS routes input here
  [WinEnum]::SetCursorPos($w.Left + 400, $w.Top + 20) | Out-Null
  Start-Sleep -Milliseconds 150
  [WinEnum]::mouse_event(0x0002, 0, 0, 0, [UIntPtr]::Zero)
  [WinEnum]::mouse_event(0x0004, 0, 0, 0, [UIntPtr]::Zero)
  Start-Sleep -Milliseconds 250
}
[WinEnum]::SetCursorPos($w.Left + $X, $w.Top + $Y) | Out-Null
Start-Sleep -Milliseconds 150
[WinEnum]::mouse_event(0x0002, 0, 0, 0, [UIntPtr]::Zero)
[WinEnum]::mouse_event(0x0004, 0, 0, 0, [UIntPtr]::Zero)
Start-Sleep -Milliseconds $Delay
Write-Output "clicked window-rel ($X,$Y) => screen ($($w.Left + $X),$($w.Top + $Y))"
