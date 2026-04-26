FROM debian:trixie-slim

WORKDIR /app

# Install uv using the recommended curl command
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates && \
    curl -LsSf https://astral.sh/uv/install.sh | sh && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy Python version and lock file
COPY .python-version pyproject.toml uv.lock ./

# Install dependencies using uv (python installed automatically from .python-version)
ENV PATH="/root/.local/bin:$PATH"
RUN uv sync --frozen

# Copy source code
COPY . .

RUN useradd --create-home --shell /bin/bash appuser && chown -R appuser:appuser /app
USER appuser