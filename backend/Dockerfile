# Use the official Ubuntu image as the base
FROM ubuntu:latest

ARG DEBIAN_FRONTEND=noninteractive

# Set the working directory
WORKDIR /app

# Update the package manager and install essential tools
RUN apt-get update -y && apt-get install -y software-properties-common

# Install Python 3.8, pip, and virtual environment tools
RUN add-apt-repository ppa:deadsnakes/ppa -y && apt-get update -y
RUN apt-get install -y python3.8 python3.8-venv python3.8-dev python3-pip

# Create a Python 3.8 virtual environment
RUN python3.8 -m venv myenv

# Activate the virtual environment
SHELL ["/bin/bash", "-c"]
RUN source myenv/bin/activate

# Upgrade pip and install Flask and other Python dependencies within the virtual environment
RUN pip install --upgrade pip

# Copy the requirements.txt file into the container
COPY requirements.txt /app

# Install pip dependencies
RUN pip install -r requirements.txt

# Install Flask
RUN pip install --ignore-installed Flask

# Install Flask-Cors
RUN pip install flask-cors

# Install GCC
RUN apt-get install -y gcc

# Install Java (OpenJDK 11)
RUN apt-get install -y openjdk-11-jre-headless

# Copy your Flask app files into the container
COPY . /app

# Expose the port that your Flask app will run on (default is 5000)
EXPOSE 5000

# Command to run your Flask API within the virtual environment
CMD ["python3", "app.py"]
