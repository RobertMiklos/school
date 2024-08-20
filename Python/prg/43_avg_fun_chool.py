subject = str(input("Zadejte jaký předmět chcete.\n"))
grades = []

def average_grade(grades):
    avg = 0
    for x in grades:
        avg += x
    return(avg / len(grades))

while len(grades) <= 4:
    tmp = int(input("Zadejte známky (max 5 známek).\n"))
    grades.append(tmp)

avg_grade = str(round(average_grade(grades),2))

print(f"V předmětu {subject} je vaše průměrná známka {avg_grade} .")