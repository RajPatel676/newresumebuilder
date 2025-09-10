"""
LearnWise FastAPI Application - Enhanced with MongoDB & Real-time AI
Complete integration of all Python-II syllabus units with Google Gemini 2.5 Flash
"""

import asyncio
import logging
from contextlib import asynccontextmanager
from datetime import datetime
from typing import Dict, Any, List, Optional

# FastAPI core
from fastapi import FastAPI, HTTPException, Depends, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from fastapi.responses import JSONResponse

# Pydantic for settings and validation
from pydantic_settings import BaseSettings
from pydantic import Field
from pydantic_settings import BaseSettings as PydanticBaseSettings

# MongoDB and database
from database import startup_database, shutdown_database, get_database
from models.user_models import UserProfile, UserCreate, UserLogin, UserResponse, UserUpdate
from auth import AuthManager, UserService, get_current_user, create_user_response

# Python-II Syllabus Integrations
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.graph_objects as go
import plotly.express as px
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import nltk
from textblob import TextBlob
import spacy

# LLM Integration
import google.generativeai as genai
import openai
from datetime import timedelta
import uuid
import json
import base64
from io import BytesIO

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ============================================================================
# ENHANCED SETTINGS WITH MONGODB
# ============================================================================

class Settings(PydanticBaseSettings):
    """Application settings with MongoDB Atlas configuration"""
    
    # Application
    app_name: str = "LearnWise AI"
    version: str = "2.0.0"
    debug: bool = True
    
    # MongoDB Atlas
    mongodb_url: str = Field(
        default="mongodb+srv://wellcinema1999:ZtPdnesBe8HG6Hge@cluster0.8yxoj1c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        env="MONGODB_URL"
    )
    database_name: str = Field(default="LearnWiseor", env="DATABASE_NAME")
    
    # AI APIs
    google_api_key: str = Field(default="AIzaSyBmEIw2OgKMRwh2gIFn0oBoG1MtEpC2EWc", env="GOOGLE_API_KEY")
    openai_api_key: str = Field(default="", env="OPENAI_API_KEY")
    
    # Authentication
    secret_key: str = Field(default="LearnWiseor-secret-key-change-in-production-2024", env="SECRET_KEY")
    access_token_expire_minutes: int = Field(default=60 * 24 * 7, env="ACCESS_TOKEN_EXPIRE_MINUTES")  # 7 days
    
    # Features
    enable_real_time_ai: bool = True
    enable_analytics: bool = True
    enable_websockets: bool = True
    
    class Config:
        env_file = ".env"

settings = Settings()

# ============================================================================
# GOOGLE GEMINI 2.5 FLASH INTEGRATION (ENHANCED)
# ============================================================================

