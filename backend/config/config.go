package config

import (
    "log"
    "os"
    "github.com/joho/godotenv"
)

type Config struct {
    Port        string
    Environment string
}

func Load() *Config {
    if err := godotenv.Load(); err != nil {
        log.Printf("Warning: .env file not found")
    }
    
    return &Config{
        Port:        getEnvOrDefault("PORT", "8000"),
        Environment: getEnvOrDefault("ENVIRONMENT", "development"),
    }
}

func getEnvOrDefault(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}
