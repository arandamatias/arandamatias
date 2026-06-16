@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

set /p CLIENTE="Nombre del cliente: "

set OUT=index.html

echo ^<!DOCTYPE html^> > %OUT%
echo ^<html lang="es"^> >> %OUT%
echo ^<head^> >> %OUT%
echo ^<meta charset="UTF-8"^> >> %OUT%
echo ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^> >> %OUT%
echo ^<title^>Entrega — !CLIENTE!^</title^> >> %OUT%
echo ^<link rel="icon" type="image/png" href="../../favicon.png"^> >> %OUT%
echo ^<link rel="stylesheet" href="../../css/style.css"^> >> %OUT%
echo ^<style^> >> %OUT%
echo .entrega-item{position:relative;background:#141414} >> %OUT%
echo .entrega-item img{width:100%%;aspect-ratio:1/1;object-fit:cover;display:block} >> %OUT%
echo .btn-dl{width:100%%;background:none;border:none;border-top:1px solid var(--line);color:var(--accent);font-size:.72rem;letter-spacing:.15em;text-transform:uppercase;padding:.7em 1em;cursor:pointer;font-family:Inter,sans-serif;display:flex;align-items:center;justify-content:center;gap:.5rem} >> %OUT%
echo .btn-dl:hover{background:var(--accent);color:var(--paper)} >> %OUT%
echo .btn-all{display:inline-block;margin-top:1.8rem;border:1px solid var(--accent);color:var(--accent);padding:.8em 2em;font-size:.78rem;letter-spacing:.2em;text-transform:uppercase;background:none;cursor:pointer;font-family:Inter,sans-serif} >> %OUT%
echo .btn-all:hover{background:var(--accent);color:var(--paper)} >> %OUT%
echo ^</style^> >> %OUT%
echo ^</head^> >> %OUT%
echo ^<body^> >> %OUT%
echo ^<header^>^<a href="../../index.html" class="logo"^>^<span class="name"^>Matias Aranda^</span^>^<span class="role"^>Visual Creator^</span^>^</a^>^</header^> >> %OUT%
echo ^<section class="page-head"^> >> %OUT%
echo ^<a href="../../index.html" class="breadcrumb"^>← Volver al portfolio^</a^> >> %OUT%
echo ^<h1^>Entrega — ^<em^>!CLIENTE!^</em^>^</h1^> >> %OUT%
echo ^<p^>Descarga las fotos que mas te gusten. Consultas: ^<a href="mailto:hola@arandamatias.com" style="color:var(--accent)"^>hola@arandamatias.com^</a^>^</p^> >> %OUT%
echo ^<button class="btn-all" onclick="dlAll()"^>Descargar todas^</button^> >> %OUT%
echo ^</section^> >> %OUT%
echo ^<section class="gallery"^>^<div class="thumb-grid reveal" id="g"^> >> %OUT%

set N=0
for %%f in (*.jpg *.jpeg *.JPG *.JPEG *.png *.PNG) do (
    set /a N+=1
    echo ^<div class="entrega-item"^>^<img src="%%f" alt="%%~nf"^>^<button class="btn-dl" onclick="dl('%%f')"^>Descargar^</button^>^</div^> >> %OUT%
)

echo ^</div^>^</section^> >> %OUT%
echo ^<footer^>^<div class="footer-cta"^>^<h2^>Empecemos ^<em^>algo.^</em^>^</h2^>^</div^>^<div class="footer-links"^>^<a href="mailto:hola@arandamatias.com"^>Escribime →^</a^>^</div^>^<div class="footer-bottom"^>^<span^>2026 Matias Aranda^</span^>^</div^>^</footer^> >> %OUT%
echo ^<script src="../../js/main.js"^>^</script^> >> %OUT%
echo ^<script^> >> %OUT%
echo function dl(n){var a=document.createElement('a');a.href=n;a.download=n;document.body.appendChild(a);a.click();document.body.removeChild(a)} >> %OUT%
echo function dlAll(){var imgs=document.querySelectorAll('.entrega-item img');imgs.forEach(function(img,i){setTimeout(function(){dl(img.getAttribute('src'))},i*400)})} >> %OUT%
echo ^</script^> >> %OUT%
echo ^</body^>^</html^> >> %OUT%

echo.
echo Listo! %N% fotos agregadas al index.html
pause
