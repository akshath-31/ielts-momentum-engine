import { useState } from 'react'
import styles from './InputScreen.module.css'

const BAND_OPTIONS = []
for (let i = 0; i <= 9; i += 0.5) {
  BAND_OPTIONS.push(parseFloat(i.toFixed(1)))
}

export default function InputScreen({ onGenerate }) {
  const [form, setForm] = useState({
    currentBand: 5.5,
    targetBand: 7.0,
    daysLeft: 30,
    dailyHours: 2,
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (form.targetBand <= form.currentBand)
      e.targetBand = 'Target band must be higher than your current band.'
    if (form.daysLeft < 1)
      e.daysLeft = 'Please enter at least 1 day.'
    if (form.dailyHours < 0.5 || form.dailyHours > 24)
      e.dailyHours = 'Please enter between 0.5 and 24 hours.'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    onGenerate(form)
  }

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: parseFloat(e.target.value) || e.target.value }))

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.logo}>🎯</div>
        <h1 className={styles.title}>IELTS Momentum Engine</h1>
        <p className={styles.tagline}>
          Turn daily effort into measurable band score progress
        </p>
      </header>

      {/* ── Form Card ── */}
      <main className={styles.main}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Set Up Your Profile</h2>
          <p className={styles.cardSubtitle}>
            Tell us where you are and where you want to be — we'll build your daily plan.
          </p>

          <form onSubmit={handleSubmit} noValidate>

            {/* Current Band */}
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="currentBand">
                📊 Current IELTS Band Score
              </label>
              <select
                id="currentBand"
                className={styles.select}
                value={form.currentBand}
                onChange={set('currentBand')}
              >
                {BAND_OPTIONS.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            {/* Target Band */}
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="targetBand">
                🏆 Target IELTS Band Score
              </label>
              <select
                id="targetBand"
                className={styles.select}
                value={form.targetBand}
                onChange={set('targetBand')}
              >
                {BAND_OPTIONS.filter((v) => v > 0).map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
              {errors.targetBand && (
                <span className={styles.error}>{errors.targetBand}</span>
              )}
            </div>

            {/* Days Left */}
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="daysLeft">
                📅 Days Left Until Exam
              </label>
              <input
                id="daysLeft"
                type="number"
                className={styles.input}
                min={1}
                max={365}
                value={form.daysLeft}
                onChange={set('daysLeft')}
              />
              {errors.daysLeft && (
                <span className={styles.error}>{errors.daysLeft}</span>
              )}
            </div>

            {/* Daily Hours */}
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="dailyHours">
                ⏱️ Daily Preparation Time (hours)
              </label>
              <input
                id="dailyHours"
                type="number"
                className={styles.input}
                min={0.5}
                max={24}
                step={0.5}
                value={form.dailyHours}
                onChange={set('dailyHours')}
              />
              {errors.dailyHours && (
                <span className={styles.error}>{errors.dailyHours}</span>
              )}
            </div>

            {/* Summary row */}
            <div className={styles.summary}>
              <span>Band gap to close:</span>
              <strong className={styles.gap}>
                {Math.max(0, form.targetBand - form.currentBand).toFixed(1)} bands
              </strong>
            </div>

            <button type="submit" className={styles.cta} id="generate-plan-btn">
              Generate My Momentum Plan →
            </button>
          </form>
        </div>

        {/* How it works */}
        <div className={styles.howIt}>
          <h3 className={styles.howTitle}>How it works</h3>
          <div className={styles.steps}>
            {[
              { icon: '📝', label: 'Enter your scores & timeline' },
              { icon: '✅', label: 'Complete daily tasks' },
              { icon: '📈', label: 'Watch your predicted score rise' },
            ].map((s, i) => (
              <div key={i} className={styles.step}>
                <span className={styles.stepIcon}>{s.icon}</span>
                <span className={styles.stepLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
