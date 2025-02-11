from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Interview(BaseModel):
    id: str
    company: str
    position: str
    content_zh: str
    content_en: str
    tags: List[str]
    create_time: str

class Service(BaseModel):
    id: str
    name_zh: str
    name_en: str
    desc_zh: str
    desc_en: str
    price: str

# Sample data
interviews = [
    Interview(
        id="1",
        company="Google",
        position="Software Engineer",
        content_zh="面试过程包括系统设计和算法题。首轮是算法题，主要考察数据结构和算法优化。第二轮是系统设计，讨论了分布式系统的扩展性问题。",
        content_en="The interview process included system design and algorithms. First round focused on algorithms, testing data structures and optimization. Second round was system design, discussing scalability in distributed systems.",
        tags=["algorithms", "system design", "distributed systems"],
        create_time="2024-02-10"
    ),
    Interview(
        id="2",
        company="Amazon",
        position="Senior Software Engineer",
        content_zh="亚马逊的面试强调领导力准则。技术面试包括编码和系统设计，特别关注可扩展性和性能优化。",
        content_en="Amazon's interview emphasizes leadership principles. Technical interviews included coding and system design, with focus on scalability and performance optimization.",
        tags=["leadership", "system design", "performance"],
        create_time="2024-02-09"
    )
]

services = [
    Service(
        id="1",
        name_zh="面试辅导",
        name_en="Interview Coaching",
        desc_zh="一对一面试辅导，帮助你准备技术面试。包括算法训练、系统设计讨论和模拟面试。",
        desc_en="One-on-one interview coaching to help you prepare for technical interviews. Includes algorithm training, system design discussions, and mock interviews.",
        price="Contact for pricing"
    ),
    Service(
        id="2",
        name_zh="简历优化",
        name_en="Resume Optimization",
        desc_zh="专业的简历审查和优化服务，确保你的简历突出关键技能和成就。",
        desc_en="Professional resume review and optimization service to ensure your resume highlights key skills and achievements.",
        price="Contact for pricing"
    )
]

@app.get("/api/interviews")
async def get_interviews():
    return interviews

@app.get("/api/interviews/{company}")
async def get_company_interviews(company: str):
    company = company.lower()
    return [i for i in interviews if company in i.company.lower()]

@app.post("/api/interviews")
async def create_interview(interview: Interview):
    interviews.append(interview)
    return interview

@app.get("/api/services")
async def get_services():
    return services
