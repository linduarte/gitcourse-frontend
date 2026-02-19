param(
    [switch]$Restore,
    [string]$BackupFolder
)

$courseFolder = "curso/git-course"
$backupRoot = "backups"
$logFile = "scripts/update-log.txt"

# Função para registrar logs
function Log {
    param([string]$message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Add-Content -Path $logFile -Value "[$timestamp] $message"
}

# ============================
# RESTORE MODE
# ============================
if ($Restore) {
    if (-not $BackupFolder) {
        Write-Host "Erro: você deve informar -BackupFolder <nome_da_pasta>" -ForegroundColor Red
        exit
    }

    $fullBackupPath = Join-Path $backupRoot $BackupFolder

    if (-not (Test-Path $fullBackupPath)) {
        Write-Host "Backup não encontrado: $fullBackupPath" -ForegroundColor Red
        exit
    }

    Write-Host "Restaurando arquivos do backup: $BackupFolder" -ForegroundColor Yellow
    Log "Restaurando backup: $BackupFolder"

    Copy-Item -Path "$fullBackupPath\*" -Destination $courseFolder -Recurse -Force

    Write-Host "Restauração concluída." -ForegroundColor Green
    Log "Restauração concluída."
    exit
}

# ============================
# UPDATE MODE
# ============================

# Criar pasta de backup com timestamp
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupPath = Join-Path $backupRoot $timestamp

New-Item -ItemType Directory -Path $backupPath | Out-Null

Write-Host "Backup criado em: $backupPath" -ForegroundColor Cyan
Log "Backup criado em: $backupPath"

# Copiar todos os HTML antes de modificar
Copy-Item -Path "$courseFolder\*" -Destination $backupPath -Recurse -Force

Write-Host "Arquivos copiados para backup." -ForegroundColor Cyan
Log "Arquivos copiados para backup."

# Blocos a serem inseridos
$navbarBlock = '<div id="navbar"></div>'

$scriptBlock = @"
<script src="../../static/js/config.js"></script>
<script type="module">
    import { protectRoute, loadNavbar } from "../../static/js/git-course-functions.js";
    protectRoute();
    loadNavbar();
</script>
"@

# Atualizar arquivos HTML
Get-ChildItem -Path $courseFolder -Filter *.html -Recurse | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content $file -Raw
    $originalContent = $content
    $modified = $false

    # Inserir navbar após <body>
    if ($content -notmatch "navbar" -and $content -match "<body>") {
        $content = $content -replace "<body>", "<body>`r`n$navbarBlock"
        $modified = $true
    }

    # Inserir scripts antes de </body>
    if ($content -notmatch "git-course-functions.js") {
        $content = $content -replace "</body>", "$scriptBlock`r`n</body>"
        $modified = $true
    }

    # Validar se houve mudança real
    if ($modified -and $content -ne $originalContent) {
        Set-Content -Path $file -Value $content -Encoding UTF8
        Write-Host "Atualizado: $file" -ForegroundColor Green
        Log "Atualizado: $file"
    } else {
        Write-Host "Sem alterações: $file" -ForegroundColor DarkGray
        Log "Sem alterações: $file"
    }
}

Write-Host "`nProcesso concluído com sucesso!" -ForegroundColor Green
Write-Host "Backup salvo em: $backupPath" -ForegroundColor Yellow
Log "Processo concluído com sucesso. Backup salvo em: $backupPath"
