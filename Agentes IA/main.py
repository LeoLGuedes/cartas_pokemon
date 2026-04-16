import os
import subprocess
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, Process, LLM

load_dotenv()

llm = LLM(
    model="openrouter/deepseek/deepseek-r1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)

# ── Leitura de arquivos modificados via Git ───────────────────────────────

EXTENSOES_VALIDAS = (".js", ".jsx", ".ts", ".tsx")


def ler_arquivos_modificados(branch_base: str = "main") -> str:
    """Usa git diff para ler APENAS os arquivos JS/JSX/TS/TSX que foram
    modificados na branch atual em relação à branch base."""
    try:
        saida = subprocess.check_output(
            f"git diff --name-only {branch_base}...HEAD",
            shell=True,
            text=True,
        )
    except subprocess.CalledProcessError:
        return ""

    arquivos = saida.strip().splitlines()
    conteudo_total = []

    for caminho in arquivos:
        if not caminho.endswith(EXTENSOES_VALIDAS):
            continue

        if not os.path.exists(caminho):
            continue

        try:
            with open(caminho, "r", encoding="utf-8") as f:
                texto = f.read()
        except (OSError, UnicodeDecodeError):
            continue

        conteudo_total.append(
            f"// ===== ARQUIVO: {caminho} =====\n{texto}"
        )

    return "\n\n".join(conteudo_total)


# ── Agentes ────────────────────────────────────────────────────────────────

analista_logica = Agent(
    role="Analista de Lógica Sênior Fullstack",
    goal=(
        "Analisar o código-fonte de um projeto React + Express + MySQL em "
        "profundidade, identificando: promessas mal resolvidas (async/await), "
        "possíveis injeções de SQL nas queries do banco, gargalos de "
        "performance na comunicação Axios (Frontend) -> Express (Backend) e "
        "tratamento inadequado de erros no consumo da API externa de Pokémons."
    ),
    backstory=(
        "Você é um engenheiro fullstack sênior com mais de 15 anos de experiência "
        "em stacks JavaScript. Já auditou dezenas de projetos React/Node e "
        "conhece profundamente os anti-patterns de cada camada: desde race "
        "conditions no frontend, passando por middlewares Express mal "
        "configurados, até queries MySQL vulneráveis a SQL injection. "
        "Você pensa em termos de fluxo de dados ponta a ponta — do clique do "
        "usuário até a resposta do banco — e encontra falhas que passam "
        "despercebidas em code reviews comuns."
    ),
    llm=llm,
    verbose=True,
)

cacador_bugs = Agent(
    role="Caçador de Bugs e Engenheiro de QA",
    goal=(
        "Receber a análise do Analista de Lógica Fullstack, confirmar os bugs "
        "encontrados e identificar problemas adicionais de sintaxe, retornos "
        "inadequados do Express para o React, imports quebrados e código "
        "inseguro. Ao final, entregar o código corrigido, limpo e seguro."
    ),
    backstory=(
        "Você é um engenheiro de QA meticuloso especializado em aplicações "
        "web JavaScript. Você não deixa nenhum bug escapar: testa mentalmente "
        "cada rota Express verificando se os status HTTP estão corretos, se "
        "o JSON de resposta é consistente, se os erros são tratados com "
        "try/catch adequados e se o frontend React consome os dados de forma "
        "segura. Você reescreve o código corrigido seguindo boas práticas."
    ),
    llm=llm,
    verbose=True,
)

# ── Tarefas ────────────────────────────────────────────────────────────────

tarefa_analise = Task(
    description=(
        "Analise o seguinte código-fonte de um projeto React + Express + MySQL "
        "(um CRUD de cartas Pokémon) e identifique TODOS os problemas.\n\n"
        "Foque especialmente em:\n"
        "1. **Async/Await:** Promessas não tratadas, callbacks sem error handling, "
        "chamadas assíncronas sem await.\n"
        "2. **SQL Injection:** Queries montadas com concatenação de strings em "
        "vez de prepared statements.\n"
        "3. **Performance Axios <-> Express:** Requisições desnecessárias, falta "
        "de loading states, ausência de debounce em buscas, respostas não "
        "otimizadas.\n"
        "4. **Tratamento de erros:** Respostas HTTP incorretas, erros engolidos "
        "silenciosamente, falta de validação de dados no backend.\n"
        "5. **Segurança:** Credenciais expostas, CORS permissivo, falta de "
        "sanitização de inputs.\n\n"
        "Para cada problema encontrado, informe:\n"
        "- Arquivo e linha aproximada\n"
        "- Descrição do problema\n"
        "- Impacto (erro de execução, vulnerabilidade, performance, etc.)\n"
        "- Sugestão de correção com código\n\n"
        "CÓDIGO DO PROJETO:\n\n{codigo}"
    ),
    expected_output=(
        "Um relatório detalhado em Markdown listando todos os bugs, "
        "vulnerabilidades e problemas de lógica encontrados no projeto, "
        "organizados por categoria (Segurança, Lógica, Performance, etc.), "
        "com explicações claras e sugestões de correção com código."
    ),
    agent=analista_logica,
)

tarefa_correcao = Task(
    description=(
        "Com base na análise de bugs recebida do Analista de Lógica Fullstack, "
        "faça o seguinte:\n\n"
        "1. **Confirme** cada bug reportado (concordando ou discordando com "
        "justificativa técnica).\n"
        "2. **Identifique** qualquer bug adicional de sintaxe, retornos "
        "inadequados do Express, ou problemas no React que não foram mencionados.\n"
        "3. **Reescreva** os trechos de código que precisam de correção, "
        "entregando versões corrigidas e otimizadas.\n"
        "4. **Classifique** cada problema por severidade: CRÍTICO, ALTO, MÉDIO "
        "ou BAIXO.\n\n"
        "O resultado deve ser um relatório final em Markdown com a estrutura:\n"
        "- Resumo executivo\n"
        "- Lista de problemas confirmados (com severidade)\n"
        "- Código corrigido para cada arquivo afetado\n"
        "- Recomendações gerais para o projeto"
    ),
    expected_output=(
        "Relatório final de auditoria em Markdown contendo: resumo executivo, "
        "lista de problemas classificados por severidade, código corrigido "
        "para cada arquivo afetado e recomendações gerais."
    ),
    agent=cacador_bugs,
)

# ── Crew ───────────────────────────────────────────────────────────────────

equipe_debug = Crew(
    agents=[analista_logica, cacador_bugs],
    tasks=[tarefa_analise, tarefa_correcao],
    process=Process.sequential,
    verbose=True,
)

# ── Execução ───────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("=" * 60)
    print("  Bug Hunter AI — Auditoria de Projeto React/Express/MySQL")
    print("=" * 60)

    codigo = ler_arquivos_modificados("origin/main")
    if not codigo.strip():
        print("Nenhum arquivo JS/TS modificado em relação à branch main. Auditoria não necessária.")
        exit(0)

    print(f"\nArquivos modificados carregados. Iniciando auditoria...\n")

    resultado = equipe_debug.kickoff(inputs={"codigo": codigo})

    caminho_relatorio = os.path.join(".", "relatorio_auditoria.md")
    with open(caminho_relatorio, "w", encoding="utf-8") as f:
        f.write(str(resultado))

    print("\n" + "=" * 60)
    print("  AUDITORIA CONCLUÍDA")
    print("=" * 60)
    print(f"Relatório salvo em: {os.path.abspath(caminho_relatorio)}")
