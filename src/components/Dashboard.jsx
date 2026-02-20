import { useState, useMemo } from 'react'
import styles from './Dashboard.module.css'
import ProgressBar from './ProgressBar'

/* ── Task Definitions ──────────────────────────────────────── */
const TASKS = [
  {
    id: 'listening',
    icon: '🎧',
    label: 'Listening Practice',
    description: 'Complete one full IELTS Listening section. Focus on note completion and multiple-choice questions.',
    scoreGain: 0.05,
    tag: '+0.05',
    color: 'blue',
  },
  {
    id: 'reading',
    icon: '📖',
    label: 'Reading Practice',
    description: 'Read one academic passage. Practise True/False/Not Given and skimming strategies.',
    scoreGain: 0.05,
    tag: '+0.05',
    color: 'teal',
  },
  {
    id: 'writing',
    icon: '✍️',
    label: 'Writing Task',
    description: 'Write a 250+ word Task 2 essay. Self-evaluate coherence, cohesion, and vocabulary range.',
    scoreGain: 0.10,
    tag: '+0.10',
    color: 'violet',
  },
  {
    id: 'speaking',
    icon: '🗣️',
    label: 'Speaking Exercise',
    description: 'Record yourself on a Part 2 cue card. Review filler words and pronunciation.',
    scoreGain: 0.10,
    tag: '+0.10',
    color: 'rose',
  },
]

/* ── Helper: clamp score to 9.0 ──────────────────────────── */
const clamp = (val) => Math.min(9.0, parseFloat(val.toFixed(2)))

export default function Dashboard({ inputs, onReset }) {
  const { currentBand, targetBand, daysLeft, dailyHours } = inputs

  // Checked state: { listening: false, reading: false, ... }
  const [checked, setChecked] = useState(
    Object.fromEntries(TASKS.map((t) => [t.id, false]))
  )

  const toggle = (id) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))

  /* ── Derived calculations ────────────────────────────────── */
  const { predictedScore, progressPct, isOnTrack, completedCount } = useMemo(() => {
    const gained = TASKS.reduce(
      (sum, t) => (checked[t.id] ? sum + t.scoreGain : sum),
      0
    )
    const predicted = clamp(currentBand + gained)
    const gap = targetBand - currentBand
    const progress = gap > 0 ? Math.min((gained / gap) * 100, 100) : 100

    return {
      predictedScore: predicted,
      progressPct: Math.round(progress),
      isOnTrack: progress >= 50,
      completedCount: TASKS.filter((t) => checked[t.id]).length,
    }
  }, [checked, currentBand, targetBand])

  const maxGain = TASKS.reduce((s, t) => s + t.scoreGain, 0)
  const maxPossible = clamp(currentBand + maxGain)

  return (
    <div className={styles.page}>

      {/* ── Top Bar ────────────────────────────────────────── */}
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <span className={styles.logoSmall}>🎯</span>
          <span className={styles.topbarTitle}>IELTS Momentum Engine</span>
        </div>
        <button
          className={styles.resetBtn}
          onClick={onReset}
          id="reset-btn"
          title="Start Over"
        >
          ← Back
        </button>
      </header>

      <main className={styles.main}>

        {/* ── Score Hero ───────────────────────────────────── */}
        <section className={styles.scoreHero}>
          <div className={styles.scoreCard} id="current-score-card">
            <span className={styles.scoreLabel}>Current Score</span>
            <span className={styles.scoreValue}>{currentBand.toFixed(1)}</span>
          </div>

          <div className={styles.arrow}>→</div>

          <div className={`${styles.scoreCard} ${styles.predictedCard}`} id="predicted-score-card">
            <span className={styles.scoreLabel}>Predicted Score</span>
            <span className={`${styles.scoreValue} ${styles.predictedValue}`}>
              {predictedScore.toFixed(1)}
            </span>
            {completedCount > 0 && (
              <span className={styles.gainBadge}>
                +{(predictedScore - currentBand).toFixed(2)}
              </span>
            )}
          </div>

          <div className={styles.arrow}>→</div>

          <div className={styles.scoreCard} id="target-score-card">
            <span className={styles.scoreLabel}>Target Score</span>
            <span className={`${styles.scoreValue} ${styles.targetValue}`}>
              {targetBand.toFixed(1)}
            </span>
          </div>
        </section>

        {/* ── Progress Section ─────────────────────────────── */}
        <section className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Progress toward Band {targetBand}</span>
            <span className={styles.progressPct}>{progressPct}%</span>
          </div>
          <ProgressBar percent={progressPct} />

          {/* Feedback Message */}
          <div
            className={`${styles.feedback} ${isOnTrack ? styles.feedbackGood : styles.feedbackWarn}`}
            id="feedback-message"
          >
            {isOnTrack ? (
              <>
                <span className={styles.feedbackIcon}>✅</span>
                <span>
                  You are on track to reach your target band score if you continue this daily momentum.
                </span>
              </>
            ) : (
              <>
                <span className={styles.feedbackIcon}>⚠️</span>
                <span>
                  You need to complete more tasks to stay on track.
                </span>
              </>
            )}
          </div>
        </section>

        {/* ── Study Plan ────────────────────────────────────── */}
        <section className={styles.planSection}>
          <div className={styles.planHeader}>
            <h2 className={styles.planTitle}>📋 Today's Study Plan</h2>
            <span className={styles.planMeta}>
              {completedCount}/{TASKS.length} tasks · {daysLeft} days left · {dailyHours}h/day
            </span>
          </div>

          <div className={styles.taskList}>
            {TASKS.map((task) => (
              <label
                key={task.id}
                className={`${styles.taskCard} ${styles[`task-${task.color}`]} ${checked[task.id] ? styles.taskChecked : ''}`}
                htmlFor={`task-${task.id}`}
                id={`task-card-${task.id}`}
              >
                <div className={styles.taskLeft}>
                  <input
                    type="checkbox"
                    id={`task-${task.id}`}
                    className={styles.checkbox}
                    checked={checked[task.id]}
                    onChange={() => toggle(task.id)}
                  />
                  <div className={styles.taskIcon}>{task.icon}</div>
                  <div className={styles.taskBody}>
                    <span className={styles.taskLabel}>{task.label}</span>
                    <span className={styles.taskDesc}>{task.description}</span>
                  </div>
                </div>
                <span className={`${styles.taskTag} ${checked[task.id] ? styles.taskTagDone : ''}`}>
                  {checked[task.id] ? '✓ ' : ''}{task.tag}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* ── Info Footer ──────────────────────────────────── */}
        <section className={styles.infoRow}>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>🏆</span>
            <span className={styles.infoLabel}>Max achievable today</span>
            <strong className={styles.infoValue}>Band {maxPossible.toFixed(1)}</strong>
          </div>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>📅</span>
            <span className={styles.infoLabel}>Days remaining</span>
            <strong className={styles.infoValue}>{daysLeft} days</strong>
          </div>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>⏱️</span>
            <span className={styles.infoLabel}>Study time today</span>
            <strong className={styles.infoValue}>{dailyHours}h</strong>
          </div>
        </section>

      </main>
    </div>
  )
}
