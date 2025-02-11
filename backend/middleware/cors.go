package middleware

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
)

func SetupCORS() gin.HandlerFunc {
    return cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:4173", "http://localhost:5173"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: false,
    })
}
