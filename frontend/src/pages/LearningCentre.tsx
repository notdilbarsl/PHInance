import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React from 'react';
import axios from "axios";
import { useBalance } from "../components/Header/BalanceContext";
import { API_BASE_URL } from '../config';

const LearningCentre = () => {
  React.useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/auth/signin";
    }
  }, []);


  const [activeTab, setActiveTab] = useState('courses');
  const [completedItems, setCompletedItems] = useState<{
    videos: string[];
    quizzes: string[];
    quizScores: Record<string, { score: number; earnedCoins: number }>;
    coins: number;
  }>({ videos: [], quizzes: [], quizScores: {}, coins: 0 });

  // Load completed items from localStorage when component mounts
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('completedLearningItems');
      if (savedData) {
        const savedItems = JSON.parse(savedData);
        setCompletedItems(savedItems);
      }
    } catch (error) {
      console.error('Failed to load learning items:', error);
    }
  }, []);

  const { updateBalance } = useBalance();

  const awardCoins = async (amount) => {
    const authToken = localStorage.getItem("authToken");
    await axios.post(
      `${API_BASE_URL}/user/addbalance`,
      { add: amount },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    updateBalance(); // Refresh the balance from backend
  };


  const handleVideoComplete = async (videoId: string): Promise<void> => {
    if (!completedItems.videos.includes(videoId)) {
      const updatedItems = {
        ...completedItems,
        videos: [...completedItems.videos, videoId],
        coins: completedItems.coins + 50, // (optional, for local tracking)
      };

      setCompletedItems(updatedItems);

      try {
        localStorage.setItem('completedLearningItems', JSON.stringify(updatedItems));
        // Add coins to backend and update global balance
        await awardCoins(50);
        console.log(`Video ${videoId} completed! +50 coins awarded.`);
      } catch (error) {
        console.error('Failed to save learning progress or update balance:', error);
      }
    }
  };


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleQuizComplete = (quizId: string, score: number, reward: number): void => {
    setCompletedItems((prevCompletedItems) => ({
      ...prevCompletedItems,
      quizzes: [...prevCompletedItems.quizzes, quizId],
      coins: prevCompletedItems.coins + reward,
      quizScores: {
        ...prevCompletedItems.quizScores,
        [quizId]: { score, earnedCoins: reward }
      }
    }));
  };

  // Make the handleQuizComplete function available to other components
  (window as any).handleLearningQuizComplete = handleQuizComplete;

  return (
    <>
      <Breadcrumb pageName="Learning Centre" />

      {/* Total Earned Coins */}
      {/* <div className="mb-5 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">Learning Rewards</h4>
          <div className="flex items-center space-x-2 rounded-md bg-primary/10 px-4 py-2">
            <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span className="text-lg font-bold text-primary">{completedItems.coins || 0} coins</span>
          </div>
        </div>
        <p className="text-sm text-body">Earn coins by watching videos and completing quizzes</p>
      </div> */}

      {/* Tabs for All Courses, Videos, Quizzes */}
      <div className="mb-8">
        <div className="border-b border-stroke px-4 dark:border-strokedark">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('courses')}
              className={`inline-block py-4 px-4 text-sm font-medium ${activeTab === 'courses' ? 'text-primary border-b-2 border-primary' : 'text-body hover:text-primary'}`}
            >
              All Courses
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`inline-block py-4 px-4 text-sm font-medium ${activeTab === 'videos' ? 'text-primary border-b-2 border-primary' : 'text-body hover:text-primary'}`}
            >
              Videos
            </button>
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`inline-block py-4 px-4 text-sm font-medium ${activeTab === 'quizzes' ? 'text-primary border-b-2 border-primary' : 'text-body hover:text-primary'}`}
            >
              Quizzes
            </button>
          </nav>
        </div>
      </div>

      {/* Courses Tab Content */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {/* Stock Market Basics Card */}
          <div className="group relative rounded-lg border border-stroke bg-white p-6 shadow-default transition-all duration-500 hover:shadow-2xl hover:translate-y-[-8px] dark:border-strokedark dark:bg-boxdark" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-success/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 rounded-lg border-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-10px)' }}></div>

            {/* Course Card 3D Elements */}
            <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-white dark:bg-boxdark opacity-10 transform rotate-2 scale-105 group-hover:rotate-3 transition-all duration-500" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-5px)' }}></div>

            <h3 className="mb-4 text-xl font-semibold text-black dark:text-white group-hover:text-primary transition-all duration-300 transform group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>Stock Market Basics</h3>
            <p className="mb-4 text-base transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>Learn the fundamentals of stock market trading</p>

            <div className="mb-6 transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-4 w-4 min-w-[1rem] rounded-full bg-primary flex-shrink-0"></div>
                <span className="text-body">Introduction to Stock Markets</span>
              </div>
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-4 w-4 min-w-[1rem] rounded-full bg-primary flex-shrink-0"></div>
                <span className="text-body">Understanding Market Trends</span>
              </div>
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-4 w-4 min-w-[1rem] rounded-full bg-primary flex-shrink-0"></div>
                <span className="text-body">Types of Orders</span>
              </div>
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-4 w-4 min-w-[1rem] rounded-full bg-primary flex-shrink-0"></div>
                <span className="text-body">Basic Terms Quiz</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-4 w-4 min-w-[1rem] rounded-full bg-primary flex-shrink-0"></div>
                <span className="text-body">Order Types Quiz</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Link to="#"
                onClick={(e) => { e.preventDefault(); setActiveTab('videos'); }}
                className="inline-flex items-center justify-center rounded-md bg-primary py-3 px-6 text-center font-bold text-white hover:bg-opacity-90 shadow-md transition-all duration-500 relative transform group-hover:translate-z-10 group-hover:shadow-lg"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Videos
              </Link>
              <Link to="#"
                onClick={(e) => { e.preventDefault(); setActiveTab('quizzes'); }}
                className="inline-flex items-center justify-center rounded-md bg-success py-3 px-6 text-center font-bold text-white hover:bg-opacity-90 shadow-md transition-all duration-500 relative transform group-hover:translate-z-10 group-hover:shadow-lg"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Quizzes
              </Link>
            </div>
          </div>

          {/* Technical Analysis Card */}
          <div className="group relative rounded-lg border border-stroke bg-white p-6 shadow-default transition-all duration-500 hover:shadow-2xl hover:translate-y-[-8px] dark:border-strokedark dark:bg-boxdark" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-warning/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 rounded-lg border-2 border-warning/20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-10px)' }}></div>

            {/* Course Card 3D Elements */}
            <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-white dark:bg-boxdark opacity-10 transform rotate-2 scale-105 group-hover:rotate-3 transition-all duration-500" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-5px)' }}></div>

            <h3 className="mb-4 text-xl font-semibold text-black dark:text-white group-hover:text-primary transition-all duration-300 transform group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>Technical Analysis</h3>
            <p className="mb-4 text-base transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>Master the art of reading charts and patterns</p>

            <div className="mb-6 transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-4 w-4 min-w-[1rem] rounded-full bg-primary flex-shrink-0"></div>
                <span className="text-body">Chart Basics</span>
              </div>
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-4 w-4 min-w-[1rem] rounded-full bg-primary flex-shrink-0"></div>
                <span className="text-body">Common Patterns</span>
              </div>
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-4 w-4 min-w-[1rem] rounded-full bg-primary flex-shrink-0"></div>
                <span className="text-body">Technical Indicators</span>
              </div>
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-4 w-4 min-w-[1rem] rounded-full bg-primary flex-shrink-0"></div>
                <span className="text-body">Pattern Recognition Quiz</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-4 w-4 min-w-[1rem] rounded-full bg-primary flex-shrink-0"></div>
                <span className="text-body">Indicators Quiz</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Link to="#"
                onClick={(e) => { e.preventDefault(); setActiveTab('videos'); }}
                className="inline-flex items-center justify-center rounded-md bg-primary py-3 px-6 text-center font-bold text-white hover:bg-opacity-90 shadow-md transition-all duration-500 relative transform group-hover:translate-z-10 group-hover:shadow-lg"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Videos
              </Link>
              <Link to="#"
                onClick={(e) => { e.preventDefault(); setActiveTab('quizzes'); }}
                className="inline-flex items-center justify-center rounded-md bg-success py-3 px-6 text-center font-bold text-white hover:bg-opacity-90 shadow-md transition-all duration-500 relative transform group-hover:translate-z-10 group-hover:shadow-lg"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Quizzes
              </Link>
            </div>
          </div>

          {/* AI in Finance Card */}
          <div className="group relative rounded-lg border border-stroke bg-white p-6 shadow-default transition-all duration-500 hover:shadow-2xl hover:translate-y-[-8px] dark:border-strokedark dark:bg-boxdark" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-danger/10 to-success/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 rounded-lg border-2 border-danger/20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-10px)' }}></div>

            {/* Course Card 3D Elements */}
            <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-white dark:bg-boxdark opacity-10 transform rotate-2 scale-105 group-hover:rotate-3 transition-all duration-500" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-5px)' }}></div>

            <h3 className="mb-4 text-xl font-semibold text-black dark:text-white group-hover:text-primary transition-all duration-300 transform group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>AI in Finance</h3>
            <p className="mb-4 text-base transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>Discover how AI is transforming financial markets</p>

            <div className="mb-6 transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-4 w-4 min-w-[1rem] rounded-full bg-primary flex-shrink-0"></div>
                <span className="text-body">AI Trading Basics</span>
              </div>
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-4 w-4 min-w-[1rem] rounded-full bg-primary flex-shrink-0"></div>
                <span className="text-body">Machine Learning in Finance</span>
              </div>
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-4 w-4 min-w-[1rem] rounded-full bg-primary flex-shrink-0"></div>
                <span className="text-body">Building AI Models</span>
              </div>
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-4 w-4 min-w-[1rem] rounded-full bg-primary flex-shrink-0"></div>
                <span className="text-body">AI Concepts Quiz</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-4 w-4 min-w-[1rem] rounded-full bg-primary flex-shrink-0"></div>
                <span className="text-body">Model Building Quiz</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Link to="#"
                onClick={(e) => { e.preventDefault(); setActiveTab('videos'); }}
                className="inline-flex items-center justify-center rounded-md bg-primary py-3 px-6 text-center font-bold text-white hover:bg-opacity-90 shadow-md transition-all duration-500 relative transform group-hover:translate-z-10 group-hover:shadow-lg"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Videos
              </Link>
              <Link to="#"
                onClick={(e) => { e.preventDefault(); setActiveTab('quizzes'); }}
                className="inline-flex items-center justify-center rounded-md bg-success py-3 px-6 text-center font-bold text-white hover:bg-opacity-90 shadow-md transition-all duration-500 relative transform group-hover:translate-z-10 group-hover:shadow-lg"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Quizzes
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Videos Tab Content */}
      {activeTab === 'videos' && (
        <>
          <div className="mb-10 rounded-lg border border-stroke bg-white p-8 shadow-default dark:border-strokedark dark:bg-boxdark relative overflow-hidden transition-all duration-500" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-primary/10 to-success/10 rounded-bl-full transform rotate-12 opacity-70 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-48 bg-gradient-to-tr from-warning/10 to-primary/10 rounded-tr-full transform -rotate-6 opacity-70 -z-10"></div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h4 className="mb-3 text-2xl font-bold text-black dark:text-white relative">
                  Featured Videos
                  <div className="h-1 w-16 bg-primary mt-2 rounded-full"></div>
                </h4>
                <p className="text-sm text-body max-w-lg">Watch these videos to earn coins and enhance your financial knowledge. Each video provides valuable insights and practical tips.</p>
              </div>
              <div className="flex items-center space-x-3 bg-primary/10 px-5 py-3 rounded-xl shadow-sm">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="font-medium text-primary text-lg">Educational Content</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 relative" style={{ perspective: '1000px' }}>
            {/* Video Card 1 - Introduction to Stocks */}
            <div className="group relative rounded-lg border border-stroke bg-white shadow-default transition-all duration-500 hover:shadow-2xl hover:translate-y-[-8px] dark:border-strokedark dark:bg-boxdark" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-success/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative overflow-hidden rounded-t-lg aspect-square transform transition-all duration-500 group-hover:translate-z-10" style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}>
                <div className="w-full h-full bg-gradient-to-br from-primary/30 to-success/30"></div>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <a
                    href="https://youtu.be/HNPbY6fSeo8?si=pFmph6Pd5jt2nja5"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setTimeout(() => handleVideoComplete('intro-stocks'), 5000)}
                    className="relative flex h-48 w-48 items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 transform transition-all duration-500 hover:scale-110 shadow-xl group-hover:translate-z-20"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="absolute inset-0 rounded-full bg-white opacity-25 blur-md animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full bg-primary opacity-20 blur-xl"></div>
                    <svg className="h-24 w-24 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"></path>
                    </svg>
                  </a>
                </div>
                <div className="absolute top-4 right-4 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transform transition-all duration-500 group-hover:translate-z-15 group-hover:scale-110 z-10 shadow-lg flex items-center">
                  <svg className="h-5 w-5 mr-1 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  {completedItems.videos.includes('intro-stocks') ? 'Earned 50 Coins' : 'Earn 50 Coins'}
                </div>
                <div className="absolute bottom-4 right-4 transform transition-all duration-500 group-hover:translate-z-15 z-10">
                  <svg className="h-8 w-8 text-red-600 filter drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </div>
                {completedItems.videos.includes('intro-stocks') && (
                  <div className="absolute top-4 left-4 rounded-full bg-success px-3 py-3 transform transition-all duration-500 group-hover:translate-z-15 group-hover:scale-110 z-10 shadow-lg">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-6 relative transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>
                <h3 className="mb-2 text-xl font-semibold text-black dark:text-white hover:text-primary transition-all duration-300 group-hover:translate-z-5">Introduction to Stocks</h3>
                <p className="mb-4 text-base">Learn the fundamentals of stock market investing</p>
                <div className="flex items-center justify-between transform transition-all duration-500">
                  <div className="flex items-center text-sm text-body">
                    <span className="font-medium">Duration: 20:00</span>
                    <span className="mx-2">•</span>
                    <span>Stock Market Basics</span>
                  </div>
                  {completedItems.videos.includes('intro-stocks') ? (
                    <span className="rounded-md bg-success/20 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-success shadow-sm transform transition-all duration-500 group-hover:translate-z-5 group-hover:scale-110">Completed</span>
                  ) : (
                    <span className="rounded-md bg-warning/20 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-warning shadow-sm transform transition-all duration-500 group-hover:translate-z-5 group-hover:scale-110">Unwatched</span>
                  )}
                </div>
              </div>
            </div>

            {/* Video Card 2 - Chart Patterns Explained */}
            <div className="group relative rounded-lg border border-stroke bg-white shadow-default transition-all duration-500 hover:shadow-2xl hover:translate-y-[-8px] dark:border-strokedark dark:bg-boxdark" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-warning/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative overflow-hidden rounded-t-lg aspect-square transform transition-all duration-500 group-hover:translate-z-10" style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}>
                <div className="w-full h-full bg-gradient-to-br from-warning/30 to-primary/30"></div>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <a
                    href="https://youtu.be/aRlWle9smww?si=6hwQLg7NUFgBLSnJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setTimeout(() => handleVideoComplete('chart-patterns'), 5000)}
                    className="relative flex h-48 w-48 items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 transform transition-all duration-500 hover:scale-110 shadow-xl group-hover:translate-z-20"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="absolute inset-0 rounded-full bg-white opacity-25 blur-md animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full bg-primary opacity-20 blur-xl"></div>
                    <svg className="h-24 w-24 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"></path>
                    </svg>
                  </a>
                </div>
                <div className="absolute top-4 right-4 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transform transition-all duration-500 group-hover:translate-z-15 group-hover:scale-110 z-10 shadow-lg flex items-center">
                  <svg className="h-5 w-5 mr-1 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  {completedItems.videos.includes('chart-patterns') ? 'Earned 50 Coins' : 'Earn 50 Coins'}
                </div>
                <div className="absolute bottom-4 right-4 transform transition-all duration-500 group-hover:translate-z-15 z-10">
                  <svg className="h-8 w-8 text-red-600 filter drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </div>
                {completedItems.videos.includes('chart-patterns') && (
                  <div className="absolute top-4 left-4 rounded-full bg-success px-3 py-3 transform transition-all duration-500 group-hover:translate-z-15 group-hover:scale-110 z-10 shadow-lg">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-6 relative transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>
                <h3 className="mb-2 text-xl font-semibold text-black dark:text-white hover:text-primary transition-all duration-300 group-hover:translate-z-5">Chart Patterns Explained</h3>
                <p className="mb-4 text-base">Master the most common technical analysis patterns</p>
                <div className="flex items-center justify-between transform transition-all duration-500">
                  <div className="flex items-center text-sm text-body">
                    <span className="font-medium">Duration: 38:15</span>
                    <span className="mx-2">•</span>
                    <span>Technical Analysis</span>
                  </div>
                  {completedItems.videos.includes('chart-patterns') ? (
                    <span className="rounded-md bg-success/20 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-success shadow-sm transform transition-all duration-500 group-hover:translate-z-5 group-hover:scale-110">Completed</span>
                  ) : (
                    <span className="rounded-md bg-warning/20 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-warning shadow-sm transform transition-all duration-500 group-hover:translate-z-5 group-hover:scale-110">Unwatched</span>
                  )}
                </div>
              </div>
            </div>

            {/* Video Card 3 - AI Trading Strategies */}
            <div className="group relative rounded-lg border border-stroke bg-white shadow-default transition-all duration-500 hover:shadow-2xl hover:translate-y-[-8px] dark:border-strokedark dark:bg-boxdark" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-danger/20 to-success/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative overflow-hidden rounded-t-lg aspect-square transform transition-all duration-500 group-hover:translate-z-10" style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}>
                <div className="w-full h-full bg-gradient-to-br from-danger/30 to-success/30"></div>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <a
                    href="https://youtu.be/gWuHTHjyKkg?si=YQnyALCdAxssT5zZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setTimeout(() => handleVideoComplete('ai-trading'), 5000)}
                    className="relative flex h-48 w-48 items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 transform transition-all duration-500 hover:scale-110 shadow-xl group-hover:translate-z-20"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="absolute inset-0 rounded-full bg-white opacity-25 blur-md animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full bg-primary opacity-20 blur-xl"></div>
                    <svg className="h-24 w-24 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"></path>
                    </svg>
                  </a>
                </div>
                <div className="absolute top-4 right-4 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transform transition-all duration-500 group-hover:translate-z-15 group-hover:scale-110 z-10 shadow-lg flex items-center">
                  <svg className="h-5 w-5 mr-1 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  {completedItems.videos.includes('ai-trading') ? 'Earned 50 Coins' : 'Earn 50 Coins'}
                </div>
                <div className="absolute bottom-4 right-4 transform transition-all duration-500 group-hover:translate-z-15 z-10">
                  <svg className="h-8 w-8 text-red-600 filter drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </div>
                {completedItems.videos.includes('ai-trading') && (
                  <div className="absolute top-4 left-4 rounded-full bg-success px-3 py-3 transform transition-all duration-500 group-hover:translate-z-15 group-hover:scale-110 z-10 shadow-lg">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-6 relative transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>
                <h3 className="mb-2 text-xl font-semibold text-black dark:text-white hover:text-primary transition-all duration-300 group-hover:translate-z-5">AI Trading Strategies</h3>
                <p className="mb-4 text-base">How AI is revolutionizing trading strategies</p>
                <div className="flex items-center justify-between transform transition-all duration-500">
                  <div className="flex items-center text-sm text-body">
                    <span className="font-medium">Duration: 3:48</span>
                    <span className="mx-2">•</span>
                    <span>AI in Finance</span>
                  </div>
                  {completedItems.videos.includes('ai-trading') ? (
                    <span className="rounded-md bg-success/20 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-success shadow-sm transform transition-all duration-500 group-hover:translate-z-5 group-hover:scale-110">Completed</span>
                  ) : (
                    <span className="rounded-md bg-warning/20 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-warning shadow-sm transform transition-all duration-500 group-hover:translate-z-5 group-hover:scale-110">Unwatched</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Quizzes Tab Content */}
      {activeTab === 'quizzes' && (
        <>
          <div className="mb-10 rounded-lg border border-stroke bg-white p-8 shadow-default dark:border-strokedark dark:bg-boxdark relative overflow-hidden transition-all duration-500" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-warning/10 to-primary/10 rounded-bl-full transform rotate-12 opacity-70 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-48 bg-gradient-to-tr from-success/10 to-danger/10 rounded-tr-full transform -rotate-6 opacity-70 -z-10"></div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h4 className="mb-3 text-2xl font-bold text-black dark:text-white relative">
                  Knowledge Tests
                  <div className="h-1 w-16 bg-primary mt-2 rounded-full"></div>
                </h4>
                <p className="text-sm text-body max-w-lg">Complete quizzes to test your knowledge and earn coins based on your score. See your previous results and track your learning progress.</p>
              </div>
              <div className="flex items-center space-x-3 bg-primary/10 px-5 py-3 rounded-xl shadow-sm">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-primary text-lg">Test Your Knowledge</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {/* Quiz Card 1 */}
            <div className="group relative rounded-lg border border-stroke bg-white p-6 shadow-default transition-all duration-500 hover:shadow-2xl hover:translate-y-[-8px] dark:border-strokedark dark:bg-boxdark" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-success/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="mb-4 flex items-center justify-between transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>
                <h3 className="text-xl font-semibold text-black dark:text-white group-hover:text-primary transition-all duration-300">Basic Terms Quiz</h3>
                <span className="rounded-full bg-success/20 px-3 py-1 text-sm font-medium text-success shadow-sm transform transition-all duration-500 group-hover:translate-z-10 group-hover:scale-105">
                  Beginner
                </span>
              </div>
              <p className="mb-6 text-base transform transition-all duration-500 group-hover:translate-z-5">Test your knowledge of basic stock market terminology</p>
              <div className="mb-6 transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>
                <div className="mb-2 flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">Questions</span>
                  <span className="text-sm font-bold bg-gray-100 dark:bg-meta-4 px-2 py-0.5 rounded-md">5</span>
                </div>
                <div className="mb-2 flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">Time Limit</span>
                  <span className="text-sm font-bold bg-gray-100 dark:bg-meta-4 px-2 py-0.5 rounded-md">15 mins</span>
                </div>
                <div className="mb-2 flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">From</span>
                  <span className="text-sm font-bold text-primary">Stock Market Basics</span>
                </div>
                <div className="flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">Reward</span>
                  <span className="flex items-center text-sm font-bold">
                    <svg className="mr-1 h-5 w-5 text-yellow-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span className="text-primary">Up to 100 coins</span>
                  </span>
                </div>
              </div>
              {completedItems.quizScores && completedItems.quizScores['basic-terms'] && (
                <div className="mb-4 rounded-lg border border-stroke bg-gray-50/80 backdrop-blur-sm p-4 dark:border-strokedark dark:bg-meta-4 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:translate-z-10" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-bold text-black dark:text-white">Quiz Results</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Last Attempt</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm font-medium text-body">Your Score:</span>
                    <span className={`text-sm font-bold px-2 py-0.5 rounded ${completedItems.quizScores['basic-terms'].score >= 80 ? 'text-success bg-success/10' :
                      completedItems.quizScores['basic-terms'].score >= 50 ? 'text-warning bg-warning/10' : 'text-danger bg-danger/10'
                      }`}>
                      {completedItems.quizScores['basic-terms'].score}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-body">Coins Earned:</span>
                    <span className="flex items-center text-sm font-bold text-primary">
                      <svg className="mr-1 h-5 w-5 text-yellow-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      {completedItems.quizScores['basic-terms'].earnedCoins}
                    </span>
                  </div>
                </div>
              )}

              <Link
                to="/quiz/basic-terms"
                className={`inline-flex w-full items-center justify-center rounded-md shadow-md transition-all duration-500 relative group-hover:shadow-lg transform group-hover:translate-z-10 ${completedItems.quizzes.includes('basic-terms')
                  ? 'bg-success py-3 px-10 text-center font-bold text-white hover:bg-opacity-90'
                  : 'bg-primary py-3 px-10 text-center font-bold text-white hover:bg-opacity-90'
                  }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {completedItems.quizzes.includes('basic-terms') ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Retake Quiz
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Take Quiz
                  </>
                )}
              </Link>
            </div>

            {/* Quiz Card 2 */}
            <div className="group relative rounded-lg border border-stroke bg-white p-6 shadow-default transition-all duration-500 hover:shadow-2xl hover:translate-y-[-8px] dark:border-strokedark dark:bg-boxdark" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-warning/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="mb-4 flex items-center justify-between transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>
                <h3 className="text-xl font-semibold text-black dark:text-white group-hover:text-primary transition-all duration-300">Order Types Quiz</h3>
                <span className="rounded-full bg-success/20 px-3 py-1 text-sm font-medium text-success shadow-sm transform transition-all duration-500 group-hover:translate-z-10 group-hover:scale-105">
                  Beginner
                </span>
              </div>
              <p className="mb-6 text-base transform transition-all duration-500 group-hover:translate-z-5">Test your understanding of different order types</p>
              <div className="mb-6 transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>
                <div className="mb-2 flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">Questions</span>
                  <span className="text-sm font-bold bg-gray-100 dark:bg-meta-4 px-2 py-0.5 rounded-md">5</span>
                </div>
                <div className="mb-2 flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">Time Limit</span>
                  <span className="text-sm font-bold bg-gray-100 dark:bg-meta-4 px-2 py-0.5 rounded-md">12 mins</span>
                </div>
                <div className="mb-2 flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">From</span>
                  <span className="text-sm font-bold text-primary">Stock Market Basics</span>
                </div>
                <div className="flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">Reward</span>
                  <span className="flex items-center text-sm font-bold">
                    <svg className="mr-1 h-5 w-5 text-yellow-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span className="text-primary">Up to 100 coins</span>
                  </span>
                </div>
              </div>
              {completedItems.quizScores && completedItems.quizScores['order-types'] && (
                <div className="mb-4 rounded-lg border border-stroke bg-gray-50/80 backdrop-blur-sm p-4 dark:border-strokedark dark:bg-meta-4 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:translate-z-10" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-bold text-black dark:text-white">Quiz Results</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Last Attempt</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm font-medium text-body">Your Score:</span>
                    <span className={`text-sm font-bold px-2 py-0.5 rounded ${completedItems.quizScores['order-types'].score >= 80 ? 'text-success bg-success/10' :
                      completedItems.quizScores['order-types'].score >= 50 ? 'text-warning bg-warning/10' : 'text-danger bg-danger/10'
                      }`}>
                      {completedItems.quizScores['order-types'].score}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-body">Coins Earned:</span>
                    <span className="flex items-center text-sm font-bold text-primary">
                      <svg className="mr-1 h-5 w-5 text-yellow-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      {completedItems.quizScores['order-types'].earnedCoins}
                    </span>
                  </div>
                </div>
              )}

              <Link
                to="/quiz/order-types"
                className={`inline-flex w-full items-center justify-center rounded-md shadow-md transition-all duration-500 relative group-hover:shadow-lg transform group-hover:translate-z-10 ${completedItems.quizzes.includes('order-types')
                  ? 'bg-success py-3 px-10 text-center font-bold text-white hover:bg-opacity-90'
                  : 'bg-primary py-3 px-10 text-center font-bold text-white hover:bg-opacity-90'
                  }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {completedItems.quizzes.includes('order-types') ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Retake Quiz
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Take Quiz
                  </>
                )}
              </Link>
            </div>

            {/* Quiz Card 3 */}
            <div className="group relative rounded-lg border border-stroke bg-white p-6 shadow-default transition-all duration-500 hover:shadow-2xl hover:translate-y-[-8px] dark:border-strokedark dark:bg-boxdark" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-warning/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="mb-4 flex items-center justify-between transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>
                <h3 className="text-xl font-semibold text-black dark:text-white group-hover:text-primary transition-all duration-300">Pattern Recognition Quiz</h3>
                <span className="rounded-full bg-warning/20 px-3 py-1 text-sm font-medium text-warning shadow-sm transform transition-all duration-500 group-hover:translate-z-10 group-hover:scale-105">
                  Intermediate
                </span>
              </div>
              <p className="mb-6 text-base transform transition-all duration-500 group-hover:translate-z-5">Test your ability to recognize common chart patterns</p>
              <div className="mb-6 transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>
                <div className="mb-2 flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">Questions</span>
                  <span className="text-sm font-bold bg-gray-100 dark:bg-meta-4 px-2 py-0.5 rounded-md">5</span>
                </div>
                <div className="mb-2 flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">Time Limit</span>
                  <span className="text-sm font-bold bg-gray-100 dark:bg-meta-4 px-2 py-0.5 rounded-md">20 mins</span>
                </div>
                <div className="mb-2 flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">From</span>
                  <span className="text-sm font-bold text-primary">Technical Analysis</span>
                </div>
                <div className="flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">Reward</span>
                  <span className="flex items-center text-sm font-bold">
                    <svg className="mr-1 h-5 w-5 text-yellow-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span className="text-primary">Up to 150 coins</span>
                  </span>
                </div>
              </div>
              {completedItems.quizScores && completedItems.quizScores['pattern-recognition'] && (
                <div className="mb-4 rounded-lg border border-stroke bg-gray-50/80 backdrop-blur-sm p-4 dark:border-strokedark dark:bg-meta-4 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:translate-z-10" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-bold text-black dark:text-white">Quiz Results</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Last Attempt</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm font-medium text-body">Your Score:</span>
                    <span className={`text-sm font-bold px-2 py-0.5 rounded ${completedItems.quizScores['pattern-recognition'].score >= 80 ? 'text-success bg-success/10' :
                      completedItems.quizScores['pattern-recognition'].score >= 50 ? 'text-warning bg-warning/10' : 'text-danger bg-danger/10'
                      }`}>
                      {completedItems.quizScores['pattern-recognition'].score}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-body">Coins Earned:</span>
                    <span className="flex items-center text-sm font-bold text-primary">
                      <svg className="mr-1 h-5 w-5 text-yellow-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      {completedItems.quizScores['pattern-recognition'].earnedCoins}
                    </span>
                  </div>
                </div>
              )}

              <Link
                to="/quiz/pattern-recognition"
                className={`inline-flex w-full items-center justify-center rounded-md shadow-md transition-all duration-500 relative group-hover:shadow-lg transform group-hover:translate-z-10 ${completedItems.quizzes.includes('pattern-recognition')
                  ? 'bg-success py-3 px-10 text-center font-bold text-white hover:bg-opacity-90'
                  : 'bg-primary py-3 px-10 text-center font-bold text-white hover:bg-opacity-90'
                  }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {completedItems.quizzes.includes('pattern-recognition') ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Retake Quiz
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Take Quiz
                  </>
                )}
              </Link>
            </div>

            {/* Quiz Card 4 */}
            <div className="group relative rounded-lg border border-stroke bg-white p-6 shadow-default transition-all duration-500 hover:shadow-2xl hover:translate-y-[-8px] dark:border-strokedark dark:bg-boxdark" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-warning/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="mb-4 flex items-center justify-between transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>
                <h3 className="text-xl font-semibold text-black dark:text-white group-hover:text-primary transition-all duration-300">Indicators Quiz</h3>
                <span className="rounded-full bg-warning/20 px-3 py-1 text-sm font-medium text-warning shadow-sm transform transition-all duration-500 group-hover:translate-z-10 group-hover:scale-105">
                  Intermediate
                </span>
              </div>
              <p className="mb-6 text-base transform transition-all duration-500 group-hover:translate-z-5">Test your knowledge of technical indicators</p>
              <div className="mb-6 transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>
                <div className="mb-2 flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">Questions</span>
                  <span className="text-sm font-bold bg-gray-100 dark:bg-meta-4 px-2 py-0.5 rounded-md">5</span>
                </div>
                <div className="mb-2 flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">Time Limit</span>
                  <span className="text-sm font-bold bg-gray-100 dark:bg-meta-4 px-2 py-0.5 rounded-md">25 mins</span>
                </div>
                <div className="mb-2 flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">From</span>
                  <span className="text-sm font-bold text-primary">Technical Analysis</span>
                </div>
                <div className="flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">Reward</span>
                  <span className="flex items-center text-sm font-bold">
                    <svg className="mr-1 h-5 w-5 text-yellow-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span className="text-primary">Up to 150 coins</span>
                  </span>
                </div>
              </div>
              {completedItems.quizScores && completedItems.quizScores['indicators'] && (
                <div className="mb-4 rounded-lg border border-stroke bg-gray-50/80 backdrop-blur-sm p-4 dark:border-strokedark dark:bg-meta-4 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:translate-z-10" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-bold text-black dark:text-white">Quiz Results</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Last Attempt</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm font-medium text-body">Your Score:</span>
                    <span className={`text-sm font-bold px-2 py-0.5 rounded ${completedItems.quizScores['indicators'].score >= 80 ? 'text-success bg-success/10' :
                      completedItems.quizScores['indicators'].score >= 50 ? 'text-warning bg-warning/10' : 'text-danger bg-danger/10'
                      }`}>
                      {completedItems.quizScores['indicators'].score}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-body">Coins Earned:</span>
                    <span className="flex items-center text-sm font-bold text-primary">
                      <svg className="mr-1 h-5 w-5 text-yellow-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      {completedItems.quizScores['indicators'].earnedCoins}
                    </span>
                  </div>
                </div>
              )}

              <Link
                to="/quiz/indicators"
                className={`inline-flex w-full items-center justify-center rounded-md shadow-md transition-all duration-500 relative group-hover:shadow-lg transform group-hover:translate-z-10 ${completedItems.quizzes.includes('indicators')
                  ? 'bg-success py-3 px-10 text-center font-bold text-white hover:bg-opacity-90'
                  : 'bg-primary py-3 px-10 text-center font-bold text-white hover:bg-opacity-90'
                  }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {completedItems.quizzes.includes('indicators') ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Retake Quiz
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Take Quiz
                  </>
                )}
              </Link>
            </div>

            {/* Quiz Card 5 */}
            <div className="group relative rounded-lg border border-stroke bg-white p-6 shadow-default transition-all duration-500 hover:shadow-2xl hover:translate-y-[-8px] dark:border-strokedark dark:bg-boxdark" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-danger/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="mb-4 flex items-center justify-between transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>
                <h3 className="text-xl font-semibold text-black dark:text-white group-hover:text-primary transition-all duration-300">AI Concepts Quiz</h3>
                <span className="rounded-full bg-danger/20 px-3 py-1 text-sm font-medium text-danger shadow-sm transform transition-all duration-500 group-hover:translate-z-10 group-hover:scale-105">
                  Advanced
                </span>
              </div>
              <p className="mb-6 text-base transform transition-all duration-500 group-hover:translate-z-5">Test your understanding of AI concepts in finance</p>
              <div className="mb-6 transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>
                <div className="mb-2 flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">Questions</span>
                  <span className="text-sm font-bold bg-gray-100 dark:bg-meta-4 px-2 py-0.5 rounded-md">5</span>
                </div>
                <div className="mb-2 flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">Time Limit</span>
                  <span className="text-sm font-bold bg-gray-100 dark:bg-meta-4 px-2 py-0.5 rounded-md">30 mins</span>
                </div>
                <div className="mb-2 flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">From</span>
                  <span className="text-sm font-bold text-primary">AI in Finance</span>
                </div>
                <div className="flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">Reward</span>
                  <span className="flex items-center text-sm font-bold">
                    <svg className="mr-1 h-5 w-5 text-yellow-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span className="text-primary">Up to 200 coins</span>
                  </span>
                </div>
              </div>
              {completedItems.quizScores && completedItems.quizScores['ai-concepts'] && (
                <div className="mb-4 rounded-lg border border-stroke bg-gray-50/80 backdrop-blur-sm p-4 dark:border-strokedark dark:bg-meta-4 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:translate-z-10" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-bold text-black dark:text-white">Quiz Results</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Last Attempt</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm font-medium text-body">Your Score:</span>
                    <span className={`text-sm font-bold px-2 py-0.5 rounded ${completedItems.quizScores['ai-concepts'].score >= 80 ? 'text-success bg-success/10' :
                      completedItems.quizScores['ai-concepts'].score >= 50 ? 'text-warning bg-warning/10' : 'text-danger bg-danger/10'
                      }`}>
                      {completedItems.quizScores['ai-concepts'].score}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-body">Coins Earned:</span>
                    <span className="flex items-center text-sm font-bold text-primary">
                      <svg className="mr-1 h-5 w-5 text-yellow-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      {completedItems.quizScores['ai-concepts'].earnedCoins}
                    </span>
                  </div>
                </div>
              )}

              <Link
                to="/quiz/ai-concepts"
                className={`inline-flex w-full items-center justify-center rounded-md shadow-md transition-all duration-500 relative group-hover:shadow-lg transform group-hover:translate-z-10 ${completedItems.quizzes.includes('ai-concepts')
                  ? 'bg-success py-3 px-10 text-center font-bold text-white hover:bg-opacity-90'
                  : 'bg-primary py-3 px-10 text-center font-bold text-white hover:bg-opacity-90'
                  }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {completedItems.quizzes.includes('ai-concepts') ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Retake Quiz
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Take Quiz
                  </>
                )}
              </Link>
            </div>

            {/* Quiz Card 6 */}
            <div className="group relative rounded-lg border border-stroke bg-white p-6 shadow-default transition-all duration-500 hover:shadow-2xl hover:translate-y-[-8px] dark:border-strokedark dark:bg-boxdark" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-danger/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="mb-4 flex items-center justify-between transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>
                <h3 className="text-xl font-semibold text-black dark:text-white group-hover:text-primary transition-all duration-300">Model Building Quiz</h3>
                <span className="rounded-full bg-danger/20 px-3 py-1 text-sm font-medium text-danger shadow-sm transform transition-all duration-500 group-hover:translate-z-10 group-hover:scale-105">
                  Advanced
                </span>
              </div>
              <p className="mb-6 text-base transform transition-all duration-500 group-hover:translate-z-5">Test your AI model building knowledge</p>
              <div className="mb-6 transform transition-all duration-500 group-hover:translate-z-5" style={{ transformStyle: 'preserve-3d' }}>
                <div className="mb-2 flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">Questions</span>
                  <span className="text-sm font-bold bg-gray-100 dark:bg-meta-4 px-2 py-0.5 rounded-md">5</span>
                </div>
                <div className="mb-2 flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">Time Limit</span>
                  <span className="text-sm font-bold bg-gray-100 dark:bg-meta-4 px-2 py-0.5 rounded-md">25 mins</span>
                </div>
                <div className="mb-2 flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">From</span>
                  <span className="text-sm font-bold text-primary">AI in Finance</span>
                </div>
                <div className="flex justify-between group-hover:translate-z-5">
                  <span className="text-sm font-medium text-body">Reward</span>
                  <span className="flex items-center text-sm font-bold">
                    <svg className="mr-1 h-5 w-5 text-yellow-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span className="text-primary">Up to 200 coins</span>
                  </span>
                </div>
              </div>
              {completedItems.quizScores && completedItems.quizScores['model-building'] && (
                <div className="mb-4 rounded-lg border border-stroke bg-gray-50/80 backdrop-blur-sm p-4 dark:border-strokedark dark:bg-meta-4 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:translate-z-10" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-bold text-black dark:text-white">Quiz Results</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Last Attempt</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm font-medium text-body">Your Score:</span>
                    <span className={`text-sm font-bold px-2 py-0.5 rounded ${completedItems.quizScores['model-building'].score >= 80 ? 'text-success bg-success/10' :
                      completedItems.quizScores['model-building'].score >= 50 ? 'text-warning bg-warning/10' : 'text-danger bg-danger/10'
                      }`}>
                      {completedItems.quizScores['model-building'].score}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-body">Coins Earned:</span>
                    <span className="flex items-center text-sm font-bold text-primary">
                      <svg className="mr-1 h-5 w-5 text-yellow-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      {completedItems.quizScores['model-building'].earnedCoins}
                    </span>
                  </div>
                </div>
              )}

              <Link
                to="/quiz/model-building"
                className={`inline-flex w-full items-center justify-center rounded-md shadow-md transition-all duration-500 relative group-hover:shadow-lg transform group-hover:translate-z-10 ${completedItems.quizzes.includes('model-building')
                  ? 'bg-success py-3 px-10 text-center font-bold text-white hover:bg-opacity-90'
                  : 'bg-primary py-3 px-10 text-center font-bold text-white hover:bg-opacity-90'
                  }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {completedItems.quizzes.includes('model-building') ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Retake Quiz
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Take Quiz
                  </>
                )}
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LearningCentre; 
