package handlers

import (
    "strings"
    "github.com/gin-gonic/gin"
    "interview-help/models"
)

type InterviewHandler struct {
    interviews *[]models.Interview
}

func NewInterviewHandler(interviews *[]models.Interview) *InterviewHandler {
    return &InterviewHandler{interviews: interviews}
}

func (h *InterviewHandler) GetAll(c *gin.Context) {
    c.JSON(200, models.Response{
        Status: 200,
        Data:   h.interviews,
    })
}

func (h *InterviewHandler) GetByCompany(c *gin.Context) {
    company := strings.ToLower(c.Param("company"))
    var companyInterviews []models.Interview
    
    for _, interview := range *h.interviews {
        if strings.Contains(strings.ToLower(interview.Company), company) {
            companyInterviews = append(companyInterviews, interview)
        }
    }
    
    c.JSON(200, models.Response{
        Status: 200,
        Data:   companyInterviews,
    })
}

func (h *InterviewHandler) Create(c *gin.Context) {
    var newInterview models.Interview
    if err := c.BindJSON(&newInterview); err != nil {
        c.JSON(400, models.Response{
            Status:  400,
            Message: "Invalid request body",
            Error:   err.Error(),
        })
        return
    }
    
    *h.interviews = append(*h.interviews, newInterview)
    c.JSON(201, models.Response{
        Status: 201,
        Data:   newInterview,
    })
}
