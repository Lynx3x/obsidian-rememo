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

# Picks the target window: title match first, else the biggest titled window of the
# same process (so a popout never wins over the main window).
function Get-TargetWindow([string]$Match = '*ObsidianDevVault*') {
  $wins = @(Get-ObsidianWindows | Where-Object { $_.Width -gt 400 -and $_.Height -gt 300 })
  $hit = $wins | Where-Object { $_.Title -like $Match } | Select-Object -First 1
  if (-not $hit) {
    $titled = $wins | Where-Object { $_.Title -ne '' }
    if ($titled) {
      $hit = $titled | Sort-Object { $_.Width * $_.Height } -Descending | Select-Object -First 1
    }
  }
  if (-not $hit) {
    $all = ($wins | ForEach-Object { "[$($_.Title)] $($_.Left),$($_.Top) $($_.Width)x$($_.Height)" }) -join ' | '
    Write-Error "target window not found (match=$Match); candidates: $all"
    exit 1
  }
  return $hit
}
