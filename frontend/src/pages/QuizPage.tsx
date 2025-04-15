import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React from 'react';
// Define quiz question types
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizMetadata {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  maxReward: number;
  timeLimit: number;
}

interface QuizResult {
  score: number;
  earnedCoins: number;
  completedAt: string;
}

interface CompletedItems {
  videos: string[];
  quizzes: string[];
  coins: number;
  quizScores: {
    [key: string]: QuizResult;
  };
}

// Quiz questions data by topic
const quizQuestions: { [key: string]: QuizQuestion[] } = {
  'basic-terms': [
    {
      question: "What is a stock?",
      options: [
        "A type of bond issued by corporations",
        "A share of ownership in a company",
        "A loan given to the government",
        "A physical asset owned by a company"
      ],
      correctAnswer: 1
    },
    {
      question: "What does IPO stand for?",
      options: [
        "Internal Profit Organization",
        "International Placement Option",
        "Initial Public Offering",
        "Investment Portfolio Overview"
      ],
      correctAnswer: 2
    },
    {
      question: "What is a dividend?",
      options: [
        "A fee charged by brokers",
        "A distribution of a company's earnings to shareholders",
        "A type of stock option",
        "The price at which a stock is initially offered"
      ],
      correctAnswer: 1
    },
    {
      question: "What is a market capitalization?",
      options: [
        "The total value of a company's outstanding shares",
        "The total amount of money in a stock market",
        "The maximum profit a company can make",
        "The number of shares available for trading"
      ],
      correctAnswer: 0
    },
    {
      question: "What is a bull market?",
      options: [
        "A market where prices are falling",
        "A market controlled by large institutional investors",
        "A market where prices are rising",
        "A market with high volatility"
      ],
      correctAnswer: 2
    }
  ],
  // ... (Keep other quiz categories the same)
  'order-types': [
    {
      question: "What is a market order?",
      options: [
        "An order to buy or sell a stock at the best available current price",
        "An order to buy or sell a stock when it reaches a specified price",
        "An order that expires at the end of the trading day",
        "An order that guarantees a specific price"
      ],
      correctAnswer: 0
    },
    {
      question: "What is a limit order?",
      options: [
        "An order that can only be executed during market hours",
        "An order to buy or sell a stock at a specific price or better",
        "An order that limits the total shares you can buy",
        "An order that expires after a certain time period"
      ],
      correctAnswer: 1
    },
    {
      question: "What is a stop order?",
      options: [
        "An order that stops all trading activity",
        "An order that becomes a market order when a specified price is reached",
        "An order that prevents losses beyond a certain amount",
        "An order that must be executed immediately"
      ],
      correctAnswer: 1
    },
    {
      question: "What is a day order?",
      options: [
        "An order valid only for one trading day",
        "An order that executes at the beginning of the trading day",
        "An order that executes at the end of the trading day",
        "An order that takes a full day to process"
      ],
      correctAnswer: 0
    },
    {
      question: "What is a Good-Til-Canceled (GTC) order?",
      options: [
        "An order that expires at the end of the trading day",
        "An order that remains active until it is executed or canceled",
        "An order that can only be placed by institutional investors",
        "An order that is guaranteed to be executed"
      ],
      correctAnswer: 1
    }
  ],
  'pattern-recognition': [
    {
      question: "What pattern is characterized by a price movement that resembles the letter 'W'?",
      options: [
        "Head and Shoulders",
        "Double Top",
        "Double Bottom",
        "Triangle Pattern"
      ],
      correctAnswer: 2
    },
    {
      question: "What chart pattern suggests a trend reversal with three peaks, where the middle peak is the highest?",
      options: [
        "Triple Bottom",
        "Flag Pattern",
        "Cup and Handle",
        "Head and Shoulders"
      ],
      correctAnswer: 3
    },
    {
      question: "Which pattern is formed when the price creates two consecutive peaks at roughly the same level?",
      options: [
        "Double Top",
        "Double Bottom",
        "Pennant",
        "Wedge"
      ],
      correctAnswer: 0
    },
    {
      question: "What is a 'Cup and Handle' pattern?",
      options: [
        "A bearish reversal pattern",
        "A pattern that looks like the letter K",
        "A bullish continuation pattern resembling a cup with a handle",
        "A pattern indicating market volatility"
      ],
      correctAnswer: 2
    },
    {
      question: "What does a 'Falling Wedge' pattern typically indicate?",
      options: [
        "Continued downward movement",
        "Potential bearish reversal",
        "Market indecision",
        "Potential bullish reversal"
      ],
      correctAnswer: 3
    }
  ],
  'indicators': [
    {
      question: "What does RSI stand for in technical analysis?",
      options: [
        "Rapid Stock Index",
        "Relative Strength Index",
        "Revenue Stream Indicator",
        "Rate of Stock Increase"
      ],
      correctAnswer: 1
    },
    {
      question: "What is MACD?",
      options: [
        "Moving Average Convergence Divergence",
        "Multiple Asset Class Distribution",
        "Market Average Calculation Detail",
        "Monetary Asset Control Division"
      ],
      correctAnswer: 0
    },
    {
      question: "What does the Bollinger Bands indicator consist of?",
      options: [
        "A single moving average with support and resistance lines",
        "Two exponential moving averages",
        "A moving average with two standard deviation bands",
        "Three different weighted moving averages"
      ],
      correctAnswer: 2
    },
    {
      question: "What is the Stochastic Oscillator used for?",
      options: [
        "Predicting market crashes",
        "Identifying overbought and oversold conditions",
        "Calculating dividend yields",
        "Determining market capitalization"
      ],
      correctAnswer: 1
    },
    {
      question: "What information does the Average Directional Index (ADX) provide?",
      options: [
        "The direction of a price trend",
        "The strength of a price trend",
        "The average price over a specific period",
        "The volatility of a stock"
      ],
      correctAnswer: 1
    }
  ],
  'ai-concepts': [
    {
      question: "What is machine learning?",
      options: [
        "Programming computers with explicit instructions",
        "Using AI to replace human traders",
        "A subset of AI where systems learn from data",
        "A type of trading algorithm"
      ],
      correctAnswer: 2
    },
    {
      question: "What is a neural network in AI?",
      options: [
        "A network of computers processing financial data",
        "A computational model inspired by the human brain",
        "A network of financial institutions",
        "A system for connecting traders together"
      ],
      correctAnswer: 1
    },
    {
      question: "What does 'supervised learning' mean?",
      options: [
        "Learning that requires human supervision",
        "Learning that occurs with labeled training data",
        "Learning that is monitored by regulatory authorities",
        "Learning that supervises other AI systems"
      ],
      correctAnswer: 1
    },
    {
      question: "What is sentiment analysis in finance?",
      options: [
        "Analysis of investor emotions",
        "Using AI to analyze text to determine market sentiment",
        "Analysis of overall market psychology",
        "Psychological evaluation of traders"
      ],
      correctAnswer: 1
    },
    {
      question: "What is reinforcement learning?",
      options: [
        "Learning through penalties and rewards",
        "Learning by repeating tasks multiple times",
        "Learning that reinforces existing knowledge",
        "Learning that requires positive feedback"
      ],
      correctAnswer: 0
    }
  ],
  'model-building': [
    {
      question: "What is feature engineering in model building?",
      options: [
        "Designing new trading features",
        "The process of creating new variables from existing data",
        "Engineering software features for models",
        "Building physical features of AI hardware"
      ],
      correctAnswer: 1
    },
    {
      question: "What is overfitting in a machine learning model?",
      options: [
        "When a model performs too well on training data",
        "When a model is too complex to be implemented",
        "When a model performs well on unseen data",
        "When a model is fit to too many financial instruments"
      ],
      correctAnswer: 0
    },
    {
      question: "What is cross-validation in model training?",
      options: [
        "Validating models across different financial markets",
        "A resampling method to evaluate model performance on independent data",
        "Checking model results against human traders",
        "Comparing different models against each other"
      ],
      correctAnswer: 1
    },
    {
      question: "What is regularization in machine learning?",
      options: [
        "Making models comply with regulations",
        "A technique to prevent overfitting",
        "Adjusting models to regular market conditions",
        "Regular updating of model parameters"
      ],
      correctAnswer: 1
    },
    {
      question: "What is a confusion matrix used for?",
      options: [
        "To confuse competitors about your model",
        "To visualize model performance for classification models",
        "To identify confusing aspects of a model",
        "To display complex correlations between variables"
      ],
      correctAnswer: 1
    }
  ]
};


