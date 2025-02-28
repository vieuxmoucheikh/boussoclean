@echo off
cd /d "%~dp0"
echo ========================================================
echo =        Configuration de la Base de Données           =
echo ========================================================
echo.
echo Ce script vous guidera pour configurer votre base de données PostgreSQL.
echo.
echo Prérequis:
echo  - PostgreSQL installé et en cours d'exécution
echo  - Une base de données nommée 'boussoclean' créée
echo.
echo Étapes à suivre:
echo.
echo 1. Exécuter le script de création des tables:
echo    psql -U votre_utilisateur -d boussoclean -f prisma\schema.sql
echo.
echo 2. Exécuter le script d'initialisation des données:
echo    psql -U votre_utilisateur -d boussoclean -f prisma\seed.sql
echo.
echo 3. Vérifier que la variable d'environnement DATABASE_URL est correctement configurée:
echo    DATABASE_URL=postgresql://votre_utilisateur:votre_mot_de_passe@localhost:5432/boussoclean
echo.
echo Pour plus d'informations, consultez le fichier README-DATABASE.md
echo.
pause
