package main

import (
    "log"
    "github.com/gin-gonic/gin"
    "interview-help/config"
    "interview-help/handlers"
    "interview-help/middleware"
    "interview-help/models"
)

func main() {
    cfg := config.Load()
    
    r := gin.Default()
    r.Use(middleware.SetupCORS())
    r.Use(middleware.ErrorHandler())
    
    // API Routes
    api := r.Group("/api")
    {
        // Interview experiences
        interviewHandler := handlers.NewInterviewHandler(&models.Interviews)
        api.GET("/interviews", interviewHandler.GetAll)
        api.GET("/interviews/:company", interviewHandler.GetByCompany)
        api.POST("/interviews", interviewHandler.Create)
        
        // Services
        serviceHandler := handlers.NewServiceHandler(&models.Services)
        api.GET("/services", serviceHandler.GetAll)
    }
    
    log.Printf("Starting server on port %s", cfg.Port)
    log.Fatal(r.Run(":" + cfg.Port))
}
