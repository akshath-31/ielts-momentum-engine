import styles from './ProgressBar.module.css'

export default function ProgressBar({ percent }) {
  return (
    <div className={styles.track} role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
      <div
        className={styles.fill}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
