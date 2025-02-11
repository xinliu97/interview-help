FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download Go modules
RUN go mod download

# Copy the source code
COPY . .

# Build the Go app
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

# Use a minimal alpine image for running
FROM alpine:latest

WORKDIR /app

# Copy the binary from builder
COPY --from=builder /app/app .

# Set environment variables
ENV PORT=8000
ENV ENV=production
ENV GIN_MODE=release
ENV ALLOWED_ORIGINS=https://interview-experience-website-koqtpmwx.devinapps.com,http://localhost:4173,http://localhost:5173

# Expose port
EXPOSE 8000

# Run the binary
CMD ["./app"]