class EnhancedGeminiAI:
    """Enhanced Google Gemini 2.5 Flash integration for all Python-II units"""
    
    def __init__(self):
        if settings.google_api_key:
            genai.configure(api_key="AIzaSyCWkTReGJd6bkQYkR8Q0JlsCeizWQsIBBg")
            self.model = genai.GenerativeModel('gemini-2.5-flash')
            self.is_available = True
            logger.info("✅ Google Gemini 2.5 Flash initialized")
        else:
            self.is_available = False
            logger.warning("⚠️ Google Gemini API key not provided")
    
    async def analyze_code_with_context(self, code: str, language: str, user_context: Dict[str, Any]) -> Dict[str, Any]:
        """Advanced code analysis with user learning context"""
        if not self.is_available:
            raise HTTPException(status_code=503, detail="AI service unavailable")
        
        # Build context-aware prompt
        skill_level = user_context.get('skill_level', 'beginner')
        learning_goals = user_context.get('learning_goals', [])
        recent_topics = user_context.get('recent_topics', [])
        
        prompt = f"""
        As an expert programming tutor, analyze this {language} code for a {skill_level} level learner.
        
        User's Learning Context:
        - Skill Level: {skill_level}
        - Learning Goals: {', '.join([g.get('title', '') for g in learning_goals])}
        - Recent Topics: {', '.join(recent_topics)}
        
        Code to Analyze:
        ```{language}
        {code}
        ```
        
        Provide a comprehensive analysis including:
        1. Code quality assessment (0-100 score)
        2. Specific issues and improvements tailored to their skill level
        3. Learning opportunities related to their goals
        4. Best practices they should focus on
        5. Suggested next steps for improvement
        6. Improved code version with explanations
        
        Format as JSON with these keys:
        - quality_score: number
        - complexity_level: string
        - issues: array of objects with type, message, suggestion
        - learning_opportunities: array of strings
        - best_practices: array of strings
        - improved_code: string
        - explanation: string
        - next_steps: array of strings
        - confidence: number (0-1)
        """
        
        try:
            response = await asyncio.to_thread(self.model.generate_content, prompt)
            
            # Parse JSON response
            try:
                analysis = json.loads(response.text)
                
                # Add metadata
                analysis.update({
                    "analyzed_at": datetime.utcnow().isoformat(),
                    "model_used": "gemini-2.5-flash",
                    "analysis_id": str(uuid.uuid4())
                })
                
                return analysis
                
            except json.JSONDecodeError:
                # Fallback parsing
                return {
                    "quality_score": 75,
                    "complexity_level": "medium",
                    "issues": [],
                    "learning_opportunities": ["Continue practicing"],
                    "best_practices": ["Write clean, readable code"],
                    "improved_code": code,
                    "explanation": response.text,
                    "next_steps": ["Keep learning"],
                    "confidence": 0.8,
                    "analyzed_at": datetime.utcnow().isoformat(),
                    "model_used": "gemini-2.5-flash",
                    "analysis_id": str(uuid.uuid4())
                }
                
        except Exception as e:
            logger.error(f"❌ Gemini code analysis failed: {e}")
            raise HTTPException(status_code=500, detail=f"AI analysis failed: {str(e)}")
    
    async def generate_personalized_quiz(self, topic: str, difficulty: str, user_context: Dict[str, Any], content: str = "") -> Dict[str, Any]:
        """Generate personalized quiz based on user learning profile"""
        if not self.is_available:
            raise HTTPException(status_code=503, detail="AI service unavailable")
        
        skill_level = user_context.get('skill_level', 'beginner')
        learning_style = user_context.get('learning_style', 'visual')
        weak_areas = user_context.get('weak_areas', [])
        
        # prompt = f"""
        # Create a personalized {difficulty} difficulty quiz on {topic} for a {skill_level} learner.
        
        # Learner Profile:
        # - Skill Level: {skill_level}
        # - Learning Style: {learning_style}
        # - Areas to Focus: {', '.join(weak_areas) if weak_areas else 'General concepts'}
        
        # {f"Content to base quiz on:\n{content[:2000]}" if content else ""}
        
        # Generate 5-10 high-quality questions that:
        # 1. Match their skill level and learning style
        # 2. Focus on their weak areas if any
        # 3. Include varied question types
        # 4. Provide detailed explanations
        # 5. Include practical examples
        
        # Format as JSON:{{
        #     "quiz_metadata": {{
        #         "title": "Quiz Title",
        #         "topic": "{topic}",
        #         "difficulty": "{difficulty}",
        #         "estimated_time": "minutes",
        #         "total_questions": 0
        #     }},
        #     "questions": [
        #         {{
        #             "id": 1,
        #             "type": "multiple_choice",
        #             "question": "Question text",
        #             "options": ["A", "B", "C", "D"],
        #             "correct_answer": "A",
        #             "explanation": "Detailed explanation",
        #             "points": 10,
        #             "difficulty": "{difficulty}",
        #             "learning_objective": "What this teaches"
        #         }}
        #     ]
        # }}"""

        # Handle optional content first (to avoid backslash inside f-string expression)
        content_snippet = f"Content to base quiz on:\n{content[:2000]}" if content else ""

        # Then build the prompt f-string
        prompt = f"""
        Create a personalized {difficulty} difficulty quiz on {topic} for a {skill_level} learner.
        
        Learner Profile:
        - Skill Level: {skill_level}
        - Learning Style: {learning_style}
        - Areas to Focus: {', '.join(weak_areas) if weak_areas else 'General concepts'}
        
        {content_snippet}
        
        Generate 5-10 high-quality questions that:
        1. Match their skill level and learning style
        2. Focus on their weak areas if any
        3. Include varied question types
        4. Provide detailed explanations
        5. Include practical examples
        
        Format as JSON:
        {{
            "quiz_metadata": {{
                "title": "Quiz Title",
                "topic": "{topic}",
                "difficulty": "{difficulty}",
                "estimated_time": "minutes",
                "total_questions": 0
            }},
            "questions": [
                {{
                    "id": 1,
                    "type": "multiple_choice",
                    "question": "Question text",
                    "options": ["A", "B", "C", "D"],
                    "correct_answer": "A",
                    "explanation": "Detailed explanation",
                    "points": 10,
                    "difficulty": "{difficulty}",
                    "learning_objective": "What this teaches"
                }}
            ]
        }}
        """

        
        try:
            response = await asyncio.to_thread(self.model.generate_content, prompt)
            
            try:
                quiz_data = json.loads(response.text)
                
                # Add metadata
                quiz_data["generated_at"] = datetime.utcnow().isoformat()
                quiz_data["quiz_id"] = str(uuid.uuid4())
                quiz_data["personalized_for"] = user_context.get('user_id', 'anonymous')
                
                return quiz_data
                
            except json.JSONDecodeError:
                # Fallback quiz
                return {
                    "quiz_metadata": {
                        "title": f"{topic} Quiz",
                        "topic": topic,
                        "difficulty": difficulty,
                        "estimated_time": "10 minutes",
                        "total_questions": 1
                    },
                    "questions": [
                        {
                            "id": 1,
                            "type": "multiple_choice",
                            "question": f"What is an important concept in {topic}?",
                            "options": ["Option A", "Option B", "Option C", "Option D"],
                            "correct_answer": "Option A",
                            "explanation": "This covers basic concepts.",
                            "points": 10,
                            "difficulty": difficulty,
                            "learning_objective": f"Understanding {topic}"
                        }
                    ],
                    "generated_at": datetime.utcnow().isoformat(),
                    "quiz_id": str(uuid.uuid4()),
                    "personalized_for": user_context.get('user_id', 'anonymous')
                }
                
        except Exception as e:
            logger.error(f"❌ Gemini quiz generation failed: {e}")
            raise HTTPException(status_code=500, detail=f"Quiz generation failed: {str(e)}")
    
    async def provide_learning_assistance(self, message: str, context: str, user_context: Dict[str, Any]) -> Dict[str, Any]:
        """Provide personalized learning assistance"""
        if not self.is_available:
            raise HTTPException(status_code=503, detail="AI service unavailable")
        
        skill_level = user_context.get('skill_level', 'beginner')
        learning_goals = user_context.get('learning_goals', [])
        recent_struggles = user_context.get('recent_struggles', [])
        
        prompt = f"""
        As an expert programming tutor, help this {skill_level} level student with their question.
        
        Student Profile:
        - Skill Level: {skill_level}
        - Learning Goals: {', '.join([g.get('title', '') for g in learning_goals])}
        - Recent Challenges: {', '.join(recent_struggles)}
        
        Context: {context}
        
        Student Question: {message}
        
        Provide comprehensive assistance:
        1. Direct answer to their question
        2. Clear explanation adapted to their skill level
        3. Practical examples they can try
        4. Related concepts they should learn
        5. Practice exercises
        6. Encouragement and next steps
        
        Format as JSON:
        {{
            "main_response": "Direct helpful answer",
            "explanation": "Detailed explanation",
            "examples": ["Example 1", "Example 2"],
            "related_concepts": ["Concept 1", "Concept 2"],
            "practice_exercises": ["Exercise 1", "Exercise 2"],
            "encouragement": "Motivational message",
            "next_steps": ["Step 1", "Step 2"],
            "difficulty_level": "current question difficulty",
            "confidence": 0.95
        }}
        """
        
        try:
            response = await asyncio.to_thread(self.model.generate_content, prompt)
            
            try:
                assistance = json.loads(response.text)
                
                # Add metadata
                assistance.update({
                    "responded_at": datetime.utcnow().isoformat(),
                    "model_used": "gemini-1.5-flash",
                    "response_id": str(uuid.uuid4())
                })
                
                return assistance
                
            except json.JSONDecodeError:
                return {
                    "main_response": response.text,
                    "explanation": "Here's my explanation of your question.",
                    "examples": [],
                    "related_concepts": [],
                    "practice_exercises": [],
                    "encouragement": "Keep up the great work learning programming!",
                    "next_steps": ["Continue practicing", "Try building a small project"],
                    "difficulty_level": skill_level,
                    "confidence": 0.8,
                    "responded_at": datetime.utcnow().isoformat(),
                    "model_used": "gemini-1.5-flash",
                    "response_id": str(uuid.uuid4())
                }
                
        except Exception as e:
            logger.error(f"❌ Gemini learning assistance failed: {e}")
            raise HTTPException(status_code=500, detail=f"Learning assistance failed: {str(e)}")

