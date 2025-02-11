package middleware

import (
    "log"
    "os"
    "strings"
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
)

func SetupCORS() gin.HandlerFunc {
    origins := strings.Split(os.Getenv("ALLOWED_ORIGINS"), ",")
    if len(origins) == 0 || origins[0] == "" {
        if os.Getenv("ENV") == "production" {
            log.Fatal("ALLOWED_ORIGINS environment variable must be set in production")
        }
        // Default to localhost for development
        origins = []string{"http://localhost:3000"}
    }
    return cors.New(cors.Config{
        AllowOrigins:     origins,
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: false,
    })
}
