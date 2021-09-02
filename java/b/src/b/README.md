# b

## Introduction

This project complements <a href="https://github.com/BianLee/Lobster-Institute-of-Technology" target="_blank">This project</a>. It is a simple Java code that takes in Question data in CSV format, and transforms it into JSON format. When questions are submitted on a Google Form, the responses get recorded on a Google Sheet. You can then download the file as CSV and run through this code, for it to output a corresponding JSON file. The JSON document serves all the questions and their information, and the client code reads this JSON to display questions on the screen.

Following shows how data on Google Sheets is converted to JSON.

| Timestamp           | title                           | choices                  | correct | difficulty | solution | category |
| ------------------- | ------------------------------- | ------------------------ | ------- | ---------- | -------- | -------- |
| 2021-12-24 00:00:00 | What is 2 + 2?                  | 2; 3; 4;                 | c       | Easy       | Addition | Math     |
| 2021-12-24 00:00:01 | What is the capital of Austria? | Vienna; Moscow; Budapest | a       | Easy       | N/A      | Trivia   |
| 2021-12-24 00:00:02 | Who is the 40th US President?   | Reagan; Carter; Trump    | a       | Hard       | N/A      | History  |

```
[
    {
        "id": 1,
        "Timestamp: "2021-12-24 00:00:00",
        "title": "What is 2 + 2?",
        "choices": [
            "2",
            "3",
            "4"
        ],
        "correct": "c",
        "solution": "Addition",
        "category": ["Math"]
    }
    ...,
    {}
]
```

## How to use

Inside this repository is a `b.jar` file. This is an executable JAR, and it reflects the source code, which is found in `Main.java`. To run the .jar, use

```
java -jar b.jar
```

This will prompt users to input two ABSOLUTE paths: Location of the CSV file, as well as the output path on the system where JSON file will be written.
