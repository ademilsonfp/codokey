# Codokey

Chaves de texto curtas e mínimamente dedutíveis a partir de datas, favorecendo a
ordem da mais atual para a menos atual.

## Algoritmo

Uma _codokey_ representa uma data do calendário, em seqüencia de dígitos
(_radix-36_) e em contagem regressiva, a partir da subtração dos valores máximos
de cada campo pelos seus respectivos valores. É composta inicialmente pelo ano
(campo mais significativo) até chegar ao campo da precisão escolhida (menos
significativo) e pode ter tamanhos variados, a depender da finalidade de sua
utilização para se evitar colisões, podendo chegar a nanosegundos, por exemplo.

### Contexto

Os valores máximos de ano e de fração de segundo são pré estabelecidos em um
contexto compartilhado entre _codokeys_. Se uma resolução de um século for mais
que o suficiente para um contexto de chaves específicas, por exemplo, seu valor
máximo de ano poderia ser reduzido a `99`. A fração de segundo também pode ser
expandida para suportar mais décimos (`99`), centésimos (`999`), milisegundos
(`9999`) e etc.

Existe um parâmetro de contexto a mais para o campo de ano (desde ou
_ano zero_), que serve para encurtar o resutado da chave. Para defini-lo
considere que os campos de uma _codokey_ não suportam valores negativos.

São assumidos por padrão:

- `1970` &ndash; como o _ano zero_;
- `3265` &ndash; como o valor máximo para ano (`1970 + 1295`, sendo `1295 = zz`
  em _radix-36_);
- `9` &ndash; como o valor máximo para fração de segundo.

Para os outros campos, seus valores máximos são determinados pela lógica do
calendário.

Depois de estabelecer um contexto de _codokeys_, alterá-lo requer recalcular
todas as suas chaves existentes a partir da data inicial de cada uma para um
novo contexto e descartar o anterior, mantendo assim a integridade delas.
Portanto fazer uma previsão mínima do tempo de vida e de volume de _codokeys_
antes de definir os parâmetros de um contexto, evitará problemas precoces de
colisão.

### Precisão

Outro parâmetro determinante no tamanho de uma _codokey_ é a precisão, podendo
ter os seguintes valores:

- `0` &ndash; uma chave por ano sem colisões;
- `1` &ndash; uma chave por mês sem colisões;
- `2` &ndash; uma chave por dia sem colisões;
- `3` &ndash; uma chave por hora sem colisões;
- `4` &ndash; uma chave por minuto sem colisões;
- `5` &ndash; uma chave por segundo sem colisões;
- `6` &ndash; mais de uma chave por segundo (colisão limitada ao valor máximo
  para fração de segundo do contexto).

A precisão pode variar entre chaves de um mesmo contexto, suportando pequenas e
improváveis colisões, fazendo com que as _codokeys_ deste contexto variem também
em seu tamanho. Não é recomendado quando concatenadas em chaves maiores, com
sufixo por exemplo, para isso é melhor considerar este como um parâmetro de
contexto, utilizando uma única precisão que garanta também um tamanho fixo para
todas as _codokeys_.

O valor padrão de precisão do algoritmo é assumido como `2` (dia).

### Limitações

É possível decodificar uma _codokey_ de forma a identificar a sua data de
origem e até deduzí-la porém o resultado será limitado à precisão utilizada na
geração da chave.

A imutabilidade do contexto é outra limitação conhecida pois afeta diretamente o
valor e tamanho de cada campo na seqüência de dígitos da chave.

Atualmente o algoritmo não ignora os campos mais significativos, não sendo ideal
para casos de uso onde são irrelevantes e poderiam ser ignorados por necessidade
de resultados com tamanho mais compacto.

### Sugestão de uso

Se você precisa gerar arquivos ou diretórios de forma cronológica por exemplo,
poderia utilizar _codokeys_ como um prefixo curto para os nomes,
de tamanho fixo, com ordenação intuitiva e podendo ser concatenadas com um texto
qualquer, como _semver_.

Não é um método ideal para identificadores (_ID_).

### Exemplos

```
TODO
```

[Snowflake ID]: https://en.wikipedia.org/wiki/Snowflake_ID


### Implementações

- [Node.js](nodejs/) (Typescript).
