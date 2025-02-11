package handlers

import (
    "github.com/gin-gonic/gin"
    "interview-help/models"
)

type ServiceHandler struct {
    services *[]models.Service
}

func NewServiceHandler(services *[]models.Service) *ServiceHandler {
    return &ServiceHandler{services: services}
}

func (h *ServiceHandler) GetAll(c *gin.Context) {
    c.JSON(200, models.Response{
        Status: 200,
        Data:   h.services,
    })
}
