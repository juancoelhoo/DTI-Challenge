# DTI-Challenge

********************************************PASSO A PASSO PARA EXECUTAR O PROGRAMA********************************************

-CLONAR O REPOSITÓRIO;

-BAIXAR TANTO MICROSOFT SQL SERVER 20 QUANTO O MICROSOT MANAGEMENT STUDIO; ASSIM QUE O SQL SERVER FOR INSTALADO, COPIE A STRING DE CONEXÃO GERADA AO FINAL DA INSTALAÇÃO DO MICROSOFT SQL SERVER 20 E COLE NO ARQUIVO '\Challenge-DTI\appsettings.json' EM "DevConnection"

-REALIZAR A MIGRAÇÃO DO BANCO DE DADOS: NO VISUAL STUDIO, IR EM Tools -> NuGet Package Manager -> Package Manager Console E EXECUTAR O COMANDO 'Update-Database'. ASSIM, A TABELA "DReminder" SERÁ CRIADA NO BANCO DE DADOS.

-ENTRAR NO DIRETÓRIO '\DTI-Challenge\Challenge-FRONT' E EXECUTAR O COMANDO 'npm install';

-COMPILAR A SOLUÇÃO 'Challenge-DTI' NO VISUAL STUDIO;

-EM '\Challenge-FRONT', EXECUTAR 'npm start'
