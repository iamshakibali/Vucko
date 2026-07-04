import styles from "./Showcase.module.css";

export default function Showcase() {
  return (
    <section className={styles.showcaseSection}>
      <div className={styles.showcaseContent}>
        <div className={styles.statsSide}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>PLAYS</span>
            <span className={styles.statNumber}>3M</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>LISTENERS</span>
            <span className={styles.statNumber}>1.2M</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>PINNEN</span>
            <span className={styles.statNumber}>9M</span>
          </div>
        </div>
        <div className={styles.imageSide}>
          <div className={styles.gradientCircle}></div>
          <div className={styles.imageCard}>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop"
              alt="Artist showcase"
              className={styles.artistImage}
            />
          </div>
        </div>
      </div>
      <div className={styles.showcaseFooter}>
        <span className={styles.footerText}>Spotify for Artists</span>
        <span className={styles.footerText}>#2020ARTISTWRAPPED</span>
      </div>
    </section>
  );
}
