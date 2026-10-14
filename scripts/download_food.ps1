$url = "https://takeout-download-drive-eu.usercontent.google.com/download/%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D9%81%D9%88%D8%AF-20260930T092705Z-1-001.zip?j=9c88719b-f610-44fa-9969-d1a395db3a0f&i=0&user=749705957915&authuser=0"
$dest = "d:\Work\Devotix\DEVOTIX\food_photos.zip"
Write-Host "Downloading from $url..."
try {
    $wc = New-Object System.Net.WebClient
    $wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
    $wc.DownloadFile($url, $dest)
    Write-Host "Download complete. File size: $((Get-Item $dest).Length) bytes"
} catch {
    Write-Host "Error downloading: $_"
}