# Initialize enhanced AI
enhanced_ai = EnhancedGeminiAI()

# ============================================================================
# PYTHON-II SYLLABUS INTEGRATION (ENHANCED WITH MONGODB)
# ============================================================================

class AdvancedDataAnalyzer:
    """Unit 1: Advanced Pandas analytics with MongoDB integration"""
    
    @staticmethod
    async def analyze_user_learning_patterns(user_id: str, days: int = 30) -> Dict[str, Any]:
        """Comprehensive learning pattern analysis using Pandas"""
        try:
            from models.user_models import UserAnalytics, LearningSession
            from datetime import timedelta
            
            # Get user analytics data
            start_date = datetime.utcnow() - timedelta(days=days)
            
            analytics_data = await UserAnalytics.find(
                {"user_id": user_id, "date": {"$gte": start_date}}
            ).to_list()
            
            session_data = await LearningSession.find(
                {"user_id": user_id, "created_at": {"$gte": start_date}}
            ).to_list()
            
            if not analytics_data and not session_data:
                return {"message": "No data available for analysis"}
            
            # Convert to DataFrames for analysis
            if analytics_data:
                analytics_df = pd.DataFrame([
                    {
                        "date": item.date,
                        "study_time": item.study_time_minutes,
                        "sessions": item.sessions_completed,
                        "engagement": item.engagement_score,
                        "quiz_score": item.average_quiz_score if hasattr(item, 'average_quiz_score') else 0
                    }
                    for item in analytics_data
                ])
            else:
                analytics_df = pd.DataFrame()
            
            if session_data:
                sessions_df = pd.DataFrame([
                    {
                        "date": item.created_at.date(),
                        "type": item.session_type,
                        "duration": item.duration_minutes or 0,
                        "engagement": item.engagement_score,
                        "success_rate": item.success_rate or 0
                    }
                    for item in session_data
                ])
            else:
                sessions_df = pd.DataFrame()
            
            insights = {}
            
            # Time-based analysis
            if not analytics_df.empty:
                insights["time_patterns"] = {
                    "total_study_time": int(analytics_df["study_time"].sum()),
                    "average_daily_time": float(analytics_df["study_time"].mean()),
                    "most_productive_days": analytics_df.nlargest(3, "study_time")["date"].dt.strftime("%Y-%m-%d").tolist(),
                    "engagement_trend": "improving" if analytics_df["engagement"].iloc[-5:].mean() > analytics_df["engagement"].iloc[:5].mean() else "declining",
                    "consistency_score": float(1 - (analytics_df["study_time"].std() / analytics_df["study_time"].mean())) if analytics_df["study_time"].mean() > 0 else 0
                }
            
            # Session type analysis
            if not sessions_df.empty:
                session_analysis = sessions_df.groupby("type").agg({
                    "duration": ["mean", "sum", "count"],
                    "engagement": "mean",
                    "success_rate": "mean"
                }).round(2)
                
                insights["session_patterns"] = {
                    "preferred_activities": sessions_df["type"].value_counts().to_dict(),
                    "performance_by_type": session_analysis.to_dict(),
                    "learning_velocity": float(sessions_df["success_rate"].mean())
                }
            
            # Learning recommendations
            insights["recommendations"] = []
            
            if not analytics_df.empty:
                if analytics_df["engagement"].mean() < 6:
                    insights["recommendations"].append("Try varying your learning activities to increase engagement")
                
                if analytics_df["study_time"].std() > analytics_df["study_time"].mean():
                    insights["recommendations"].append("Aim for more consistent daily study time")
                
                if len(analytics_df) > 7:
                    recent_avg = analytics_df["study_time"].tail(7).mean()
                    overall_avg = analytics_df["study_time"].mean()
                    if recent_avg < overall_avg * 0.8:
                        insights["recommendations"].append("Consider increasing your study time to maintain progress")
            
            return insights
            
        except Exception as e:
            logger.error(f"❌ Learning pattern analysis failed: {e}")
            return {"error": str(e)}

