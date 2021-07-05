<p align="center">
  <h2 align="center">Sieve.ai</h2>
  <p align="center">
  Let Us Sort the Resumes
  </p>
</p>

## About the Project

Every day, thousands of Job Listings are created to help the companies meet the ever growing demand of market by recruiting fresh talent. The job of a Recruiter is a very hard and important. It’s like identifying a needle in a haystack. But in the age of Artificial Intelligence it can be eased out for them through our product, Sieve.ai.

Sieve.ai reduces the burden on a Recruiter by leaving the tedious and repetitive task of going through thousands of resumes, of which only are handful are relevant. Just upload all the CVs into the system and receive a list of names of candidates and their respective CVs in descending order of their relevance to the Job Description. Reduce your Recruitment Turn Around Time with just a click.

## Quick Start

Start developing locally.

#### Step 1: Clone the repo

Fork the repository. then clone the repo locally by doing -

```sh
git clone https://github.com/rohitbakoliya/sieve.ai.git
```

#### Step 2: Install Dependencies

cd into the directory

```sh
cd sieve.ai
```

Install dependenices for React Frontend

```sh
cd client
yarn install
```

Install dependenices for NodeJS Backend

```sh
cd api
yarn install
```

Install dependenices for Flask backend

```sh
cd nlp-endpoint
pip install -r requirements.txt
```

#### Step 3: Setup .env

To run the server you will also need to provide the `.env` variables

- create a new file .env in the root
- open [.env.EXAMPLE](./.env.EXAMPLE)
- copy the contents and paste it to the .env with valid keys

#### And you are good to go

```sh
cd client
yarn start
```

```sh
cd api
yarn watch:server
```

```sh
cd nlp-endponit
python app.py
```

## Technologies used

- Typescript
- Node.js
- Express.js
- React.js
- MongoDB
- Ant Design
- Styled Components
- Flask
- Nltk
- Numpy

## Features

#### 2 Layer Filter Mechanism:

- **Role Based** – It features an AI classifier trained with 900+ resumes with that is able to classify the resumes into 20 broad categories of Job roles with an accuracy of 98%.

- **Similarity with Job Description** – It extracts the keywords from the inputted job description and maps them with resume based on cosine similarity(document similarity) to get a score percentage, which is used to sort and display the best resumes on top

#### Filter History

## Author

- Rishabh Malik
- Rohit Bakoliya
- Rohith Saji
- Sheetal Singh
