price = int(input())
perc = int(input())

res = (lambda x,y:(x/100) * y)(price, perc)

print(round(res,2))