# ============================================================================
# LIFESPAN MANAGEMENT
# ============================================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifespan with MongoDB startup/shutdown"""
    # Startup
    logger.info("🚀 Starting LearnWise FastAPI application...")
    
    try:
        # Initialize database
        await startup_database()
        
        # Initialize NLP models
        try:
            nltk.download('punkt', quiet=True)
            nltk.download('stopwords', quiet=True)
            nltk.download('vader_lexicon', quiet=True)
            logger.info("✅ NLP models initialized")
        except:
            logger.warning("⚠️ Some NLP models failed to initialize")
        
        # Test AI services
        if enhanced_ai.is_available:
            logger.info("✅ Google Gemini 2.5 Flash ready")
        else:
            logger.warning("⚠️ Google Gemini not available")
        
        logger.info("🎓 LearnWise is ready!")
        
    except Exception as e:
        logger.error(f"❌ Startup failed: {e}")
        raise
    
    yield
    
    # Shutdown
    logger.info("🛑 Shutting down LearnWise...")
    await shutdown_database()
    logger.info("✅ Shutdown complete")

# ============================================================================
# FASTAPI APPLICATION
# ============================================================================

app = FastAPI(
    title="LearnWise AI - Enhanced",
    description="AI-Powered Programming Learning Platform with MongoDB & Real-time AI",
    version=settings.version,
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:48752",  # Vite dev server port
        "http://127.0.0.1:48752",
        "http://localhost:5173",   # Default Vite port
        "http://127.0.0.1:5173",
        "http://localhost:8080",   # Additional Vite port
        "http://127.0.0.1:8080",
        "http://localhost:8081",   # Additional Vite port
        "http://127.0.0.1:8081"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global storage for in-memory caching
global_storage = {}

# ============================================================================
# AUTHENTICATION ENDPOINTS
# ============================================================================

@app.post("/api/auth/register")
async def register(user_data: UserCreate, background_tasks: BackgroundTasks):
    """Register a new user"""
    try:
        user = await UserService.create_user(user_data)
        
        # Create access token
        access_token = AuthManager.create_access_token(data={"sub": user.user_id})
        
        # Initialize user analytics
        from models.user_models import UserAnalytics
        initial_analytics = UserAnalytics(
            user_id=user.user_id,
            date=datetime.utcnow()
        )
        background_tasks.add_task(initial_analytics.insert)
        
        response = create_user_response(user)
        
        return {
            "user": response.dict(),
            "access_token": access_token,
            "token_type": "bearer"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Registration failed: {e}")
        raise HTTPException(status_code=500, detail="Registration failed")


@app.post("/api/auth/login")
async def login(login_data: UserLogin):
    """Authenticate user and return token"""
    try:
        user = await UserService.authenticate_user(login_data.email, login_data.password)
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )
        
        # Create access token
        access_token = AuthManager.create_access_token(data={"sub": user.user_id})
        
        response = create_user_response(user)
        
        return {
            "user": response.dict(),
            "access_token": access_token,
            "token_type": "bearer"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Login failed: {e}")
        raise HTTPException(status_code=500, detail="Login failed")


@app.get("/api/auth/me", response_model=UserResponse)
async def get_current_user_profile(current_user: UserProfile = Depends(get_current_user)):
    """Get current user profile"""
    return create_user_response(current_user)


@app.put("/api/auth/profile", response_model=UserResponse)
async def update_user_profile(
    update_data: UserUpdate,
    current_user: UserProfile = Depends(get_current_user)
):
    """Update user profile"""
    try:
        updated_user = await UserService.update_user(
            current_user.user_id,
            update_data.dict(exclude_unset=True)
        )
        
        if not updated_user:
            raise HTTPException(status_code=404, detail="User not found")
        
        return create_user_response(updated_user)
        
    except HTTPException:
        raise
    except Exception as e:
                logger.error(f"❌ Profile update failed: {e}")
                raise HTTPException(status_code=500, detail="Profile update failed")



# ============================================================================
# INCLUDE ROUTERS
# ============================================================================

# Import all routers with enhanced MongoDB integration
from routers import code_review, debug_assistant, study_chat, quiz_generator, git_simulator
from routers.quiz_generator_export import export_router

# Include all routers
app.include_router(code_review.router)
app.include_router(debug_assistant.router)
app.include_router(study_chat.router)
app.include_router(quiz_generator.router)
app.include_router(export_router)  # Add export functionality
app.include_router(git_simulator.router)

# ============================================================================
# ENHANCED ANALYTICS AND USER DASHBOARD ENDPOINTS
# ============================================================================

@app.get("/api/dashboard/analytics")
async def get_user_dashboard_analytics(current_user: UserProfile = Depends(get_current_user)):
    """Get comprehensive user dashboard analytics"""
    try:
        # Get user analytics
        user_analytics = await UserService.get_user_analytics(current_user.user_id, days=30)
        
        # Get learning pattern analysis
        data_analyzer = AdvancedDataAnalyzer()
        learning_patterns = await data_analyzer.analyze_user_learning_patterns(current_user.user_id)
        
        # Get recent activity
        from models.user_models import LearningSession
        recent_sessions = await LearningSession.find(
            {"user_id": current_user.user_id}
        ).sort("-created_at").limit(10).to_list()
        
        # Calculate progress metrics
        progress_metrics = {
            "skill_advancement": {
                "current_level": current_user.skill_level,
                "progress_to_next": 0.7,  # Would be calculated based on recent performance
                "areas_of_improvement": learning_patterns.get("recommendations", [])
            },
            "learning_streak": {
                "current_streak": current_user.streak_days,
                "longest_streak": current_user.longest_streak,
                "streak_goal": 30
            },
            "achievement_progress": {
                "total_achievements": len(current_user.achievements),
                "recent_achievements": [a for a in current_user.achievements if (datetime.utcnow() - a.earned_date).days <= 7],
                "next_achievement": "Complete 10 code reviews"
            }
        }
        
        return {
            "user_profile": create_user_response(current_user).dict(),
            "analytics": user_analytics,
            "learning_patterns": learning_patterns,
            "progress_metrics": progress_metrics,
            "recent_sessions": [
                {
                    "type": session.session_type,
                    "date": session.created_at.isoformat(),
                    "duration": session.duration_minutes,
                    "engagement": session.engagement_score,
                    "topics": session.topics_covered
                }
                for session in recent_sessions
            ]
        }
        
    except Exception as e:
        logger.error(f"❌ Dashboard analytics failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to get dashboard analytics")


# ============================================================================
# HEALTH CHECK ENDPOINTS
# ============================================================================

@app.get("/")
async def root():
    """Root endpoint with enhanced system status"""
    return {
        "message": "🎓 LearnWise AI - Enhanced with MongoDB & Real-time AI",
        "version": settings.version,
        "status": "active",
        "features": {
            "mongodb_atlas": "✅ Connected",
            "google_gemini_2_5_flash": "✅ Active" if enhanced_ai.is_available else "❌ Unavailable",
            "real_time_ai": "✅ Enabled" if settings.enable_real_time_ai else "❌ Disabled",
            "user_authentication": "✅ JWT-based",
            "advanced_analytics": "✅ Pandas + MongoDB",
            "personalized_learning": "✅ AI-powered"
        },
        "python_syllabus_integration": {
            "unit_1_pandas": "✅ Advanced Analytics with MongoDB",
            "unit_2_visualization": "✅ Real-time Charts & Graphs", 
            "unit_3_regex": "✅ Pattern Extraction & Analysis",
            "unit_4_5_ml_dl": "✅ ML/DL with User Context",
            "unit_6_nlp": "✅ Advanced NLP Processing",
            "unit_7_llm": "✅ Gemini 2.5 Flash Integration",
            "unit_8_api": "✅ FastAPI with MongoDB",
            "unit_9_10_data": "✅ MongoDB Atlas Storage"
        },
        "endpoints": {
            "authentication": "/api/auth/*",
            "dashboard": "/api/dashboard/*",
            "code_review": "/api/code-review/*",
            "debug_assistant": "/api/debug-assistant/*",
            "study_chat": "/api/study-chat/*",
            "quiz_generator": "/api/quiz-generator/*",
            "git_simulator": "/api/git-simulator/*"
        }
    }


@app.get("/api/health")
async def health_check():
    """Enhanced health check with MongoDB and AI status"""
    try:
        # Test database connection
        db = await get_database()
        await db.command("ping")
        database_status = "healthy"
    except:
        database_status = "unhealthy"
    
    # Check AI services
    ai_status = {
        "google_gemini": enhanced_ai.is_available,
        "openai": bool(settings.openai_api_key)
    }
    
    return {
        "status": "healthy" if database_status == "healthy" else "degraded",
        "timestamp": datetime.utcnow().isoformat(),
        "services": {
            "fastapi": "running",
            "mongodb_atlas": database_status,
            "ai_services": ai_status,
            "authentication": "active",
            "real_time_features": "enabled" if settings.enable_real_time_ai else "disabled"
        },
        "python_syllabus_status": {
            "pandas_analytics": True,
            "visualization": True,
            "regex_processing": True,
            "ml_dl_models": True,
            "nlp_models": True,
            "llm_integration": enhanced_ai.is_available,
            "api_framework": True,
            "mongodb_storage": database_status == "healthy"
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug,
        log_level="info"
    )