// Define quiz metadata
const quizMetadata: { [key: string]: QuizMetadata } = {
  'basic-terms': {
    title: 'Basic Terms Quiz',
    description: 'Test your knowledge of basic stock market terminology',
    category: 'Stock Market Basics',
    difficulty: 'Beginner',
    maxReward: 100,
    timeLimit: 15,
  },
  // ... (Keep other quiz metadata the same)

  'order-types': {
    title: 'Order Types Quiz',
    description: 'Test your understanding of different order types',
    category: 'Stock Market Basics',
    difficulty: 'Beginner',
    maxReward: 100,
    timeLimit: 12
  },
  'pattern-recognition': {
    title: 'Pattern Recognition Quiz',
    description: 'Test your ability to recognize common chart patterns',
    category: 'Technical Analysis',
    difficulty: 'Intermediate',
    maxReward: 150,
    timeLimit: 20
  },
  'indicators': {
    title: 'Indicators Quiz',
    description: 'Test your knowledge of technical indicators',
    category: 'Technical Analysis',
    difficulty: 'Intermediate',
    maxReward: 150,
    timeLimit: 25
  },
  'ai-concepts': {
    title: 'AI Concepts Quiz',
    description: 'Test your understanding of AI concepts in finance',
    category: 'AI in Finance',
    difficulty: 'Advanced',
    maxReward: 200,
    timeLimit: 30
  },
  'model-building': {
    title: 'Model Building Quiz',
    description: 'Test your AI model building knowledge',
    category: 'AI in Finance',
    difficulty: 'Advanced',
    maxReward: 200,
    timeLimit: 25
  }
};


