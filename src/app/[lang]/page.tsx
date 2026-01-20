import { getDictionary } from '@/get-dictionary';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhySection from '@/components/WhySection';
import BookList from '@/components/BookList';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const validLang = (['fr', 'uk'].includes(lang) ? lang : 'fr') as 'fr' | 'uk';
    const dict = await getDictionary(validLang);

    return (
        <main className={styles.main}>
            <Header lang={validLang} />
            <Hero dict={dict} lang={validLang} />
            <WhySection dict={dict} />
            <BookList dict={dict} />
            <Footer dict={dict} lang={validLang} />
        </main>
    );
}
