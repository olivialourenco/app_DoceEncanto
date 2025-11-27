@echo off
echo Abrindo Firewall do Windows para Expo...
echo.
echo Adicionando regras para portas 8081, 8083, 8084...
echo.

netsh advfirewall firewall add rule name="Expo Metro Bundler 8081" dir=in action=allow protocol=TCP localport=8081
netsh advfirewall firewall add rule name="Expo Metro Bundler 8083" dir=in action=allow protocol=TCP localport=8083
netsh advfirewall firewall add rule name="Expo Metro Bundler 8084" dir=in action=allow protocol=TCP localport=8084

echo.
echo Regras adicionadas! Agora tente conectar novamente.
echo.
pause



