def money(deposit , monthly_income , tax , years):
    money = deposit
    for x in range(years):
        money += 12 * monthly_income 
        money += money / 100 * tax
    return(money)

print(int(money(20000, 1000 , 3 , 10)))