# Dados para Inserção no Backend (Swagger UI)

Aqui estão os dados exatos (no formato JSON) mapeados para os campos das rotas `POST` do seu backend. Você pode usar o botão "Try it out" no seu `/docs` (Swagger) e colar esses códigos na área de Request Body.

---

## 1. Profile (`POST /profiles/`)

```json
{
  "full_name": "Pedro Santos",
  "tagline": "Desenvolvedor Mobile & Fullstack",
  "short_bio": "Construo sistemas completos — do backend à interface — com foco em código limpo, arquitetura sólida e experiências que fazem sentido para quem usa.",
  "about": "Sou desenvolvedor com experiência em construir sistemas de ponta a ponta, participando ativamente desde a idealização de projetos e documentação, até a arquitetura do banco de dados e a interface final. Passei pela Apple Developer Academy, onde publiquei 4 aplicativos na App Store até o momento e aprendi a pensar produto, design e código como um todo. Trabalhei com sistemas federais na Polícia Federal e hoje desenvolvo soluções com IA no Instituto de Pesquisas Eldorado. Tenho muito interesse em continuar aprendendo sobre arquiteturas de software, desenvolvimento mobile e web.",
  "email": "pedrohenriqueph004@gmail.com",
  "linkedin_url": "https://www.linkedin.com/in/pedrosantos004",
  "github_url": "https://github.com/PedroHenrique004"
}
```

---

## 2. Experience (`POST /experiences/`)

### Experiência 1
```json
{
  "company": "Apple Developer Academy",
  "role": "Desenvolvedor iOS",
  "description": "Programa educacional em parceria com a Apple que forma desenvolvedores completos através da metodologia Challenge Based Learning (CBL) — aprendizado baseado em desafios reais, unindo desenvolvimento, design e visão de produto/negócio. Atuação multidisciplinar do problema à solução publicada.",
  "start_date": "2024-02-01",
  "end_date": null,
  "display_order": 0
}
```

### Experiência 2
```json
{
  "company": "Instituto de Pesquisas Eldorado",
  "role": "Desenvolvedor Fullstack — Estágio",
  "description": "Projeto voltado a soluções com IA, trabalhando com múltiplas arquiteturas ao longo do tempo. Idealizei e desenvolvi estruturas complexas com autonomia, contando com apoio de desenvolvedores experientes — atuação que foi além da execução, incluindo decisões de arquitetura.",
  "start_date": "2025-01-01",
  "end_date": null,
  "display_order": 1
}
```

### Experiência 3
```json
{
  "company": "Polícia Federal",
  "role": "Desenvolvedor de Sistemas — Estágio",
  "description": "Desenvolvimento de sistemas completos ponta a ponta: idealização, documentação, implementação e manutenção. Aprendizado profundo sobre o ciclo completo de construção de um sistema, da concepção à entrega em produção.",
  "start_date": "2024-04-01",
  "end_date": "2024-12-01",
  "display_order": 2
}
```

---

## 3. Projects (`POST /projects/`)

### Projeto 1
```json
{
  "title": "\"Saúde+\" — iOS health tracking app",
  "short_description": "Aplicativo iOS para acompanhamento de saúde com integração ao HealthKit e visualizações interativas de dados.",
  "full_description": "Aplicativo nativo focado no acompanhamento diário de saúde. Desenvolvido inteiramente com SwiftUI e integrado profundamente ao HealthKit da Apple para capturar e exibir métricas de saúde com gráficos interativos e animações fluidas.",
  "repository_url": null,
  "live_demo": null,
  "image_url": null,
  "display_order": 0
}
```

### Projeto 2
```json
{
  "title": "\"DocFlow\" — Gestão de Documentos",
  "short_description": "Plataforma web para gestão de documentos internos com fluxo de aprovação e controle de versões.",
  "full_description": "Plataforma interna completa para empresas lidarem com processos documentais. Back-end construído em FastAPI com controle de acesso robusto, e front-end dinâmico construído em React com fluxos de aprovação em tempo real.",
  "repository_url": null,
  "live_demo": null,
  "image_url": null,
  "display_order": 1
}
```

---

## 4. Testimonials (`POST /testimonials/`)

### Depoimento 1
```json
{
  "name": "Mentor Técnico",
  "role": "Orientador",
  "company": "Apple Developer Academy",
  "message": "Pedro demonstra uma incrível habilidade de pensar no produto de ponta a ponta. Vai muito além do código, compreendendo as necessidades do usuário e as transformando em aplicativos publicados com alto nível de acabamento técnico.",
  "photo_url": null,
  "linkedin_url": null,
  "display_order": 0
}
```

### Depoimento 2
```json
{
  "name": "Tech Lead",
  "role": "Líder Técnico",
  "company": "Instituto de Pesquisas Eldorado",
  "message": "Para um estagiário, o nível de maturidade e autonomia do Pedro na tomada de decisões de arquitetura foi impressionante. Ele não apenas executava demandas, mas questionava e propunha melhorias estruturais para a integração com os modelos de IA.",
  "photo_url": null,
  "linkedin_url": null,
  "display_order": 1
}
```

> **Atenção:** Como o backend exige o formato exato dos campos, deixei os links que não possuímos como `null`. Na hora de colar no Swagger UI, você só precisa copiar o bloco de chaves `{ ... }` inteiro e executar.
