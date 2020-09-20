# Pontos de coleta

[![node version](https://img.shields.io/node/v/react)](https://img.shields.io/node/v/react)
![npm](https://img.shields.io/npm/v/react-native?label=react-native)
[![node version](https://img.shields.io/node/v/react-native)](https://img.shields.io/node/v/react-native)
![npm](https://img.shields.io/npm/v/react-navigation?label=react-native-navigation)
![npm](https://img.shields.io/npm/v/react?label=react)
![npm](https://img.shields.io/npm/v/pg?label=Postgres)
<img src="https://img.shields.io/github/languages/top/tsunodajapa/pontos_coleta">

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Pontos_coleta&uri=https%3A%2F%2Fgithub.com%2Ftsunodajapa%2Fpontos_coleta%2Fblob%2Fmaster%2FInsomnia.json)

#### O Sistema de Ponto de Coleta, permite através de um aplicativo mobile, registar pontos de coleta com seu respectivo endereço. Toda a interação com a aplicativo é feito através de uma API em Node com banco de dados em POSTGRES.
O aplicativo permite favoritar pontos de coletas cadastrados, para que possam serem acessados mesmo sem conexão com a internet.

### Funcionalidades e Padrões de Arquitetura Utilizada:

 - API:
    1. Arquitetura SOLID;
    2. ORM para comunicação com banco de dados;
    3. Alguns Conceitos de DDD;
    4. UUID como identificador de cada tabela.
- Mobile:
    1. Unform para automatização de Formulários
    2. Yup para validações de dados
    3. Context API para manter o estado especificos na aplicação toda, economizando requisições na api.
    4. Busca de GeoLocalização, através de alguns dados de endereço.
    5. Opções de favoritar items no storage do celular.

## Requisitos de instalação

- React >= 16.13.1
- React-Native >= 0.63.2
- npm >= 6.0.0
- node >= 10.0
- Postgres


## Como utilizar

#### 1. Primeiramente, é necessário criar um conta (gratuita) em <a href="https://developer.here.com/i" > developer.here.com</a>.

#### 2. Após a confirmação do cadastro você terá acesso a uma <b>API_KEY</b>. Na raiz do projeto do MOBILE (cd mobile) crie um arquivo '.env' seguindo o parâmetro do arquivo .env.example, substituta 'YOUR_API_KEY_HERE' pela sua <b>API_KEY</b> 

> Os passos 1 e 2 são opcionais, são responsáveis apenas para preenchimento da geolocalização automaticamente. 

#### 3. No mesmo arquivo .env, insisra a base_url da sua API (default port 3333).

#### 4. Dentro da API (cd API), existe um arquivo <b>ormconfig.example.json</b> na raiz do projeto. crie um arquivo no mesmo padrão dele porém sem o example (ormconfig.example.json -> ormconfig.json) e altere os seguintes dados de acordo com o seu banco POSTGRES: host, port, username, password, database. As demais informações desse arquivo já está configurado.

> Sem a configuração desse arquivo corretamente, a api não funcionará.

<br>

## Iniciando a API

#### Primeiro alterne para o diretório da API:
```
cd api
```

#### Execute o comando para instalações de dependências da API:

```
yarn

ou

npm install
```

#### Execute o comando para rodar as Migrations, que criará as tabelas no banco:
> É importante que o passo 4 da sessão "Como Utilizar" esteje apontando para o banco corretamente.

```
npm run typeorm migration:run

ou

yarn typeorm migration:run
```

#### Se tudo ocorreu bem até aqui, basta iniciar a API com o seguinte comando:

```
npm run dev:server

ou

yarn dev:server
```

## Iniciando o aplicativo Mobile

#### Primeiro alterne para o diretório do MOBILE:
> Caso esteja na pasta da API, não esqueça de retornar uma pasta primeiro (cd..)

```
cd mobile
```

#### Execute o comando para instalações de dependências do Mobile:

```
yarn

ou

npm install
```

#### Execute o comando para iniciar o aplicativo:
> Certifique de configurar o emulador ou plugar o celular no computador

```
yarn android

ou

npm run android
```

ou

```
yarn ios

ou

npm run ios
```
