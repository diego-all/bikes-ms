FROM golang:1.20 as builder
WORKDIR /app
COPY go.mod go.sum ./

# All dependencies defined in these files (go.mod, go.sum)  will be installed
RUN go mod download
COPY . .
RUN go build -o main .
# EXPOSE 9080
# ENTRYPOINT [ "./main" ]

# An alpine|distroless image is used again because they are super light versions to run applications. Both containers are not going to be very large.

# ENTRYPOINT [ "./main" ]

# vikram
FROM gcr.io/distroless/base-debian11
# Now copy it into our base image.
# FROM gcr.io/distroless/static-debian11
COPY --from=builder /app/main .
EXPOSE 3001
CMD ["/main"]