
import LanguageSwitch from './LanguageSwitch';
import styles from './Header.module.css';

export default function Header({ lang }: { lang: 'fr' | 'uk' }) {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.inner}`}>
                {/* Logo removed as requested, leaving empty div for structure or just null */}
                <div className={styles.spacer} />

                <div className={styles.actions}>
                    <LanguageSwitch currentLang={lang} />
                </div>
            </div>
        </header>
    );
}
