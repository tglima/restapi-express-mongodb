# Por onde começar?

## Objetivo

Meu objetivo pessoal neste projeto é praticar e consolidar vários itens que tenho estudado, acredito que a melhor forma de aprender algo é construir algo expandindo seus recentes aprendizados. Já o objetivo desta página é fazer uma apresentação geral do projeto e detalhar suas as principais regras de negócios.

---

## O cliente

Neste projeto atenderemos a necessidade de um cliente fictício que se chama "CloudStreaming". A CloudStreaming é uma plataforma de serviços de streaming que visa oferecer um serviço similar ao da NetFlix, Prime Vídeo, Disney+, etc. Por ainda ser uma pequena startup ela solicitou a criação de uma API REST que possa ser consumida facilmente por um Chat Bot, uma Landing page ou aplicativo mobile. O objetivo da API é simples, gerenciar o cadastro de clientes, listar os seus planos disponíveis e possibilitar ao cliente que ele adquira, altere ou cancele facilmente um de seus planos.

## Regras de negócios

### Cadastro de clientes

Para o cadastro de novos clientes deveram ser coletados os seguintes dados:

- Nome completo
- CPF
- E-mail
- DDD
- Telefone
- Data de nascimento
- Sexo biológico (F ou M).

Além dos dados acima coletados, também precisam ser salvos no registro:

- Id único do cliente
- Id do usuário que fez o cadastro do cliente
- Data de registro do cliente no banco de dados
- Id do usuário que realizou a última alteração no cadastro do cliente
- Data da última edição do cadastro
- Bit que indica se o cadastro do cliente ainda está ativo

Não deve ser permitido:

- Dois ou mais clientes com o mesmo número de CPF.
- Clientes com idade inferior a 18 anos
- Clientes com idade superior a 100 anos
- Não informar o E-mail ou o número de telefone completo(DDD e Telefone). O cliente pode até não informar um, porém o outro deve ser informado.

Deve estar disponível um endpoint que possibilite a alteração dos dados cadastrais de um cliente.

### Planos

Atualmente estão disponíveis os seguintes produtos:

| Nome do produtos | Qualidade do vídeo | Resolução | Telas simultâneas | Valor mensal |
| :--------------: | :----------------: | :-------: | :---------------: | :----------: |
|      Basic       |        Good        |   480p    |         1         |    14,99     |
|     Standard     |       Better       |   1080p   |         2         |    34,99     |
|     Premium      |        Best        |  4K+HDR   |         4         |    54,99     |

Além dos dados acima também precisam ser salvos no registro:

- Id único do produto
- Id do usuário que fez o cadastro do produto
- Data de registro do produto no banco de dados
- Bit que indica se o cadastro do produto ainda está ativo

### Vendas

Todas as vendas registradas devem conter as seguintes informações

- Id único da venda.
- Id do Cliente.
- Id do Produto/Plano.
- Nome do produto no momento da venda.
- Valor mensal do plano no momento da venda.
- Id do usuário que registrou a venda.
- Data de início do plano e a data fim do mesmo.
- Data em que venda foi registrada no banco de dados.
- Id do usuário que registrou a última alteração da venda
- Data da última alteração da venda.
- Bit que indica se a venda ainda conta como ativa

Pontos de atenção sobre as vendas:

- A data fim de um plano deve ser exatamente um ano após a data de início.
- Se faz necessário salvar o nome e valor dos planos na tabela de venda, visto que essas informações podem ser alteradas no produto original e essas alterações não podem refletir em uma venda antiga.
- Ao realizar uma nova venda pela API esta não pode ter a data de início inferior ao dia atual.
- Caso o cliente opte por mudar de plano, a data de início e a data fim também serão alterados para o dia correspondente a alteração.

### Usuários

Os endpoints da aplicação devem ser preparados para operar com níveis diferentes de acesso, sendo assim cada usuário cadastrado na base de dados deve ter o seu nível acesso específico.

Inicialmente o banco de dados já deve trazer os seguintes perfis já cadastrados:

| IdDoPerfil |   Nome   | Descrição                                                                                   |
| :--------: | :------: | :------------------------------------------------------------------------------------------ |
|     1      | SysAdmin | Perfil sem nenhuma restrição de acesso. Destinado para realizar qualquer ação na API.       |
|     2      |  Admin   | Perfil administrativo. Destinado para ações que exigem um nível mais alto de permissão.     |
|     3      |   User   | Perfil de usuário com pouco acesso. Destinado para ações mais comuns dentro da api.         |
|    999     |  Guest   | Perfil de convidado, acesso super restrito. Destinado para ações bem simples dentro da api. |

Ao disponibilizar a aplicação a mesma já deve conter usuários com os perfis citados acima.

### Formulário de Contato

A API também deve fornecer um endpoint onde qualquer pessoa possa registrar uma mensagem de contato. Toda mensagem salva no banco de dados deve conter as seguintes informações:

- Nome do contato
- Mensagem
- Telefone de contato
- E-mail de contato

Não será obrigatório o envio do telefone e do e-mail, porém uma destas duas informações deve ser coletada para que a CloudStreaming possa entrar em contato depois com a pessoa.

## Especificações Técnicas

Entre os itens exigidos pelo cliente temos:

- A aplicação deve ser construída para ser executada em um container.
- A tecnologia para criação da APi deverá ser Javascript(NodeJS ou Deno), Python ou Go.
- A API deve salvar no banco de dados registros de logs de todas as requisições feitas, sem a necessidade de depender de outras ferramentas.
- A API precisa ser bem documentada, contendo um Swagger com todos os seus endpoints devidamente detalhados.
- A CloudStreaming não utiliza o conceito de exclusão de dados na base dados, a mesma opta pelo controle de um bit que informa se aquele registro está ativo ou não.
- O banco de dados deverá ser MongoDb ou PostgreSQL visto que ambos já são utilizados por eles(CloudStreaming) em outras aplicações.
- No final do projeto o código-fonte de todo o projeto deverá ser repassado para eles.
