# Shared helper: locate the Obsidian window to drive.
# .NET's Process.MainWindowTitle goes empty when the app opens a child/popout window,
# so enumerate top-level windows by process id instead.
Add-Type @"
using System;
using System.Text;
using System.Runtime.InteropServices;
public class WinEnum {
  public delegate bool EnumProc(IntPtr hWnd, IntPtr lParam);
  [DllImport("user32.dll")] public static extern bool EnumWindows(EnumProc cb, IntPtr lParam);
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr hWnd);
  [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern int GetWindowTextW(IntPtr hWnd, StringBuilder s, int n);
  [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern int GetClassNameW(IntPtr hWnd, StringBuilder s, int n);
  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint pid);
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left, Top, Right, Bottom; }
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT r);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr hWnd, IntPtr after, int x, int y, int cx, int cy, uint flags);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int c);
  [DllImport("user32.dll")] public static extern bool SetCursorPos(int x, int y);
  [DllImport("user32.dll")] public static extern void mouse_event(uint f, uint dx, uint dy, int d, UIntPtr e);
}
"@

function Get-ObsidianWindows {
  $ids = @{}
  Get-Process obsidian -ErrorAction SilentlyContinue | ForEach-Object { $ids[[uint32]$_.Id] = $true }
  $list = New-Object System.Collections.ArrayList
  $cb = [WinEnum+EnumProc] {
    param($h, $l)
    $procId = [uint32]0
    [WinEnum]::GetWindowThreadProcessId($h, [ref]$procId) | Out-Null
    if (-not $ids.ContainsKey($procId)) { return $true }
    if (-not [WinEnum]::IsWindowVisible($h)) { return $true }
    $t = New-Object System.Text.StringBuilder 512
    [WinEnum]::GetWindowTextW($h, $t, 512) | Out-Null
    $c = New-Object System.Text.StringBuilder 256
    [WinEnum]::GetClassNameW($h, $c, 256) | Out-Null
    if ($c.ToString() -notlike 'Chrome_WidgetWin*') { return $true }
    $r = New-Object WinEnum+RECT
    [WinEnum]::GetWindowRect($h, [ref]$r) | Out-Null
    $null = $list.Add([pscustomobject]@{
      Hwnd = $h; Pid = $procId; Title = $t.ToString(); Class = $c.ToString();
      Left = $r.Left; Top = $r.Top; Width = $r.Right - $r.Left; Height = $r.Bottom - $r.Top
    })
    return $true
  }
  [WinEnum]::EnumWindows($cb, [IntPtr]::Zero) | Out-Null
  return $list
}

# Picks the target window by title. A minimised window is 160x28 at (-32000,-32000),
# so restore every title match first and then take the biggest one (a popped-out note
# shares the vault name in its title but is smaller than the main window).
function Get-TargetWindow([string]$Match = '*ObsidianDevVault*') {
  $cands = @(Get-ObsidianWindows | Where-Object { $_.Title -like $Match })
  if (-not $cands) {
    $all = (Get-ObsidianWindows | ForEach-Object { "[$($_.Title)] $($_.Width)x$($_.Height)" }) -join ' | '
    Write-Error "target window not found (match=$Match); candidates: $all"
    exit 1
  }
  foreach ($c in $cands) {
    if ($c.Left -le -10000) { [WinEnum]::ShowWindow($c.Hwnd, 9) | Out-Null }
  }
  Start-Sleep -Milliseconds 400
  $again = @(Get-ObsidianWindows | Where-Object { $_.Title -like $Match })
  $pool = if ($again) { $again } else { $cands }
  return $pool | Sort-Object { $_.Width * $_.Height } -Descending | Select-Object -First 1
}
