# DSM Tokenomics — Formal Model

**Author:** Sypher | **Date:** 2026

---

## 1. Voting Point (VP) Issuance

Each participant *i* receives an **initial VP allocation** upon entering the system:

```
VP_init(i) = V₀
```

where `V₀` is the base allocation constant (e.g., `V₀ = 100 VP`).

**Additional VP** may be acquired through purchase or earned through accurate voting:

```
VP_total(i) = V₀ + VP_purchased(i) + VP_earned(i)
```

Earned VP follows a diminishing-returns function tied to historical accuracy:

```
VP_earned(i) = η × Σ [correct_votes(i, t) × log(1 + Rep(i, t))]
```

where `η > 0` is the earn rate coefficient.

---

## 2. Nonlinear VP Purchase Curve

To prevent concentration of voting power, VP acquisition cost follows a **convex pricing function**:

```
Cost(VP) = a × VP^b       where b > 1
```

| Parameter | Description | Suggested Value |
|-----------|-------------|-----------------|
| `a` | Base cost coefficient | 0.01 |
| `b` | Convexity exponent | 1.5 |

**Marginal cost** of the *n*-th VP unit:

```
MC(n) = d/dn [a × n^b] = a × b × n^(b-1)
```

This ensures that marginal voting power becomes **progressively more expensive**, making it economically prohibitive for any single actor to dominate.

**Example cost schedule** (`a = 0.01`, `b = 1.5`):

| VP Purchased | Total Cost | Marginal Cost (last unit) |
|:---:|:---:|:---:|
| 10 | 0.316 | 0.047 |
| 100 | 10.00 | 0.150 |
| 1,000 | 316.2 | 0.474 |
| 10,000 | 10,000 | 1.500 |

---

## 3. Temporal Reward Decay Functions

Rewards for definition submission decay exponentially from term creation:

```
R(t) = R₀ × e^(−k × t)
```

| Parameter | Description | Suggested Value |
|-----------|-------------|-----------------|
| `R₀` | Base reward per term | 100 DP |
| `k` | Decay constant | 0.18 |

**Half-life** of the reward:

```
t_half = ln(2) / k ≈ 3.85 time units
```

**Cumulative reward** distributed across all winners in window `[0, T]`:

```
R_cumulative = R₀ × (1 − e^(−kT)) / k
```

**Risk-reward ratio** at time `t`:

```
RR(t) = R(t) / σ(t)
```

where `σ(t)` represents outcome uncertainty, which decreases over time as voting signals accumulate. The optimal entry point maximizes `RR(t)`.

---

## 4. Reputation-Weighted Voting

**Definition Points (DP)** serve as a non-transferable reputation score:

```
Rep(i) = Σ DP(i, t)       (cumulative across all terms)
```

**Vote weighting** incorporates reputation via a logarithmic dampening function:

```
VoteWeight(i) = VP(i) × log(1 + Rep(i))
```

Properties of this design:
- **New participants** (`Rep = 0`): `VoteWeight = 0` — must earn reputation before influencing outcomes.
- **Active participants** (`Rep = 100`): `VoteWeight = VP × 4.62` — moderate amplification.
- **Veteran participants** (`Rep = 10,000`): `VoteWeight = VP × 9.21` — high but bounded influence.

The logarithmic function ensures **diminishing returns** on reputation, preventing permanent oligarchic control.

**Effective vote total** for definition `d_j`:

```
W(j) = Σᵢ v(i,j) × log(1 + Rep(i))
```

**Winning definition:**

```
d* = argmax_j W(j)
```

---

## 5. Collusion Cost Threshold

For a collusion group `C ⊂ N` attempting to install a suboptimal definition:

### Total Collusion Cost

```
CollCost(C) = Σᵢ∈C [a × VP(i)^b] + (1 − π_c) × Σᵢ∈C [β × VP(i)]
```

where:
- `a × VP(i)^b` — convex acquisition cost per colluder
- `π_c` — probability the collusive definition wins
- `β × VP(i)` — expected VP loss from backing the losing side

### Break-Even Condition

Collusion is unprofitable when cost exceeds expected gain:

```
Σᵢ∈C [a × VP(i)^b] > π_c × R₀ × e^(−k × τ̄)
```

where `τ̄` is the average submission time of the collusion group.

### Critical Group Size

There exists a maximum viable collusion group size `|C*|` defined by:

```
|C*| = floor{ (π_c × R₀ × e^(−kτ̄)) / (a × VP_avg^b) }
```

For the suggested parameters (`a = 0.01`, `b = 1.5`, `R₀ = 100`, `k = 0.18`):

| Scenario | `π_c` | `τ̄` | Max Colluders `\|C*\|` |
|----------|:---:|:---:|:---:|
| Early, high-confidence | 0.8 | 2 | 18 |
| Mid-window | 0.5 | 10 | 3 |
| Late, low-confidence | 0.2 | 20 | 0 |

**Conclusion:** The convex VP cost curve combined with temporal reward decay makes collusion economically infeasible for any meaningfully-sized group, particularly in later voting windows.

---

## Summary of Key Equations

| Component | Equation |
|-----------|----------|
| VP Cost | `Cost(VP) = a × VP^b` |
| Reward Decay | `R(t) = R₀ × e^(−kt)` |
| Vote Weight | `VoteWeight(i) = VP(i) × log(1 + Rep(i))` |
| Winning Def | `d* = argmax_j Σᵢ v(i,j) × log(1 + Rep(i))` |
| Collusion Cost | `CollCost(C) = Σ[a × VP^b] + (1−π_c) × Σ[β × VP]` |
| VP Earn Rate | `VP_earned = η × Σ [correct × log(1 + Rep)]` |
