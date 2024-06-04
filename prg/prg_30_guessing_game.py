import random

def generate_random_number():
    number = random.randint(0, 10)
    return(number)

corect_num = generate_random_number()
guess = int(input("zadejte číslo:\n"))
atemps = 0

while True: 
    if guess == corect_num:
        atemps += 1
        print("hurá!")
        print("uhádl jsi to na " f"{atemps}" " pokusů.")
        break
    elif guess > corect_num:
        print("Tvůj typ je větší.")
    elif guess < corect_num:
        print("Tvůj typ je menší.")
    else:
        atemps += 1
        guess = int(input("zadejte číslo:\n"))


# hra kde se hádá správné číslo