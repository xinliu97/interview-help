package middleware

import (
    "log"
    "github.com/gin-gonic/gin"
)

// ErrorResponse represents a standardized error response
type ErrorResponse struct {
    Status  int    `json:"status"`
    Message string `json:"message"`
    Error   string `json:"error,omitempty"`
}

// ErrorHandler middleware for standardized error handling
func ErrorHandler() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Next()

        // Handle any errors that occurred during request processing
        if len(c.Errors) > 0 {
            err := c.Errors.Last()
            log.Printf("Error: %v", err)
            
            c.JSON(500, ErrorResponse{
                Status:  500,
                Message: "Internal Server Error",
                Error:   err.Error(),
            })
            return
        }
    }
}
