list = [2,2,7,9,11,5,87,23]
change = int(input("zadej číslo které se má přidat: "))
position = int(input("zadej pozici na kterou se má číslo přidat: "))

if position > len(list):
    print("pozice je mimo seznam")
else:
    list.insert(position,change)
    print(list)

# program se tě zeptá na jokuo pozici se má přidat tebou zvolené číslo a přidá ho tam (kdyby byla pozice větší jak list tak program vypíše chybu) a vypíše list 