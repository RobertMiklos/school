numbers = [1,6,4,7,9,8]
result = 0

for x in numbers:
    if x % 2 == 0:
        result += 1 
    else:
        result = result
print(result)