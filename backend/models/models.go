package models

// Interview represents an interview experience
type Interview struct {
    ID          string   `json:"id"`
    Company     string   `json:"company"`
    Position    string   `json:"position"`
    ContentZH   string   `json:"content_zh"`
    ContentEN   string   `json:"content_en"`
    Tags        []string `json:"tags"`
    CreateTime  string   `json:"create_time"`
}

// Service represents a service offering
type Service struct {
    ID          string `json:"id"`
    NameZH      string `json:"name_zh"`
    NameEN      string `json:"name_en"`
    DescZH      string `json:"desc_zh"`
    DescEN      string `json:"desc_en"`
    Price       string `json:"price"`
}

// Response represents a standard API response
type Response struct {
    Status  int         `json:"status"`
    Message string      `json:"message,omitempty"`
    Data    interface{} `json:"data,omitempty"`
    Error   string      `json:"error,omitempty"`
}

// Sample data
var Interviews = []Interview{
    {
        ID:         "1",
        Company:    "Google",
        Position:   "Software Engineer",
        ContentZH:  "面试过程包括系统设计和算法题。首轮是算法题，主要考察数据结构和算法优化。第二轮是系统设计，讨论了分布式系统的扩展性问题。",
        ContentEN:  "The interview process included system design and algorithms. First round focused on algorithms, testing data structures and optimization. Second round was system design, discussing scalability in distributed systems.",
        Tags:       []string{"algorithms", "system design", "distributed systems"},
        CreateTime: "2024-02-10",
    },
    {
        ID:         "2",
        Company:    "Amazon",
        Position:   "Senior Software Engineer",
        ContentZH:  "亚马逊的面试强调领导力准则。技术面试包括编码和系统设计，特别关注可扩展性和性能优化。",
        ContentEN:  "Amazon's interview emphasizes leadership principles. Technical interviews included coding and system design, with focus on scalability and performance optimization.",
        Tags:       []string{"leadership", "system design", "performance"},
        CreateTime: "2024-02-09",
    },
}

var Services = []Service{
    {
        ID:     "1",
        NameZH: "面试辅导",
        NameEN: "Interview Coaching",
        DescZH: "一对一面试辅导，帮助你准备技术面试。包括算法训练、系统设计讨论和模拟面试。",
        DescEN: "One-on-one interview coaching to help you prepare for technical interviews. Includes algorithm training, system design discussions, and mock interviews.",
        Price:  "Contact for pricing",
    },
    {
        ID:     "2",
        NameZH: "简历优化",
        NameEN: "Resume Optimization",
        DescZH: "专业的简历审查和优化服务，确保你的简历突出关键技能和成就。",
        DescEN: "Professional resume review and optimization service to ensure your resume highlights key skills and achievements.",
        Price:  "Contact for pricing",
    },
}
