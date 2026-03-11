# Decentralized Semantic Markets (DSM)

**A market where the traded asset is meaning itself.**

---

## What is DSM?

Language evolves faster than any dictionary can keep up. New terms emerge daily across internet culture, finance, gaming, and technology — yet the systems we use to define them are slow, centralized, and fragile.

**Decentralized Semantic Markets** introduce a market-based mechanism for discovering, curating, and validating the meaning of language. Participants compete to define terms, vote on interpretations, and earn reputation through accurate curation — all governed by game-theoretic incentives that make honest participation the dominant strategy.

> Instead of editorial committees deciding meaning, **definitions compete in a marketplace** where collective intelligence determines semantic consensus.

---

## How It Works

```
   Submit Term          Submit Definitions         Vote (VP)
   ──────────►  [ Term ]  ──────────►  [ Defs ]  ──────────►  [ Market ]
                                                                   │
                                          ┌────────────────────────┘
                                          ▼
                                    [ Consensus ]
                                     │         │
                              DP Reward    Rep Feedback
                              to Author    to Voters
```

1. **Discover** — Identify emerging terminology and create new terms (requires VP stake).
2. **Define** — Submit competing definitions for a term.
3. **Curate** — Allocate Voting Points (VP) to the definition you believe will win.
4. **Earn** — Winners receive Definition Points (DP) and reputation that amplifies future influence.

Early discovery is rewarded exponentially. Spam is penalized. Collusion is economically infeasible.

---

## Key Properties

| Property | Mechanism |
|----------|-----------|
| **Sybil Resistance** | Convex VP cost curves (`Cost = a × VP^b`, `b > 1`) |
| **Quality Incentives** | Temporal reward decay (`R(t) = R₀ × e^(−kt)`) rewards early, accurate submissions |
| **Anti-Collusion** | Superlinear coordination costs exceed potential collusive gains |
| **Meritocratic Influence** | Reputation-weighted voting (`VP × log(1 + Rep)`) with diminishing returns |
| **Nash Equilibrium** | Dominant strategy: submit high-quality definitions early, vote honestly |

---

## Repository Structure

```
decentralized-semantic-markets/
├── whitepaper/
│   └── DSM-whitepaper.md          # Full whitepaper
├── math/
│   └── formal-model.tex           # LaTeX: game definition, Nash equilibrium proofs,
│                                  #   payoff functions, anti-collusion cost modeling
├── tokenomics/
│   └── vp-dp-model.md             # VP/DP issuance, cost curves, reputation model,
│                                  #   collusion thresholds with parameter tables
├── diagrams/
│   ├── token-flow.png             # System architecture & token flow diagram
│   ├── temporal-reward-decay.png  # Incentive curve visualization
│   ├── payoff-matrix.png          # Game-theoretic payoff matrix
│   └── diagrams.jsx               # React source for diagram generation
└── README.md
```

---

## Use Cases

- **Internet Slang Dictionary** — A living dictionary for online culture, incentive-driven instead of editorially curated.
- **AI Training Data** — Consensus-validated definitions for LLM training pipelines that stay current with evolving language.
- **Cultural Trend Detection** — Early term creation signals as leading indicators for emerging trends.
- **Semantic Knowledge Graphs** — Decentralized ontology layer for AI systems and search engines.

---

## Core Equations

**Reward Decay** — early contributors earn exponentially more:
```
R(t) = R₀ × e^(−kt)
```

**Vote Weight** — reputation amplifies influence with diminishing returns:
```
VoteWeight(i) = VP(i) × log(1 + Rep(i))
```

**VP Cost Curve** — prevents concentration of power:
```
Cost(VP) = a × VP^b       (b > 1)
```

**Collusion Threshold** — collusion is unprofitable when:
```
Σ [a × VP^b]  >  π_c × R₀ × e^(−kτ̄)
```

---

## Diagrams

| | |
|:---:|:---:|
| ![System Architecture](diagrams/token-flow.png) | ![Reward Decay](diagrams/temporal-reward-decay.png) |
| *System Architecture & Token Flow* | *Temporal Reward Decay Curve* |
| ![Payoff Matrix](diagrams/payoff-matrix.png) | |
| *Game-Theoretic Payoff Matrix* | |

---

## Read the Whitepaper

**[Full Whitepaper →](whitepaper/DSM-whitepaper.md)**

**[Formal Mechanism Design (LaTeX) →](math/formal-model.tex)**

**[Tokenomics Model →](tokenomics/vp-dp-model.md)**

---

## Author

**Sypher** — 2026

---

*DSM is a research proposal. This repository contains the whitepaper, formal models, and supporting materials for community review and discussion.*
