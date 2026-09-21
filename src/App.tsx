import { useState } from "react";
import { HomeScreen } from "@/screens/HomeScreen";
import { PracticeScreen, type LessonResult } from "@/screens/PracticeScreen";
import { ResultsScreen } from "@/screens/ResultsScreen";
import { useProgress } from "@/hooks/useProgress";
import type { LanguageCode } from "@/data/languages";

type Screen =
  | { name: "home" }
  | { name: "practice"; nativeLang: LanguageCode; targetLang: LanguageCode; categoryId: string }
  | { name: "results"; result: LessonResult };

function App() {
  const [screen, setScreen] = useState<Screen>({ name: "home" });
  const { progress, recordLesson } = useProgress();

  return (
    <>
      {screen.name === "home" && (
        <HomeScreen
          progress={progress}
          onStart={(nativeLang, targetLang, categoryId) =>
            setScreen({ name: "practice", nativeLang, targetLang, categoryId })
          }
        />
      )}

      {screen.name === "practice" && (
        <PracticeScreen
          nativeLang={screen.nativeLang}
          targetLang={screen.targetLang}
          categoryId={screen.categoryId}
          onExit={() => setScreen({ name: "home" })}
          onComplete={(result) => {
            recordLesson(result.score, result.maxCombo);
            setScreen({ name: "results", result });
          }}
        />
      )}

      {screen.name === "results" && (
        <ResultsScreen
          result={screen.result}
          onHome={() => setScreen({ name: "home" })}
          onRetry={() =>
            setScreen({
              name: "practice",
              nativeLang: screen.result.nativeLang,
              targetLang: screen.result.targetLang,
              categoryId: screen.result.categoryId,
            })
          }
        />
      )}
    </>
  );
}

export default App;
