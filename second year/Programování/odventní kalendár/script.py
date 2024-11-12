import json
from datetime import datetime

# datum
def todays_date():
    today = datetime.today()
    # na zkoušku 11 másto 12
    return today.month == 12 and 1 <= today.day <= 24

# json
def open_json():
    with open("calendar.json", "r", encoding="utf-8") as file:
        return json.load(file)


def main():
    if todays_date():
        today = datetime.today().day
        questions = open_json()

        if str(today) in questions:
            question_data = questions[str(today)]
            print(question_data["question"])
            user_answer = input("Tvoje odpověď: ")

            if user_answer.strip() == question_data["answer"]:
                print(f"Jako odměnu získáváš {question_data['gift']}.")
            else:
                print("To se nepovedlo, ale nevadí, můžeš to zkusit znovu.")
        else:
            print("Dnešní den není v kalendáři.")
    else:
        print("Dnešní den není v kalendáři.")

if __name__ == "__main__":
    main()
