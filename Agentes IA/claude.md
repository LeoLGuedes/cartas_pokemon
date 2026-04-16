# Contexto da Plataforma: Bug Hunter AI

## Objetivo do Projeto
Criar um sistema multiagente focado em análise de código, depuração (debugging) e identificação de erros de lógica, utilizando o framework **CrewAI**.

## Arquitetura de IA
- **LLM Principal:** DeepSeek-R1 (modelo de raciocínio avançado focado em lógica e matemática, com excelente custo-benefício).
- **Provedor:** OpenRouter.
- **Framework de Agentes:** CrewAI, utilizando execução sequencial de tarefas.

## Estrutura de Agentes
O sistema é composto por dois agentes colaborativos:
1. **Analista de Lógica Sênior:** Focado na abstração do código. Analisa a estrutura de dados, o fluxo de execução e encontra falhas lógicas e *edge cases*.
2. **Engenheiro de QA e Debugging:** Recebe a análise do primeiro agente, procura bugs de sintaxe, resolve problemas práticos de compilação/execução e reescreve o código corrigido de forma otimizada.

## Variáveis de Ambiente
O projeto depende da variável `OPENROUTER_API_KEY`, carregada via `.env`. A base URL da API é `https://openrouter.ai/api/v1`.