// Helper to style difficulty badges
const getDifficultyClass = (difficulty: string): string => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-success/10 text-success';
    case 'Intermediate':
      return 'bg-warning/10 text-warning';
    case 'Advanced':
      return 'bg-danger/10 text-danger';
    default:
      return 'bg-success/10 text-success';
  }
};

const QuizPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  React.useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/auth/signin";
    }
  }, []);


  // Current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Each index: which option user selected
  const [selectedOptions, setSelectedOptions] = useState<number[]>(Array(5).fill(null));

  // Show immediate feedback: either "Correct!" or "Incorrect + correct answer"
  const [feedback, setFeedback] = useState<(string | null)[]>(Array(5).fill(null));

  // Additional states
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [previousResults, setPreviousResults] = useState<QuizResult | null>(null);

  // Safely fetch metadata
  const metadata = quizId && quizMetadata[quizId] ? quizMetadata[quizId] : {
    title: 'Quiz',
    description: 'Test your knowledge',
    category: 'Unknown',
    difficulty: 'Beginner',
    maxReward: 100,
    timeLimit: 15
  };

  // Safely fetch questions
  const questions = quizId && quizQuestions[quizId] ? quizQuestions[quizId] : [];

  // Load any previous quiz results from localStorage
  useEffect(() => {
    if (quizId) {
      try {
        const savedData = localStorage.getItem('completedLearningItems');
        if (savedData) {
          const completedItems = JSON.parse(savedData) as CompletedItems;
          if (completedItems.quizScores && completedItems.quizScores[quizId]) {
            const quizResults = completedItems.quizScores[quizId];
            setPreviousResults(quizResults);

            // If quiz was completed before, display that score
            if (completedItems.quizzes.includes(quizId)) {
              setScore(quizResults.score);
              setEarnedCoins(quizResults.earnedCoins);
              setQuizComplete(true);
            }
          }
        }
      } catch (error) {
        console.error('Failed to load previous quiz results:', error);
      }
    }
  }, [quizId]);

  // Timer
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (metadata && !quizComplete) {
      setTimeRemaining(metadata.timeLimit * 60);

      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (timer) clearInterval(timer);
            calculateAndSubmitResults();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [metadata, quizComplete]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Immediate feedback when selecting an option
  const handleOptionSelect = (questionIndex: number, optionIndex: number): void => {
    // Mark the user's selection
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedOptions);

    // Provide feedback
    const correctIndex = questions[questionIndex].correctAnswer;
    const isCorrect = optionIndex === correctIndex;
    const correctAnswerText = questions[questionIndex].options[correctIndex];

    const updatedFeedback = [...feedback];
    updatedFeedback[questionIndex] = isCorrect
      ? '✅ Correct!'
      : `❌ Incorrect!`;
    setFeedback(updatedFeedback);
  };

  // Move to the next question
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Move to the previous question
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Calculate final score
  const calculateAndSubmitResults = useCallback(() => {
    let correctCount = 0;
    for (let i = 0; i < questions.length; i++) {
      if (selectedOptions[i] === questions[i].correctAnswer) {
        correctCount++;
      }
    }
    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    const calculatedCoins = Math.round((calculatedScore / 100) * (metadata.maxReward || 100));

    setScore(calculatedScore);
    setEarnedCoins(calculatedCoins);
    setQuizComplete(true);

    // Save to localStorage
    try {
      const savedData = localStorage.getItem('completedLearningItems');
      const completedItems: CompletedItems = savedData
        ? JSON.parse(savedData)
        : { videos: [], quizzes: [], coins: 0, quizScores: {} };

      if (!completedItems.quizScores) {
        completedItems.quizScores = {};
      }

      if (quizId) {
        completedItems.quizScores[quizId] = {
          score: calculatedScore,
          earnedCoins: calculatedCoins,
          completedAt: new Date().toISOString(),
        };
        if (!completedItems.quizzes.includes(quizId)) {
          completedItems.quizzes.push(quizId);
          completedItems.coins = (completedItems.coins || 0) + calculatedCoins;
        }
      }

      localStorage.setItem('completedLearningItems', JSON.stringify(completedItems));
      localStorage.setItem('learningCoins', completedItems.coins.toString());
      if ((window as any).handleLearningQuizComplete && quizId) {
        (window as any).handleLearningQuizComplete(quizId, calculatedScore, calculatedCoins);
      }
    } catch (error) {
      console.error('Failed to save quiz results:', error);
    }
  }, [questions, selectedOptions, quizId, metadata.maxReward]);

  // Called when user clicks "Submit Quiz" or if time expires
  const handleSubmit = () => {
    if (!quizComplete) {
      calculateAndSubmitResults();
    } else {
      navigate('/learning');
    }
  };

  return (
    <>
      <Breadcrumb pageName={metadata.title} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Quiz Header */}
        <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-black dark:text-white">{metadata.title}</h3>
              <p className="text-sm text-body">{metadata.description}</p>
            </div>

            <div className="flex items-center space-x-3">
              {/* Difficulty Badge */}
              <span
                className={`rounded-full ${getDifficultyClass(metadata.difficulty)} px-3 py-1 text-sm font-medium`}
              >
                {metadata.difficulty}
              </span>

              {/* Timer */}
              {!quizComplete && (
                <div className="flex items-center rounded-md bg-meta-2 px-4 py-2 dark:bg-meta-4">
                  <svg className="mr-2 h-5 w-5 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-black dark:text-white">{formatTime(timeRemaining)}</span>
                </div>
              )}

              {/* Current Question X of Y */}
              {!quizComplete && (
                <div className="text-sm text-body">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quiz Content */}
        <div className="p-6">
          {/* If quiz was previously completed, show previous results */}
          {previousResults && quizComplete ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="mb-8 text-center">
                {/* Score Circle */}
                <div
                  className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full ${score >= 80 ? 'bg-success/20' : score >= 50 ? 'bg-warning/20' : 'bg-danger/20'
                    }`}
                >
                  <span
                    className={`text-3xl font-bold ${score >= 80 ? 'text-success' : score >= 50 ? 'text-warning' : 'text-danger'
                      }`}
                  >
                    {score}%
                  </span>
                </div>

                <h3 className="mb-1 text-2xl font-bold text-black dark:text-white">
                  {score >= 80
                    ? 'Previous Score: Excellent!'
                    : score >= 50
                      ? 'Previous Score: Good Effort!'
                      : 'Previous Score: Keep Learning!'}
                </h3>

                <p className="text-body">
                  You earned <span className="font-bold text-primary">{earnedCoins} coins</span> from this quiz!
                </p>

                {previousResults.completedAt && (
                  <p className="mt-2 text-sm text-body">
                    Completed on: {new Date(previousResults.completedAt).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Summary */}
              <div className="mb-8 w-full max-w-md rounded-md border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
                <h4 className="mb-3 text-lg font-semibold text-black dark:text-white">Quiz Summary</h4>
                <div className="mb-2 flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                  <span className="text-body">Total Questions</span>
                  <span className="font-medium text-black dark:text-white">{questions.length}</span>
                </div>
                <div className="mb-2 flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                  <span className="text-body">Correct Answers</span>
                  <span className="font-medium text-black dark:text-white">
                    {Math.round((score / 100) * questions.length)}
                  </span>
                </div>
                <div className="mb-2 flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                  <span className="text-body">Score Percentage</span>
                  <span className="font-medium text-black dark:text-white">{score}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body">Coins Earned</span>
                  <span className="flex items-center font-medium text-black dark:text-white">
                    <svg className="mr-1 h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    {earnedCoins}
                  </span>
                </div>
              </div>

              <div className="flex space-x-4">
                {/* Retake Quiz */}
                <button
                  onClick={() => {
                    // Reset states
                    setQuizComplete(false);
                    setSelectedOptions(Array(5).fill(null));
                    setFeedback(Array(5).fill(null));
                    setCurrentQuestion(0);
                    setTimeRemaining(metadata.timeLimit * 60);
                  }}
                  className="rounded-md bg-primary py-3 px-6 text-center font-medium text-white hover:bg-opacity-90"
                >
                  Retake Quiz
                </button>

                {/* Return to Learning Centre */}
                <button
                  onClick={() => navigate('/learning')}
                  className="rounded-md bg-meta-3 py-3 px-6 text-center font-medium text-white hover:bg-opacity-90"
                >
                  Return to Learning Centre
                </button>
              </div>
            </div>
          ) : !quizComplete ? (
            //  -------------------------------
            //  MAIN QUIZ SECTION
            //  -------------------------------
            <div>
              {/* Question & Options */}
              <div className="mb-8">
                <h4 className="mb-4 text-lg font-medium text-black dark:text-white">
                  {currentQuestion + 1}. {questions[currentQuestion]?.question}
                </h4>

                <div className="space-y-3">
                  {questions[currentQuestion]?.options.map((option: string, index: number) => {
                    // Highlight if user selected this option
                    const isSelected = selectedOptions[currentQuestion] === index;
                    return (
                      <div
                        key={index}
                        onClick={() => handleOptionSelect(currentQuestion, index)}
                        className={`flex cursor-pointer items-center rounded-md border p-4 transition ${isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-stroke dark:border-strokedark hover:border-primary hover:bg-primary/5'
                          }`}
                      >
                        {/* Radio bullet */}
                        <div
                          className={`mr-4 flex h-6 w-6 items-center justify-center rounded-full ${isSelected
                            ? 'border-2 border-primary bg-primary text-white'
                            : 'border border-stroke dark:border-strokedark'
                            }`}
                        >
                          {isSelected && (
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 16 16">
                              <circle cx="8" cy="8" r="4" />
                            </svg>
                          )}
                        </div>
                        <span className="text-black dark:text-white">{option}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Immediate Feedback for current question */}
                {feedback[currentQuestion] && (
                  <div className="mt-4 text-sm font-semibold">
                    {feedback[currentQuestion]}
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {/* Previous */}
                <button
                  onClick={handlePrev}
                  disabled={currentQuestion === 0}
                  className={`flex items-center rounded-md py-2 px-4 text-sm font-medium ${currentQuestion === 0
                    ? 'cursor-not-allowed bg-bodydark2 text-body'
                    : 'bg-primary text-white hover:bg-opacity-90'
                    }`}
                >
                  <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                {/* Next or Submit */}
                {currentQuestion < questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-opacity-90"
                  >
                    Next
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center rounded-md bg-success py-2 px-8 text-sm font-medium text-white hover:bg-opacity-90"
                  >
                    Submit Quiz
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ) : (
            //  -------------------------------
            //  QUIZ RESULTS AFTER SUBMISSION
            //  -------------------------------
            <div className="flex flex-col items-center justify-center py-8">
              {/* Score Circle */}
              <div className="mb-8 text-center">
                <div
                  className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full ${score >= 80 ? 'bg-success/20' : score >= 50 ? 'bg-warning/20' : 'bg-danger/20'
                    }`}
                >
                  <span
                    className={`text-3xl font-bold ${score >= 80 ? 'text-success' : score >= 50 ? 'text-warning' : 'text-danger'
                      }`}
                  >
                    {score}%
                  </span>
                </div>
                <h3 className="mb-1 text-2xl font-bold text-black dark:text-white">
                  {score >= 80
                    ? 'Excellent Work!'
                    : score >= 50
                      ? 'Good Effort!'
                      : 'Keep Learning!'}
                </h3>
                <p className="text-body">
                  You've earned <span className="font-bold text-primary">{earnedCoins} coins</span> for completing this
                  quiz!
                </p>
              </div>

              {/* Summary */}
              <div className="mb-8 w-full max-w-md rounded-md border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
                <h4 className="mb-3 text-lg font-semibold text-black dark:text-white">Quiz Summary</h4>
                <div className="mb-2 flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                  <span className="text-body">Total Questions</span>
                  <span className="font-medium text-black dark:text-white">{questions.length}</span>
                </div>
                <div className="mb-2 flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                  <span className="text-body">Correct Answers</span>
                  <span className="font-medium text-black dark:text-white">
                    {Math.round((score / 100) * questions.length)}
                  </span>
                </div>
                <div className="mb-2 flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                  <span className="text-body">Score Percentage</span>
                  <span className="font-medium text-black dark:text-white">{score}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body">Coins Earned</span>
                  <span className="flex items-center font-medium text-black dark:text-white">
                    <svg className="mr-1 h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    {earnedCoins}
                  </span>
                </div>
              </div>

              {/* Return to Learning Centre */}
              <button
                onClick={() => navigate('/learning')}
                className="rounded-md bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90"
              >
                Return to Learning Centre
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizPage;
