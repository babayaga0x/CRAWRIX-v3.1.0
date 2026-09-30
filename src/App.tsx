import { useState, lazy, Suspense } from "react";
import { translations } from "./i18n";
import { FaGithub, FaTelegram } from "react-icons/fa";
import ResultList from "./components/ResultList";
import SEOManager from "./components/SEOManager";
import KeywordInput from "./components/KeywordInput";
import SubmitButton from "./components/SubmitButton";
import truncateLink from "./utils/truncateLink";
import { SearchResult } from "./components/ResultList";
import { searchApi } from "./features/search/searchApi";


const LanguageToggle = lazy(() => import("./components/LanguageToggle"));
const Modal = lazy(() => import("./components/Modal"));

type Language = keyof typeof translations;

const App: React.FC = () => {
  const [keywords, setKeywords] = useState<string>("");
  const [result, setResult] = useState<SearchResult[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>("en");

  const handleSubmit = async () => {
    const keywordsArray = keywords.split(",").map((kw) => kw.trim());

    if (keywordsArray.length === 0) return;

    setLoading(true);

    try {
      const data = await searchApi(
        keywordsArray,
        language === "es" ? "es" : "en",
      );

      console.log("DATA FROM API:", data);

      setResult(data);
    } catch (error) {
      console.error("Error during fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setResult(null);
    setKeywords("");
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);
  const toggleLanguage = () => setLanguage(language === "en" ? "es" : "en");
  const t = translations[language];

  return (
    <>
      <SEOManager language={language} />
      <div className="App">
        <h1>{t.title}</h1>
        <h2>{t.subheading}</h2>
        <div>
          <KeywordInput
            keywords={keywords}
            setKeywords={setKeywords}
            placeholder={t.placeholder}
          />
        </div>
        <hr />
        <SubmitButton
          handleSubmit={handleSubmit}
          loading={loading}
          text={t.parseButton}
        />

        {result && (
          <ResultList
            result={result}
            truncateLink={truncateLink}
            handleBack={handleBack}
            backButtonText={t.backButton}
            noLinksText={t.noLinks}
          />
        )}

        <hr />

        <button onClick={toggleModal} className="modal-toggle-button">
          {t.changelogButton}
        </button>

        <div className={`modal-overlay ${isModalOpen ? "open" : ""}`}>
          <Suspense fallback={null}>
            <Modal
              isOpen={isModalOpen}
              closeModal={closeModal}
              title="Changelog"
              content={
                <section>
                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      fontFamily: "inherit",
                      textAlign: "left",
                    }}
                  >
                    {t.changelogContent}
                  </pre>
                </section>
              }
            />
          </Suspense>
        </div>

        <hr />

        {!result && (
          <Suspense fallback={null}>
            <LanguageToggle
              language={language}
              toggleLanguage={toggleLanguage}
            />
          </Suspense>
        )}
      </div>

      <div className="seo-wrapper">
        <section className="seo-description">
          <h2>{t.modalTitle}</h2>
          <p>{t.modalContent}</p>
          <h2>{t.connectTitle}</h2>
          <div className="social-icons">
            <a
              href="https://github.com/babayaga0x"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub /> Github
            </a>
            <a
              href="https://t.me/Equil1brium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram /> Telegram
            </a>
          </div>
          <hr />
          All rights reserved. <br />
          Developer: Martin Daniels.
          <br />
          v3.1.0
        </section>
      </div>
    </>
  );
};

export default App;

export default App;
