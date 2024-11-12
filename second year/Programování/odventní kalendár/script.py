import json
from datetime import datetime

# json
def json_load():
    with open("D:\development\school\second year\Programování\odventní kalendár\odvent_calendar.json", "r") as file:
        return json.load(file)

# datum
def todays_date():
    today = datetime.today()
    # na zkoušku z 12 na 11 
    return today.month == 12 and 1 <= today.day <= 24
 
def main():
    if todays_date():
        today = datetime.today().day
        questions = json_load()

        if str(today) in questions:
            question_data = questions[str(today)]
            print(question_data["question"])
            user_answer = input("Tvoje odpověď: ")

            if user_answer.strip() == question_data["answer"]:
                print(f"Za tvou šikovnost tu máš ode mě {question_data['gift']}.")
            else:
                print("To se nepovedlo, ale nevadí, můžeš to zkusit znovu.")
        else:
            print("Dnešní den není v adventním kalendáři.")
    else:
        print("Dnešní den není v adventním kalendáři.")

if __name__ == "__main__":
    main()

