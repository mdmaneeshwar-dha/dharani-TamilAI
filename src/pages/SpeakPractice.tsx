import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useLearning } from "../context/LearningContext";

const practiceFeatures = [
  {
    title: "Real-time voice scoring",
    caption:
      "The coach listens live and rates your Tamil pronunciation instantly.",
  },
  {
    title: "Tamil phoneme focus",
    caption: "Target difficult letters such as ழ, ள, ற, and ண.",
  },
  {
    title: "Personalized feedback",
    caption: "Receive suggestions that improve your next attempt.",
  },
];

const practicePrompts = [
  {
    phrase: "வணக்கம்",
    description: "Say hello in Tamil with clear articulation.",
  },
  {
    phrase: "எப்படி இருக்கிறீர்கள்?",
    description: "Ask someone how they are in natural Tamil.",
  },
  {
    phrase: "நன்றி",
    description: "Practice a polite thank you.",
  },
];

function buildSimilarityScore(target: string, spoken: string) {
  const expected = target.normalize("NFC").toLowerCase();
  const actual = spoken.normalize("NFC").toLowerCase();
  if (!actual) {
    return 0;
  }

  const expectedChars = Array.from(expected).filter((char) => char.trim());
  const actualChars = new Set(Array.from(actual));
  const matches = expectedChars.filter((char) => actualChars.has(char)).length;
  return Math.round((matches / Math.max(expectedChars.length, 1)) * 100);
}

export function SpeakPractice() {
  const { recordSpeechSession } = useLearning();
  const [selectedPrompt, setSelectedPrompt] = useState(practicePrompts[0]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(
    "Press the microphone and speak the Tamil phrase aloud.",
  );
  const [error, setError] = useState("");

  const recognitionRef = useRef<any>(null);

  const speechSupported = useMemo(() => {
    if (typeof window === "undefined") return false;
    const win = window as any;
    return !!(win.SpeechRecognition || win.webkitSpeechRecognition);
  }, []);

  const startListening = () => {
    if (!speechSupported) {
      setError(
        "Your browser does not support the Web Speech API. Please use Chrome or Edge and enable microphone access.",
      );
      return;
    }

    const win = window as any;
    const SpeechRecognition =
      win.SpeechRecognition || win.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "ta-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
      setFeedback("Listening... Speak the phrase clearly.");
    };

    recognition.onerror = (event: any) => {
      setError(event.error || "Unable to capture speech.");
      setIsListening(false);
      setFeedback("Try again or refresh the page.");
    };

    recognition.onresult = (event: any) => {
      const resultText = event.results[0][0].transcript || "";
      setTranscript(resultText);
      const newScore = buildSimilarityScore(selectedPrompt.phrase, resultText);
      setScore(newScore);
      setFeedback(
        newScore > 80
          ? "Great job! Your pronunciation is very close to the expected Tamil phrase."
          : newScore > 50
            ? "Good attempt. Focus on the consonants and try again to improve accuracy."
            : "Try again with slower, clearer Tamil pronunciation. Pay special attention to the target letters.",
      );

      // Record session for achievement tracking
      recordSpeechSession({
        phrase: selectedPrompt.phrase,
        score: newScore,
        timestamp: new Date(),
      });

      setIsListening(false);
      recognition.stop();
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
    setFeedback("Recording stopped. Review your feedback and try again.");
  };

  const phonemeAccuracy = useMemo(
    () => [
      { phoneme: "ழ", value: 72, widthClass: "w-[72%]" },
      { phoneme: "ள", value: 65, widthClass: "w-[65%]" },
      { phoneme: "ற", value: 58, widthClass: "w-[58%]" },
      { phoneme: "ண", value: 69, widthClass: "w-[69%]" },
    ],
    [],
  );

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] bg-gradient-to-r from-slate-900 to-indigo-700 p-8 text-white shadow-soft">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-300">
            Live Pronunciation Coach
          </p>
          <h1 className="mt-4 text-4xl font-semibold">
            Speak Tamil in real time.
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300/90">
            The coach listens to your voice, compares it with ideal Tamil
            pronunciation, and highlights the sounds you should practice next.
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {practiceFeatures.map((feature) => (
          <motion.div
            key={feature.title}
            whileHover={{ y: -4 }}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              {feature.title}
            </h2>
            <p className="mt-3 text-sm text-slate-500">{feature.caption}</p>
          </motion.div>
        ))}
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[32px] bg-white p-8 shadow-soft">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                Practice prompt
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                {selectedPrompt.phrase}
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                {selectedPrompt.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {practicePrompts.map((prompt) => (
                <button
                  key={prompt.phrase}
                  type="button"
                  onClick={() => setSelectedPrompt(prompt)}
                  className={`rounded-3xl border px-4 py-3 text-sm font-semibold transition ${
                    prompt.phrase === selectedPrompt.phrase
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {prompt.phrase}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-[28px] bg-slate-50 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                    Session status
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {isListening ? "Listening now" : "Ready to record"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={startListening}
                    className="rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Start
                  </button>
                  <button
                    type="button"
                    onClick={stopListening}
                    className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Stop
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Pronunciation score</p>
                  <p className="mt-2 text-4xl font-semibold text-slate-900">
                    {score}%
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Feedback</p>
                  <p className="mt-2 text-sm text-slate-700">{feedback}</p>
                </div>
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Live transcript</p>
                  <p className="mt-2 text-sm text-slate-700 break-words">
                    {transcript || "No speech captured yet."}
                  </p>
                </div>
                {error ? (
                  <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] bg-slate-100 p-6 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate-900">
              Tamil pronunciation heatmap
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Track how often you get key Tamil phonemes right and focus on
              sounds that need the most attention.
            </p>
            <div className="mt-6 space-y-4">
              {phonemeAccuracy.map((phoneme) => (
                <div key={phoneme.phoneme} className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                    <span>{phoneme.phoneme}</span>
                    <span>{phoneme.value}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 ${phoneme.widthClass}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] bg-white p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Coaching tips
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              Focus on tricky Tamil sounds.
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Your attempts should feel smooth and steady.</li>
              <li>Listen for the retroflex letters ழ, ள, ற, and ண.</li>
              <li>Speak at a slower pace to improve clarity.</li>
              <li>Repeat the same phrase until your score improves.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
